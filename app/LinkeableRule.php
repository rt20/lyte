<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\LinkRule
 *
 * @property int $id
 * @property string $type
 * @property int $linkeable_id
 * @property string $key
 * @property string $value
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @mixin \Eloquent
 * @method static \Illuminate\Database\Eloquent\Builder|LinkeableRule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkeableRule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkeableRule query()
 */
class LinkeableRule extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'linkeable_id' => 'integer',
    ];

    protected $hidden = [
        'linkeable_id',
        'linkeable_type',
        'id',
        'created_at',
        'updated_at',
    ];
}
