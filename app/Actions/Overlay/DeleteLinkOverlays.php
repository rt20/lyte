<?php

namespace App\Actions\Overlay;

use App\Link;
use App\LinkOverlay;
use Illuminate\Support\Collection;

class DeleteLinkOverlays
{
    /**
     * @param Collection|array $overlayIds
     */
    public function execute($overlayIds)
    {
        LinkOverlay::whereIn('id', $overlayIds)->delete();

        // set links to which this overlay is attached to "direct" type
        Link::whereIn('type_id', $overlayIds)
            ->where('type', 'overlay')
            ->update(['type_id' => null, 'type' => 'direct']);
    }
}
