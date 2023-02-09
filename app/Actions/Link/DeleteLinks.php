<?php

namespace App\Actions\Link;

use DB;
use Storage;
use App\Link;
use App\LinkeableRule;
use App\LinkeableClick;
use App\LinkImage;
use Illuminate\Support\Collection;

class DeleteLinks
{
    /**
     * @var Link
     */
    private $link;

    /**
     * @param Link $link
     */
    public function __construct(Link $link)
    {
        $this->link = $link;
    }

    /**
     * @param Collection|array $ids
     */
    public function execute($ids, bool $forceDelete = false)
    {
        if ($forceDelete) {
            $this->link->whereIn('id', $ids)->forceDelete();
        } else {
            $this->link->whereIn('id', $ids)->delete();
        }

        if ($forceDelete) {
            // delete clicks
            app(LinkeableClick::class)
                ->whereIn('linkeable_id', $ids)
                ->where('linkeable_type', Link::class)
                ->delete();

            // delete rules
            app(LinkeableRule::class)
                ->whereIn('linkeable_id', $ids)
                ->where('linkeable_type', Link::class)
                ->delete();

            // detach from groups
            DB::table('link_group_link')
                ->whereIn('link_id', $ids)
                ->delete();
        }
    }
}
