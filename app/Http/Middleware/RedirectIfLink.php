<?php

namespace App\Http\Middleware;

use App\Actions\Link\LinkeablePublicPolicy;
use App\Actions\Link\LinkeableQrResponse;
use App\Actions\Link\LogLinkeableClick;
use App\Biolink;
use App\Exceptions\LinkRedirectFailed;
use App\Link;
use App\LinkeableRule;
use App\LinkGroup;
use Arr;
use Closure;
use Common\Core\AppUrl;
use Common\Core\Prerender\HandlesSeo;
use Common\Domains\CustomDomain;
use Common\Settings\Settings;
use DB;
use Illuminate\Http\Request;
use Str;
use Symfony\Component\HttpFoundation\RedirectResponse;

class RedirectIfLink
{
    use HandlesSeo;

    const CLIENT_ROUTES = [
        'dashboard',
        'link-groups',
        'admin',
        'billing',
        'workspace',
        'contact',
        'update',
        'pages',
        'login',
        'register',
        'forgot-password',
        'password',
    ];

    const ALLOWED_ROUTES = ['qr', 'img'];

    public function __construct(
        protected Link $link,
        protected Settings $settings,
        protected CustomDomain $customDomain,
        protected AppUrl $appUrl,
    ) {
    }

    public function handle(Request $request, Closure $next)
    {
        $path = $this->getPath($request);
        if (!$this->isSystemRoute($path)) {
            $hash = explode('/', $path)[0];
            if ($link = $this->findLink($hash)) {
                $response = $this->handleLinkeable($link, $request);
            } elseif ($linkGroup = $this->findLinkGroup($hash)) {
                if (!$linkGroup->rotator) {
                    $response = $this->handleLinkeable($linkGroup, $request);
                } elseif ($rotatorLink = $linkGroup->randomLink()->first()) {
                    $response = $this->handleLinkeable($rotatorLink, $request);
                }
            }
        }

        return $response ?? $next($request);
    }

    private function findLink($hash): ?Link
    {
        return $this->link
            ->with('pixels')
            ->where('hash', $hash)
            ->orWhere('alias', $hash)
            ->first();
    }

    private function findLinkGroup($hash): ?LinkGroup
    {
        $linkGroup = null;
        $groupData = DB::table('link_groups')
            ->where('hash', $hash)
            ->first();

        if ($groupData) {
            $model =
                $groupData->type === 'biolink'
                    ? Biolink::class
                    : LinkGroup::class;
            $model::unguard();
            $linkGroup = new $model((array) $groupData);

            // mark as not dirty
            $linkGroup->syncOriginal();
            $linkGroup->exists = true;
        }

        return $linkGroup;
    }

    private function handleLinkeable(
        Link|LinkGroup|Biolink $linkeable,
        Request $request,
    ) {
        if (app(LinkeablePublicPolicy::class)->isAccessible($linkeable)) {
            // redirect to stats page
            if (Str::endsWith($request->getUri(), '+')) {
                $route = Str::plural(Str::kebab(class_basename($linkeable)));
                return redirect(url("dashboard/$route/$linkeable->id"));
            }

            // show QR code
            if (Str::endsWith($request->getUri(), '/qr')) {
                return app(LinkeableQrResponse::class)->make($linkeable);
            }

            // load any needed relations
            if ($linkeable instanceof Biolink) {
                $linkeable->loadContent();
            } elseif ($linkeable->type === 'page') {
                $linkeable->load(['customPage']);
            } elseif ($linkeable->type === 'overlay') {
                $linkeable->load(['overlay']);
            }

            LogLinkeableClick::dispatch($linkeable);
            $linkeable = $this->applyRules($linkeable);

            if ($linkeable instanceof Biolink) {
                $leapLink = $linkeable->content->first(function ($item) {
                    return $item->model_type === Link::MODEL_TYPE &&
                        $item->leap_until;
                });
                if ($leapLink) {
                    $linkeable->long_url = $leapLink->long_url;
                }
            }

            // set seo meta tags on link response
            $response = ['linkeable' => $linkeable];
            $prerenderResponse = $this->handleSeo($response, [
                'prerender' => [
                    'config' => 'linkeable.show',
                    'view' => 'linkeable.show',
                ],
            ]);

            // models won't be cast to array automatically
            $response['seo'] = isset($response['seo'])
                ? $response['seo']->toArray()
                : [];

            // set link on route, so it can be used in blade redirect templates and frontend
            $request->route()->setParameter('linkeableResponse', $response);
            if (
                $linkeable->long_url &&
                ($linkeable instanceof LinkGroup ||
                    $linkeable->type === 'direct') &&
                !$linkeable->password
            ) {
                $redirectHeaders = [
                    'Cache-Control' => 'no-cache, no-store',
                    'Expires' => -1,
                ];
                // redirect to long url instantly if link has no pixels attached
                if (!$linkeable->pixels || $linkeable->pixels->isEmpty()) {
                    //config()->set('session.driver', 'array');
                    $destination = $this->addUtmToUrl(
                        $linkeable->long_url,
                        $linkeable->utm,
                    );
                    return new RedirectResponse(
                        $destination,
                        301,
                        $redirectHeaders,
                    );
                    // will need to show pixels before redirecting
                } else {
                    return response()->view(
                        'redirects.direct',
                        [],
                        301,
                        $redirectHeaders,
                    );
                }
            }

            // pre-render links for crawlers
            if (isset($prerenderResponse) && defined('SHOULD_PRERENDER')) {
                return $prerenderResponse;
            }

            // other link types will be handled by frontend, so
            // we can just continue with booting app normally
        }
    }

    private function addUtmToUrl(string $url, ?string $utm): string
    {
        if ($utm) {
            $url .= (parse_url($url, PHP_URL_QUERY) ? '&' : '?') . $utm;
        }
        return $url;
    }

    private function applyRules(
        Link|LinkGroup|Biolink $linkeable,
    ): Link|LinkGroup|Biolink {
        if (!$this->settings->get('links.retargeting')) {
            return $linkeable;
        }

        $location = LogLinkeableClick::getLocation();
        $device = LogLinkeableClick::getDevice();
        $platform = LogLinkeableClick::getPlatform();

        // only apply the first matching rule
        $first = $linkeable->rules->first(function (LinkeableRule $rule) use (
            $location,
            $device,
            $platform,
        ) {
            if ($rule->type === 'geo') {
                return $location === $rule->key;
            } elseif ($rule->type === 'device') {
                return $device === $rule->key;
            } elseif ($rule->type === 'platform') {
                return Str::contains(
                    str_replace(' ', '', $platform),
                    str_replace(' ', '', $rule->key),
                );
            } else {
                return false;
            }
        });

        if ($first) {
            $linkeable->long_url = $first->value;
        }

        return $linkeable;
    }

    private function isSystemRoute($path): bool
    {
        if (!$path) {
            return true;
        }
        $parts = explode('/', $path);

        if (
            count($parts) === 2 &&
            in_array(last($parts), self::ALLOWED_ROUTES)
        ) {
            return false;
        }

        return count($parts) != 1 ||
            array_search($path, self::CLIENT_ROUTES) !== false;
    }

    private function getPath(Request $request): string
    {
        // if original url is specified, get path from that url
        // this allows testing locally via bootstrap-data url
        if ($original = $request->get('original_url')) {
            $path = parse_url($original)['path'];
        } else {
            $path = parse_url($request->getUri())['path'];
        }

        $path = str_replace('/public/', '', $path);
        $path = ltrim($path, '/');
        $path = rtrim($path, '+');

        if (!$path && $this->settings->get('links.subdomain_matching')) {
            $host = $request->getHost();
            if (substr_count($host, '.') > 1) {
                $path = Arr::first(explode('.', $host));
            }
        }

        return $path;
    }
}
