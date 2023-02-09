<?php

namespace App\Actions\Link\Validators;

use Common\Core\HttpClient;
use Common\Settings\Settings;
use Illuminate\Support\Arr;

class ValidateLinkWithGoogleSafeBrowsing
{
    public function execute(string $url): bool
    {
        $key = app(Settings::class)->get('links.google_safe_browsing_key');
        if (!$key) {
            return true;
        }

        $body = [
            'client' => [
                'clientId' => config('app.name'),
                'clientVersion' => config('common.site.version'),
            ],
            'threatInfo' => [
                'threatTypes' => [
                    'MALWARE',
                    'SOCIAL_ENGINEERING',
                    'THREAT_TYPE_UNSPECIFIED',
                ],
                'platformTypes' => ['ANY_PLATFORM'],
                'threatEntryTypes' => ['URL'],
                'threatEntries' => [['url' => $url]],
            ],
        ];

        $response = app(HttpClient::class)->post(
            "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=$key",
            [
                'headers' => ['Content-Type' => 'application/json'],
                'json' => $body,
            ],
        );

        return Arr::get($response, 'matches.0.threatType') === null;
    }
}
