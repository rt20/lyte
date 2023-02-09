<?php

namespace App\Actions;

use App\LinkDomain;
use App\LinkGroup;
use App\LinkOverlay;
use App\LinkPage;
use App\TrackingPixel;
use Arr;
use Auth;
use Common\Core\Values\ValueLists;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Support\Collection;

class AppValueLists extends ValueLists
{
    public function overlays($params = [])
    {
        $userId = $params['userId'] ?? Auth::id();
        app(Gate::class)->authorize('index', [LinkOverlay::class, $userId]);

        return LinkOverlay::select(['id', 'name'])
            ->forActiveWorkspaceOrOwner($userId)
            ->limit(30)
            ->get();
    }

    public function pixels($params = [])
    {
        $userId = $params['userId'] ?? Auth::id();
        app(Gate::class)->authorize('index', [TrackingPixel::class, $userId]);

        return TrackingPixel::select(['id', 'name'])
            ->forActiveWorkspaceOrOwner($userId)
            ->limit(30)
            ->get();
    }

    public function groups($params = [])
    {
        $userId = $params['userId'] ?? Auth::id();
        app(Gate::class)->authorize('index', [LinkGroup::class, $userId]);

        return LinkGroup::select(['id', 'name'])
            ->forActiveWorkspaceOrOwner($userId)
            ->limit(30)
            ->get();
    }

    public function domains($params): Collection
    {
        $userId = $params['userId'] ?? Auth::id();
        $query = LinkDomain::select(['host', 'id'])
            ->forActiveWorkspaceOrOwner($userId)
            ->orWhere('global', true);

        return $query->limit(30)->get();
    }

    public function pages($params = [])
    {
        if (!isset($params['userId'])) {
            app(Gate::class)->authorize('index', LinkPage::class);
        }

        $query = LinkPage::select(['id', 'title']);

        if ($userId = Arr::get($params, 'userId')) {
            $query->forActiveWorkspaceOrOwner($userId);
        }

        return $query->limit(30)->get();
    }
}
