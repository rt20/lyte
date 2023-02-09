<?php

namespace App\Console\Commands;

use App\Actions\Biolink\AddInitialContentToBiolink;
use App\Biolink;
use App\Link;
use App\LinkeableClick;
use App\LinkGroup;
use App\LinkOverlay;
use App\User;
use Common\Pages\CustomPage;
use Common\Workspaces\Workspace;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedDemoData extends Command
{
    protected $signature = 'demo:seed';

    protected $description = 'Seed demo data.';

    protected array $tablesToTruncate = [
        'biolink_appearances',
        'biolink_widgets',
        'custom_domains',
        'custom_pages',
        'link_clicks',
        'link_group_link',
        'link_groups',
        'link_overlays',
        'link_tracking_pixel',
        'linkeable_rules',
        'links',
        'tracking_pixels',
        'workspaces',
        'workspace_invites',
        'workspace_user',
    ];

    public function handle(): int
    {
        @ini_set('memory_limit', '-1');

        foreach ($this->tablesToTruncate as $table) {
            DB::table($table)->truncate();
        }

        $this->info('Generating workspaces.');
        $workspace = $this->generateWorkspace('medium');
        $this->generateWorkspace('high');

        $this->info('Generating link groups.');
        $this->generateLinkGroup('low');
        $this->generateLinkGroup('low');
        $this->generateLinkGroup('high');
        $this->generateLinkGroup('medium', $workspace);

        $this->info('Generating biolinks.');
        $this->generateBiolink('low');
        $this->generateBiolink('high');
        $this->generateBiolink('medium', $workspace);

        LinkOverlay::factory()->create([
            'user_id' => User::findAdmin()->id,
            'name' => 'Demo link overlay',
            'message' => 'Demo Link Overlay Message',
            'btn_text' => 'Button text',
            'label' => 'Demo',
        ]);

        CustomPage::factory()->create([
            'user_id' => User::findAdmin()->id,
            'type' => 'link_page',
        ]);

        return Command::SUCCESS;
    }

    protected function generateWorkspace($clickAmount = 'low')
    {
        $user = User::findAdmin();
        $clicksCount = $this->getClickCount($clickAmount);

        $workspace = Workspace::factory()->create([
            'owner_id' => $user->id,
        ]);

        $workspace->members()->create([
            'user_id' => $user->id,
            'role_id' => 1,
        ]);

        $links = Link::factory()
            ->count(random_int(8, 20))
            ->create([
                'type' => 'direct',
                'user_id' => $user->id,
                'workspace_id' => $workspace->id,
            ]);

        DB::beginTransaction();
        LinkeableClick::factory()
            ->count($clicksCount)
            ->create([
                'linkeable_id' => $links->random()->id,
                'linkeable_type' => Link::class,
                'owner_id' => $user->id,
            ]);
        DB::commit();

        return $workspace;
    }

    protected function generateLinkGroup(
        $clickAmount = 'low',
        Workspace $workspace = null,
    ) {
        $user = User::findAdmin();
        $clicksCount = $this->getClickCount($clickAmount);

        $group = LinkGroup::factory()->create([
            'user_id' => $user->id,
            'workspace_id' => $workspace ? $workspace->id : 0,
        ]);

        $groupLinks = Link::factory()
            ->count(random_int(8, 20))
            ->create([
                'type' => 'direct',
                'clicks_count' => $clicksCount,
                'user_id' => $user->id,
                'workspace_id' => $workspace ? $workspace->id : 0,
            ]);

        $group->links()->sync($groupLinks);

        if ($clickAmount !== 'none') {
            DB::beginTransaction();
            LinkeableClick::factory()
                ->count($clicksCount)
                ->create([
                    'linkeable_id' => $groupLinks->random()->id,
                    'linkeable_type' => Link::class,
                    'owner_id' => $user->id,
                ]);
            DB::commit();
        }

        return $group;
    }

    protected function generateBiolink(
        $clickAmount = 'low',
        Workspace $workspace = null,
    ) {
        $user = User::findAdmin();
        $clicksCount = $this->getClickCount($clickAmount);

        $biolink = Biolink::factory()->create([
            'clicks_count' => $clicksCount,
            'user_id' => $user->id,
            'workspace_id' => $workspace ? $workspace->id : 0,
        ]);

        $biolinkLinks = Link::factory()
            ->shortName()
            ->count(random_int(3, 5))
            ->create([
                'type' => 'direct',
                'clicks_count' => $clicksCount,
                'user_id' => $user->id,
                'workspace_id' => $workspace ? $workspace->id : 0,
            ]);

        $biolink->links()->sync(
            $biolinkLinks->mapWithKeys(
                fn($link, $index) => [
                    $link->id => ['position' => $index + 2],
                ],
            ),
        );

        app(AddInitialContentToBiolink::class)->execute(
            $biolink->id,
            $user,
            $biolinkLinks->count(),
        );

        if ($clickAmount !== 'none') {
            DB::beginTransaction();
            // biolink clicks
            LinkeableClick::factory()
                ->count($clicksCount)
                ->create([
                    'linkeable_id' => $biolink->id,
                    'linkeable_type' => Biolink::class,
                    'owner_id' => $user->id,
                ]);

            // links clicks
            LinkeableClick::factory()
                ->count($clicksCount)
                ->create([
                    'linkeable_id' => $biolinkLinks->random()->id,
                    'linkeable_type' => Link::class,
                    'owner_id' => $user->id,
                ]);
            DB::commit();
        }
    }

    protected function getClickCount(string $clickAmount): int
    {
        return match ($clickAmount) {
            'low' => random_int(1, 100),
            'medium' => random_int(1000, 2000),
            'high' => random_int(3000, 4000),
            default => 0,
        };
    }
}
