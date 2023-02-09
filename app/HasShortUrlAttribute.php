<?php

namespace App;

use Common\Settings\Settings;

trait HasShortUrlAttribute
{
    public function getShortUrlAttribute()
    {
        if (
            $this->domain_id &&
            $this->relationLoaded('domain') &&
            $this->domain
        ) {
            $defaultHost = $this->domain->host;
        } else {
            $defaultHost =
                app(Settings::class)->get('custom_domains.default_host') ?:
                    config('app.url');
        }

        return $defaultHost . '/' . ($this->alias ?: $this->hash);
    }
}
