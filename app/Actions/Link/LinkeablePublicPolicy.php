<?php

namespace App\Actions\Link;

use App\Biolink;
use App\Exceptions\LinkRedirectFailed;
use App\Link;
use App\LinkDomain;
use App\LinkeableRule;
use App\LinkGroup;
use App\Notifications\ClickQuotaExhausted;
use Common\Core\AppUrl;
use Common\Domains\CustomDomain;
use Common\Settings\Settings;
use Illuminate\Notifications\DatabaseNotification;
use Str;
use Swift_TransportException;

class LinkeablePublicPolicy
{
    /**
     * @var Settings
     */
    private $settings;
    /**
     * @var AppUrl
     */
    private $appUrl;
    /**
     * @var LinkDomain
     */
    private $customDomain;
    /**
     * @var string
     */
    private $modelName;

    public function __construct(
        Settings $settings,
        AppUrl $appUrl,
        LinkDomain $customDomain,
    ) {
        $this->settings = $settings;
        $this->appUrl = $appUrl;
        $this->customDomain = $customDomain;
    }

    public function isAccessible(Link|LinkGroup|Biolink $model): bool
    {
        $this->modelName = (string) Str::of(get_class($model))
            ->classBasename()
            ->snake()
            ->replace('_', ' ')
            ->title();

        return $this->isValidDomain($model) &&
            !$this->pastExpirationDateOrClicks($model) &&
            !$this->overClickQuota($model) &&
            !$this->isDisabled($model);
    }

    public static function linkeableExpired(Link|LinkGroup|Biolink $model): bool
    {
        return $model->expires_at && $model->expires_at->lessThan(now());
    }

    public static function linkeableWillActivateLater(
        Link|LinkGroup|Biolink $model,
    ): bool {
        return $model->activates_at && $model->activates_at->isAfter(now());
    }

    private function pastExpirationDateOrClicks(Link|LinkGroup|Biolink $model): bool
    {
        if (static::linkeableExpired($model)) {
            throw (new LinkRedirectFailed(
                "$this->modelName is past its expiration date ($model->expires_at)",
            ))->setModel($model);
        }

        if (static::linkeableWillActivateLater($model)) {
            throw (new LinkRedirectFailed(
                "$this->modelName is set to activate on ($model->activates_at)",
            ))->setModel($model);
        }

        $expClicksRule = $model->rules->first(function (LinkeableRule $rule) {
            return $rule->type === 'exp_clicks';
        });
        if (
            $expClicksRule &&
            (int) $expClicksRule->key <= $model->clicks_count
        ) {
            $msg = "$this->modelName is past it's specified expiration clicks ($expClicksRule->key).";
            if ($expClicksRule->value) {
                $msg .= " Visits to this $this->modelName will redirect to '$expClicksRule->value'.";
            }

            throw (new LinkRedirectFailed($msg))
                ->setModel($model)
                ->setRedirectUrl($expClicksRule->value);
        }

        return false;
    }

    private function isValidDomain(Link|LinkGroup|Biolink $model): bool
    {
        $defaultHost =
            $this->settings->get('custom_domains.default_host') ?:
            config('app.url');
        $defaultHost = $this->appUrl->getHostFrom($defaultHost);
        $requestHost = $this->appUrl->getRequestHost();

        // link should only be accessible via single domain
        if ($model->domain_id > 0) {
            $domain = $this->customDomain
                ->forUser($model->user_id)
                ->find($model->domain_id);
            if (!$domain || !$this->appUrl->requestHostMatches($domain->host)) {
                throw (new LinkRedirectFailed(
                    "$this->modelName is set to only be accessible via '$domain->host', but request domain is '$requestHost'",
                ))->setModel($model);
            }
        }

        // link should be accessible via default domain only
        elseif ($model->domain_id === 0) {
            if (!$this->appUrl->requestHostMatches($defaultHost)) {
                throw (new LinkRedirectFailed(
                    "$this->modelName is set to only be accessible via '$defaultHost' (default domain), but request domain is '$requestHost'",
                ))->setModel($model);
            }
        }

        // link should be accessible via default and all user connected domains
        else {
            if ($this->appUrl->requestHostMatches($defaultHost, true)) {
                return true;
            }
            $domains = $this->customDomain->forUser($model->user_id)->get();
            $customDomainMatches = $domains->contains(function (
                CustomDomain $domain,
            ) {
                return $this->appUrl->requestHostMatches($domain->host);
            });
            if (!$customDomainMatches) {
                throw (new LinkRedirectFailed(
                    "Current domain '$requestHost' does not match default domain or any custom domains connected by user.",
                ))->setModel($model);
            }
        }

        return true;
    }

    private function overClickQuota(Link|LinkGroup|Biolink $model): bool
    {
        // link might not be attached to user
        if (!$model->user) {
            return false;
        }
        $quota = $model->user->getRestrictionValue(
            'links.create',
            'click_count',
        );
        if (is_null($quota)) {
            return false;
        }

        $totalClicks = app(GetMonthlyClicks::class)->execute($model->user);

        if ($quota < $totalClicks) {
            $alreadyNotifiedThisMonth = app(DatabaseNotification::class)
                ->where('type', ClickQuotaExhausted::class)
                ->whereBetween('created_at', [
                    now()->startOfMonth(),
                    now()->endOfMonth(),
                ])
                ->exists();
            if (!$alreadyNotifiedThisMonth) {
                try {
                    $model->user->notify(new ClickQuotaExhausted());
                } catch (Swift_TransportException $e) {
                    //
                }
            }
            throw (new LinkRedirectFailed(
                "User this $this->modelName belongs to is over their click quota for the month.",
            ))->setModel($model);
        }

        return false;
    }

    private function isDisabled(Link|LinkGroup|Biolink $model): bool
    {
        if (!$model->active) {
            throw (new LinkRedirectFailed(
                "This $this->modelName is disabled and will not redirect user to destination url.",
            ))->setModel($model);
        }

        return false;
    }
}
