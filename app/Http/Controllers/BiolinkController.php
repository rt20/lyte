<?php

namespace App\Http\Controllers;

use App\Actions\Biolink\AddInitialContentToBiolink;
use App\Biolink;
use App\Http\Requests\CrupdateLinkGroupRequest;
use App\LinkGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BiolinkController extends LinkGroupController
{
    public function __construct(Biolink $model, Request $request)
    {
        parent::__construct($model, $request);
    }

    public function store(CrupdateLinkGroupRequest $request)
    {
        $response = parent::store($request);
        $biolink = $response->getOriginalContent()['biolink'];

        app(AddInitialContentToBiolink::class)->execute($biolink['id'], Auth::user());

        return $response;
    }

    public function show(LinkGroup $biolink)
    {
        $this->authorize('show', $biolink);

        if ($this->request->get('loadContent')) {
          /** @var Biolink $biolink */
          $biolink->loadContent();
        }

        return $this->success(['biolink' => $biolink]);
    }
}
