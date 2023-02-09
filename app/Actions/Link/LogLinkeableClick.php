<?php

namespace App\Actions\Link;

use App\Biolink;
use App\Link;
use App\LinkeableClick;
use App\LinkGroup;
use DB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Jenssegers\Agent\Agent;
use Str;
use Torann\GeoIP\Location;

class LogLinkeableClick implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected Link|LinkGroup|Biolink $linkeable)
    {
    }

    public function handle(): ?LinkeableClick
    {
        return $this->linkeable ? $this->log() : null;
    }

    private function log(): LinkeableClick
    {
        $referrer = request()->server('HTTP_REFERER');
        $agent = app(Agent::class);
        $geo = static::getGeoData();
        $isRobot = $agent->isRobot();

        $attributes = [
            'location' => $geo['iso_code'],
            'city' => $geo['city'],
            'state' => $geo['state'],
            'ip' => request()->ip(),
            'platform' => static::getPlatform(),
            'device' => static::getDevice(),
            'crawler' => $isRobot,
            'browser' => strtolower($agent->browser()),
            'owner_id' => $this->linkeable->user_id,
            // if referrer was any page from our site set referrer as null
            'referrer' => Str::contains($referrer, url(''))
                ? null
                : Str::limit($referrer, 190, ''),
        ];

        if (!$isRobot) {
            $this->linkeable->update([
                'clicks_count' => DB::raw('clicks_count + 1'),
                'clicked_at' => now(),
            ]);
        }

        return $this->linkeable->clicks()->create($attributes);
    }

    public static function getDevice(): string
    {
        $agent = app(Agent::class);
        if ($agent->isTablet()) {
            return 'tablet';
        } elseif ($agent->isMobile()) {
            return 'mobile';
        } else {
            return 'desktop';
        }
    }

    public static function getGeoData(): Location
    {
        return geoip(static::getIp());
    }

    public static function getLocation(): string
    {
        return strtolower(static::getGeoData()['iso_code']);
    }

    public static function getPlatform(): string
    {
        $agent = app(Agent::class);
        return strtolower($agent->platform());
    }

    private static function getIp()
    {
        foreach (
            [
                'HTTP_CF_CONNECTING_IP',
                'HTTP_CLIENT_IP',
                'HTTP_X_FORWARDED_FOR',
                'HTTP_X_FORWARDED',
                'HTTP_X_CLUSTER_CLIENT_IP',
                'HTTP_FORWARDED_FOR',
                'HTTP_FORWARDED',
                'REMOTE_ADDR',
            ]
            as $key
        ) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip); // just to be safe
                    if (
                        filter_var(
                            $ip,
                            FILTER_VALIDATE_IP,
                            FILTER_FLAG_NO_PRIV_RANGE |
                                FILTER_FLAG_NO_RES_RANGE,
                        ) !== false
                    ) {
                        return $ip;
                    }
                }
            }
        }
        return request()->ip();
    }
}
