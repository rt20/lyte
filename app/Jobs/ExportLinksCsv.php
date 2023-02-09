<?php

namespace App\Jobs;

use App\Link;
use App\User;
use Common\Csv\BaseCsvExportJob;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ExportLinksCsv extends BaseCsvExportJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        protected int $requesterId,
        protected ?User $forUser = null,
        protected ?array $payload = [],
    ) {
    }

    public function cacheName(): string
    {
        $groupId = $this->payload['groupId'] ?? 'all';
        $userId = $this->forUser ? $this->forUser->id : 'all';
        return "links.${userId}.${groupId}";
    }

    protected function notificationName(): string
    {
        return 'links';
    }

    protected function generateLines()
    {
        $selectCols = [
            'id',
            'name',
            'alias',
            'hash',
            'long_url',
            'type',
            'expires_at',
            'clicks_count',
            'description',
            'created_at',
        ];

        $builder = $this->forUser ? $this->forUser->links() : app(Link::class);

        $builder
            ->select($selectCols)
            ->with('domain')
            ->when(
                Arr::get($this->payload, 'groupId'),
                fn(Builder $builder) => $builder->whereHas(
                    'groups',
                    fn(Builder $q) => $q->where(
                        'link_group_id',
                        $this->payload['groupId'],
                    ),
                ),
            )
            ->chunkById(100, function (Collection $chunk) {
                $chunk->each(function (Link $link) {
                    $data = $link->toArray();
                    unset(
                        $data['has_password'],
                        $data['id'],
                        $data['hash'],
                        $data['alias'],
                    );
                    $this->writeLineToCsv($data);
                });
            });
    }
}
