<?php

namespace App\Http\Controllers;

use App\Actions\Link\CrupdateLink;
use App\Biolink;
use App\Http\Requests\CrupdateLinkRequest;
use App\Link;
use Common\Core\BaseController;

class BiolinkLinkController extends BaseController
{
    public function store(Biolink $biolink, CrupdateLinkRequest $request)
    {
        $this->authorize('update', $biolink);

        $payload = $request->all();
        $payload['groups'] = [
            $payload['groups'][0] => ['position' => request('position', 0)],
        ];

        $link = (new CrupdateLink(fetchMetadata: false))->execute(
            Link::newModelInstance(),
            $payload,
        );

        $biolink->adjustPositions(
            direction: 'increment',
            anchor: request('position', null),
            linkToSkip: $link->id,
        );

        return $this->success([
            'biolink' => $biolink->fresh()->loadContent(),
        ]);
    }

    public function update(
        Biolink $biolink,
        Link $link,
        CrupdateLinkRequest $request,
    ) {
        $this->authorize('update', $biolink);

        app(CrupdateLink::class)->execute($link, $request->all());

        return $this->success([
            'biolink' => $biolink->fresh()->loadContent(),
        ]);
    }
}
