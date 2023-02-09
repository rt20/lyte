<?php

namespace App\Providers;

use App\Listeners\DeleteResourcesRelatedToUser;
use App\Listeners\DetachDeletedCustomDomains;
use Common\Auth\Events\UsersDeleted;
use Common\Domains\DeletedCustomDomains;
use Common\Workspaces\Listeners\AttachWorkspaceToUser;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        DeletedCustomDomains::class => [
            DetachDeletedCustomDomains::class
        ],
        UsersDeleted::class => [
            DeleteResourcesRelatedToUser::class,
        ],

        Login::class => [
            AttachWorkspaceToUser::class,
        ],
        Registered::class => [
            AttachWorkspaceToUser::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
