<?php

namespace App;

use Common\Pages\CustomPage;
use Database\Factories\LinkPageFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class LinkPage extends CustomPage
{
    public $table = 'custom_pages';
    const PAGE_TYPE = 'link_page';

    protected function type(): Attribute
    {
        return Attribute::make(
            get: fn($value) => self::PAGE_TYPE,
            set: fn($value) => self::PAGE_TYPE,
        );
    }

    protected static function booted()
    {
        static::addGlobalScope('linkPage', function (Builder $builder) {
            $builder->where('type', self::PAGE_TYPE);
        });

        static::creating(function (Model $builder) {
            $builder->type = self::PAGE_TYPE;
        });
    }

    public static function factory(): LinkPageFactory
    {
        return LinkPageFactory::new();
    }
}
