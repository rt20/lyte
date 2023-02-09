<?php

namespace App\Http\Controllers;

use App\Actions\Link\CrupdateLink;
use App\Actions\Link\DeleteLinks;
use App\Actions\Link\PaginateLinks;
use App\Http\Requests\CrupdateLinkRequest;
use App\Link;
use Common\Core\BaseController;
use Exception;
use Illuminate\Http\Request;

class LinkController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected Link $link,
    ) {
    }

    public function index()
    {
        $this->authorize('index', Link::class);

        $pagination = app(PaginateLinks::class)->execute($this->request->all());

        return $this->success(['pagination' => $pagination]);
    }

    public function show(Link $link)
    {
        $this->authorize('show', $link);

        return $this->success(['link' => $link]);
    }

    public function store(CrupdateLinkRequest $request)
    {
        $this->authorize('store', Link::class);

        $link = app(CrupdateLink::class)->execute(
            $this->link->newInstance(),
            $request->all(),
        );

        return $this->success(['link' => $link]);
    }

    public function storeBatch(CrupdateLinkRequest $request)
    {
        $this->authorize('store', Link::class);

        $data = $request->all();

        $multipleUrls = collect($request->get('long_urls'))
            ->unique()
            ->map(function ($longUrl) use ($data) {
                $data['long_url'] = $longUrl;
                try {
                    return app(CrupdateLink::class)->execute(
                        $this->link->newInstance(),
                        $data,
                    );
                } catch (Exception $e) {
                    return null;
                }
            })
            ->filter();
        return $this->success(['links' => $multipleUrls]);
    }

    public function update(CrupdateLinkRequest $request, Link $link)
    {
        $this->authorize('update', $link);

        $link = app(CrupdateLink::class)->execute($link, $request->all());

        return $this->success(['link' => $link]);
    }

    public function destroy(string $ids)
    {
        $linkIds = explode(',', $ids);
        $this->authorize('destroy', [Link::class, $linkIds]);

        app(DeleteLinks::class)->execute($linkIds, true);

        return $this->success();
    }
}
