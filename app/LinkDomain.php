<?php

namespace App;

use Common\Domains\CustomDomain;

/**
 * App\LinkDomain
 *
 * @property int $id
 * @property string $host
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property bool $global
 * @property int|null $resource_id
 * @property string|null $resource_type
 * @property int|null $workspace_id
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $resource
 * @property-read \App\User $user
 * @method static Builder|CustomDomain basicSearch(string $query)
 * @method static Builder|CustomDomain forUser(int $userId)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain query()
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereGlobal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereResourceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereResourceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LinkDomain whereWorkspaceId($value)
 * @mixin \Eloquent
 */
class LinkDomain extends CustomDomain
{
    protected $table = 'custom_domains';
}
