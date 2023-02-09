<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\LinkImage
 *
 * @method static \Illuminate\Database\Eloquent\Builder|LinkImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkImage query()
 * @mixin \Eloquent
 */
class LinkImage extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'id' => 'integer',
        'link_id' => 'integer',
    ];
}
