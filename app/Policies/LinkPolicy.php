<?php

namespace App\Policies;

use App\Link;

class LinkPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = Link::class;
}
