<?php

namespace App\Actions\Link;

use App\Link;
use Common\Database\Datasource\Datasource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class PaginateLinks
{
    public function __construct(protected Link $link)
    {
    }

    public function execute(array $params): array
    {
        $builder = $this->link
            ->withTrashed()
            ->with(['rules', 'tags', 'pixels', 'groups', 'domain']);

        if ($groupId = Arr::get($params, 'groupId')) {
            // get only links that either belong to specified group or belong to any group besides it
            $operator = Str::contains($groupId, '!') ? 'doesntHave' : 'has';
            $groupId = str_replace('!', '', $groupId);
            $builder->whereHas(
                'groups',
                fn(Builder $builder) => $builder->where(
                    'link_group_id',
                    $groupId,
                ),
                $operator,
            );
        }

        $dataSource = new Datasource($builder, $params);

        return $dataSource->paginate()->toArray();
    }
}
