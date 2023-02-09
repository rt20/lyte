<?php

namespace App\Policies;

use App\LinkGroup;
use App\User;
use Common\Workspaces\ActiveWorkspace;
use Illuminate\Database\Eloquent\Model;

class LinkGroupPolicy extends WorkspacedResourcePolicy
{
    protected string $resource = LinkGroup::class;

    public function show(User $currentUser, Model $resource): bool
    {
        return (app(ActiveWorkspace::class)->isPersonal() &&
            $resource->active) ||
            parent::show($currentUser, $resource);
    }
}
