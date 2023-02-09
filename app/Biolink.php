<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class Biolink extends LinkGroup
{
    use HasFactory;

    public $table = 'link_groups';
    const MODEL_TYPE = 'biolink';

    public function links(): BelongsToMany
    {
        return $this->belongsToMany(
            BiolinkLink::class,
            'link_group_link',
            'link_group_id',
            'link_id',
        )
            ->using(BiolinkPivot::class)
            ->withPivot(['position', 'animation', 'leap_until']);
    }

    public function widgets(): HasMany
    {
        return $this->hasMany(BiolinkWidget::class);
    }

    public function appearance(): HasOne
    {
        return $this->hasOne(BiolinkAppearance::class);
    }

    public function loadContent(): self
    {
        $links = $this->links()->with(['rules', 'pixels', 'domain'])->get();
        $widgets = $this->widgets()->get();
        $this->load(['appearance', 'rules', 'pixels', 'domain', 'tags']);

        $this->content = $links
            ->concat($widgets)
            ->sortBy('position')
            ->values();

        return $this;
    }

    public function adjustPositions(
        $direction = 'decrement',
        int $anchor = null,
        int $linkToSkip = null,
        int $widgetToSkip = null,
    ) {
        $sign = $direction === 'decrement' ? '-' : '+';
        $this->links()
            ->newPivotStatement()
            ->where('link_group_id', $this->id)
            ->when(
                $linkToSkip,
                fn($query) => $query->where('link_id', '!=', $linkToSkip),
            )
            ->when(
                $anchor !== null,
                fn($query) => $query->where('position', '>=', $anchor),
            )
            ->update(['position' => DB::raw("position $sign 1")]);
        $this->widgets()
            ->when(
                $widgetToSkip,
                fn($query) => $query->where('id', '!=', $widgetToSkip),
            )
            ->when(
                $anchor !== null,
                fn($query) => $query->where('position', '>=', $anchor),
            )
            ->update(['position' => DB::raw("position $sign 1")]);
    }
}
