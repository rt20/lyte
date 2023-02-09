<?php

namespace App\Http\Controllers;

use App\Actions\Link\GetMonthlyClicks;
use App\Link;
use App\Policies\WorkspacedResourcePolicy;
use Auth;
use Common\Core\BaseController;
use Common\Core\Exceptions\AccessResponseWithAction;
use Common\Workspaces\ActiveWorkspace;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Auth\Access\Gate;
use Str;
use const App\Providers\WORKSPACED_RESOURCES;

class LinkUsageController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getUsage()
    {
        $activeWorkspace = App(ActiveWorkspace::class);
        $userOwnsWorkspace = $activeWorkspace->currentUserIsOwner();
        $allUsage = collect(WORKSPACED_RESOURCES)
            ->mapWithKeys(function ($resource) use ($userOwnsWorkspace) {
                $name = (string) Str::of($resource::MODEL_TYPE)
                    ->snake()
                    ->plural();
                $maxCount = Auth::user()->getRestrictionValue(
                    "$name.create",
                    'count',
                );
                $used = app($resource)
                    ->where('user_id', Auth::id())
                    ->count();

                $store = app(Gate::class)->inspect('store', $resource);

                $resourceUsage = [
                    'used' => $used,
                    'total' => $maxCount,
                    'create' => $store->allowed(),
                    'delete' =>
                        $userOwnsWorkspace ||
                        app(Gate::class)->allows('destroy', $resource),
                    'update' =>
                        $userOwnsWorkspace ||
                        app(Gate::class)->allows('update', new $resource()),
                    'createMsgType' => $this->getCreateMsgType($store),
                ];

                if ($resource === Link::class) {
                    $resourceUsage['alias'] =
                        Auth::user()->getRestrictionValue(
                            'links.create',
                            'alias',
                        ) ?? false;
                    $resourceUsage['password'] =
                        Auth::user()->getRestrictionValue(
                            'links.create',
                            'password',
                        ) ?? false;
                    $resourceUsage['expiration'] =
                        Auth::user()->getRestrictionValue(
                            'links.create',
                            'expiration',
                        ) ?? false;
                    $resourceUsage['utm'] =
                        Auth::user()->getRestrictionValue(
                            'links.create',
                            'utm',
                        ) ?? false;
                    $resourceUsage['retargeting'] =
                        Auth::user()->getRestrictionValue(
                            'links.create',
                            'retargeting',
                        ) ?? false;
                }

                return [$name => $resourceUsage];
            })
            ->filter();

        $clickMaxCount = Auth::user()->getRestrictionValue(
            'links.create',
            'click_count',
        );
        $allUsage['link_clicks'] = [
            'used' => app(GetMonthlyClicks::class)->execute(Auth::user()),
            'total' => $clickMaxCount,
        ];

        $activeWorkspace = App(ActiveWorkspace::class);
        return $this->success([
            'usage' => $allUsage,
            'forWorkspace' => !$activeWorkspace->isPersonal(),
            'userOwnsWorkspace' => $activeWorkspace->currentUserIsOwner(),
        ]);
    }

    private function getCreateMsgType(Response $response): ?string
    {
        if ($response->allowed()) {
            return null;
        } elseif ($response instanceof AccessResponseWithAction) {
            return 'overQuota';
        } elseif (
            $response->code() ===
            WorkspacedResourcePolicy::NO_WORKSPACE_PERMISSION
        ) {
            return 'noWorkspacePermission';
        } else {
            return 'noPermission';
        }
    }
}
