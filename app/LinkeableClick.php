<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LinkeableClick extends Model
{
    use HasFactory;

    protected $table = 'link_clicks';

    const UPDATED_AT = null;

    protected $guarded = ['id'];

    public function linkeable(): MorphTo
    {
        return $this->morphTo('linkeable');
    }
}
