<?php

namespace App;

use App\Workspaces\WorkspaceRelationships;
use Common\Auth\BaseUser;
use Common\Workspaces\Workspace;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class User extends BaseUser
{
    use WorkspaceRelationships, HasFactory, HasApiTokens;

    public function workspaces(): HasMany
    {
        return $this->hasMany(Workspace::class, 'owner_id');
    }
}
