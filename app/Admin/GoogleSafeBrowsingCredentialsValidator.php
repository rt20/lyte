<?php

namespace App\Admin;

use App\Actions\Link\Validators\ValidateLinkWithGoogleSafeBrowsing;
use Common\Settings\Settings;
use Exception;

class GoogleSafeBrowsingCredentialsValidator
{
    const KEYS = ['links.google_safe_browsing_key'];

    public function fails($settings)
    {
        app(Settings::class)->set(
            'links.google_safe_browsing_key',
            $settings['links.google_safe_browsing_key'],
        );

        try {
            $valid = app(ValidateLinkWithGoogleSafeBrowsing::class)->execute(
                'https://google.com',
            );
            if ($valid !== true) {
                return [
                    'safebrowsing_group' => 'API key not valid. Please specify a valid API key.',
                ];
            }
        } catch (Exception $e) {
            return $this->getErrorMessage($e);
        }
    }

    private function getErrorMessage($e): array
    {
        if ($e->getCode() === 400) {
            $msg = 'API key not valid. Please specify a valid API key.';
        } else {
            $msg = $e->getMessage();
        }
        return ['safebrowsing_group' => $msg];
    }
}
