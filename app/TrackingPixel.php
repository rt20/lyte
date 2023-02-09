<?php

namespace App;

use Common\Search\Searchable;
use Common\Workspaces\Traits\BelongsToWorkspace;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrackingPixel extends Model
{
    use Searchable, HasFactory, BelongsToWorkspace;

    protected $guarded = ['id'];
    protected $appends = ['model_type'];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
    ];

    const MODEL_TYPE = 'trackingPixel';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
            'workspace_id' => $this->workspace_id ?? '_null',
        ];
    }

    public static function filterableFields(): array
    {
        return [
            'id',
            'user_id',
            'created_at',
            'updated_at',
            'type',
            'workspace_id',
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return static::MODEL_TYPE;
    }
}
