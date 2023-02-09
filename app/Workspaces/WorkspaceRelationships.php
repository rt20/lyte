<?php

namespace App\Workspaces;

use App\Biolink;
use App\Link;
use App\LinkDomain;
use App\LinkGroup;
use App\LinkOverlay;
use App\LinkPage;
use App\TrackingPixel;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait WorkspaceRelationships
{
    public function links(): HasMany
    {
        return $this->hasMany(Link::class);
    }

    public function biolinks(): HasMany
    {
        return $this->hasMany(Biolink::class);
    }

    public function linkOverlays(): HasMany
    {
        return $this->hasMany(LinkOverlay::class);
    }

    public function linkGroups(): HasMany
    {
        return $this->hasMany(LinkGroup::class);
    }

    public function trackingPixels(): HasMany
    {
        return $this->hasMany(TrackingPixel::class);
    }

    public function linkPages(): HasMany
    {
        return $this->hasMany(LinkPage::class);
    }

    public function linkDomains(): HasMany
    {
        return $this->hasMany(LinkDomain::class);
    }
}
