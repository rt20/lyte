<?php

namespace App\Jobs;

use App\LinkGroup;
use App\User;
use Common\Csv\BaseCsvExportJob;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class ExportLinkGroupsCsv extends BaseCsvExportJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        protected int $requesterId,
        protected ?User $forUser = null,
    ) {
    }

    public function cacheName(): string
    {
        $cacheName = 'link-groups';
        if ($this->forUser) {
            $cacheName .= ".{$this->forUser->id}";
        }
        return $cacheName;
    }

    protected function notificationName(): string
    {
        return 'link-groups';
    }

    protected function generateLines()
    {
        $selectCols = [
            'id',
            'name',
            'hash',
            'active',
            'rotator',
            'description',
            'created_at',
            'updated_at',
        ];

        $builder = $this->forUser
            ? $this->forUser->linkGroups()
            : app(LinkGroup::class);

        $builder
            ->select($selectCols)
            ->with('domain')
            ->chunkById(100, function (Collection $chunk) {
                $chunk->each(function (LinkGroup $link) {
                    $data = $link->toArray();
                    unset(
                        $data['short_url'],
                        $data['has_password'],
                        $data['model_type'],
                    );
                    $this->writeLineToCsv($data);
                });
            });
    }
}
