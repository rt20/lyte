<?php

namespace App\Listeners;

use App\Actions\Link\DeleteLinks;
use App\Actions\LinkGroup\DeleteLinkGroups;
use App\Actions\Overlay\DeleteLinkOverlays;
use App\Actions\TrackingPixel\DeleteTrackingPixels;
use App\Link;
use App\LinkGroup;
use App\LinkOverlay;
use App\TrackingPixel;
use Common\Auth\Events\UsersDeleted;
use Common\Workspaces\Actions\DeleteWorkspaces;
use Common\Workspaces\Actions\RemoveMemberFromWorkspace;
use Common\Workspaces\Workspace;

class DeleteResourcesRelatedToUser
{
    public function handle(UsersDeleted $event)
    {
        $userIds = $event->users->pluck('id');
        $linkIds = Link::whereIn('user_id', $userIds)->pluck('id');
        app(DeleteLinks::class)->execute($linkIds, true);

        $linkGroupIds = LinkGroup::whereIn('user_id', $userIds)->pluck('id');
        app(DeleteLinkGroups::class)->execute($linkGroupIds, true);

        $pixelIds = TrackingPixel::whereIn('user_id', $userIds)->pluck('id');
        app(DeleteTrackingPixels::class)->execute($pixelIds);

        $overlayIds = LinkOverlay::whereIn('user_id', $userIds)->pluck('id');
        app(DeleteLinkOverlays::class)->execute($overlayIds);

        foreach ($userIds as $userId) {
            $workspaces = Workspace::forUser($userId)->get();
            $workspaces->each(function(Workspace $workspace) use($userId) {
                if ($workspace->owner_id === $userId) {
                    app(DeleteWorkspaces::class)->execute([$workspace->id]);
                } else {
                    app(RemoveMemberFromWorkspace::class)->execute($workspace, $userId);
                }
            });
        }
    }
}
