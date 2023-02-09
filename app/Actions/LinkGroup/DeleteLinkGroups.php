<?php

namespace App\Actions\LinkGroup;

use App\LinkGroup;
use DB;
use Illuminate\Support\Collection;

class DeleteLinkGroups
{
    /**
     * @param Collection|array $ids
     */
    public function execute($ids, bool $forceDelete = false)
    {
        if ($forceDelete) {
            LinkGroup::whereIn('id', $ids)->forceDelete();

            // detach links from groups
            DB::table('link_group_link')
                ->whereIn('link_group_id', $ids)
                ->delete();

            // delete widgets
            DB::table('biolink_widgets')
                ->whereIn('biolink_id', $ids)
                ->delete();
        } else {
            LinkGroup::whereIn('id', $ids)->delete();
        }
    }
}
