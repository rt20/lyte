<?php

namespace App\Http\Controllers;

use App\Actions\LinkGroup\CrupdateLinkGroup;
use App\Actions\LinkGroup\DeleteLinkGroups;
use App\Http\Requests\CrupdateLinkGroupRequest;
use App\Link;
use App\LinkGroup;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkGroupController extends BaseController
{
    protected string $modelName;

    public function __construct(
        protected LinkGroup $linkGroup,
        protected Request $request,
    ) {
        $this->modelName = Str::camel(class_basename($linkGroup));
    }

    public function index()
    {
        $params = $this->request->all();
        $this->authorize('index', get_class($this->linkGroup));

        $dataSource = new Datasource($this->linkGroup, $params);

        return $this->success(['pagination' => $dataSource->paginate()]);
    }

    public function show(LinkGroup $linkGroup)
    {
        $this->authorize('show', $linkGroup);

        return $this->success([$this->modelName => $linkGroup]);
    }

    public function store(CrupdateLinkGroupRequest $request)
    {
        $this->authorize('store', get_class($this->linkGroup));

        $group = app(CrupdateLinkGroup::class)->execute(
            $this->linkGroup,
            $request->all(),
        );

        return $this->success([$this->modelName => $group]);
    }

    public function update(
        LinkGroup $linkGroup,
        CrupdateLinkGroupRequest $request,
    ) {
        $this->authorize('update', $linkGroup);

        $linkGroup = app(CrupdateLinkGroup::class)->execute(
            $linkGroup,
            $request->all(),
        );

        return $this->success([$this->modelName => $linkGroup]);
    }

    public function destroy(string $ids)
    {
        $groupIds = explode(',', $ids);
        $this->authorize('destroy', [get_class($this->linkGroup), $groupIds]);

        app(DeleteLinkGroups::class)->execute($groupIds, true);

        return $this->success();
    }

    public function links(LinkGroup $linkGroup)
    {
        $this->authorize('show', $linkGroup);

        $params = $this->request->all();
        $builder = app(Link::class)
            ->with(['rules', 'tags', 'pixels', 'domain', 'user', 'groups'])
            ->whereHas('groups', function (Builder $q) use ($linkGroup) {
                $q->where($linkGroup->qualifyColumn('id'), $linkGroup->id);
            });

        $dataSource = new Datasource($builder, $params);

        return $this->success([
            $this->modelName => $linkGroup,
            'pagination' => $dataSource->paginate(),
        ]);
    }
}
