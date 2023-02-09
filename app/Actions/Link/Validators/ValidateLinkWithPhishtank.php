<?php

namespace App\Actions\Link\Validators;

use Common\Core\HttpClient;
use Common\Settings\Settings;
use Illuminate\Support\Arr;

class ValidateLinkWithPhishtank
{
    public function execute(string $url): bool
    {
        $key = app(Settings::class)->get('links.phishtank_key');
        if (!$key) {
            return true;
        }

        $appName = config('app.name');
        $response = app(HttpClient::class)->post(
            'https://checkurl.phishtank.com/checkurl/',
            [
                'headers' => ['User-Agent' => "phishtank/$appName"],
                'form_params' => [
                    'format' => 'json',
                    'app_key' => $key,
                    'url' => $url,
                ],
            ],
        );

        return Arr::get($response, 'results.valid', false);
    }
}
