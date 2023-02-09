<?php

namespace App\Console\Commands;

use App\Actions\Link\DeleteLinks;
use App\Actions\LinkGroup\DeleteLinkGroups;
use App\Link;
use App\LinkGroup;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DeleteExpiredLinkeables extends Command
{
    /**
     * @var string
     */
    protected $signature = 'linkeables:delete_expired';

    /**
     * @var string
     */
    protected $description = 'Delete expired links and link groups.';

    public function handle()
    {
        $linkIds = Link::where('expires_at', '<', Carbon::now())->pluck('id');
        app(DeleteLinks::class)->execute($linkIds);

        $groupIds = LinkGroup::where('expires_at', '<', Carbon::now())->pluck('id');
        app(DeleteLinkGroups::class)->execute($groupIds);

        $this->info('Deleted all expired links and link groups.');
    }
}
