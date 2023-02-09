<?php

namespace App\Policies;

use App\LinkOverlay;

class LinkOverlayPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = LinkOverlay::class;
}
