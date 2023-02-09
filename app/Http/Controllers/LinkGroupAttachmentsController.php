<?php

namespace App\Http\Controllers;

use App\Link;
use App\LinkGroup;
use Common\Core\BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LinkGroupAttachmentsController extends BaseController
{
    /**
     * @var Request
     */
    private $request;

    public function __construct(Request $request, LinkGroup $linkGroup)
    {
        $this->request = $request;
    }

    public function attach(LinkGroup $linkGroup)
    {
        $this->authorize('update', $linkGroup);

        $this->validate($this->request, [
            'linkIds' => 'required|array',
            'linkIds.*' => 'required|integer'
        ]);

        $linkGroup->links()->syncWithoutDetaching($this->request->get('linkIds'));

        return $this->success();
    }

    public function detach(LinkGroup $linkGroup)
    {
        $linkIds = $this->request->get('linkIds');
        $this->authorize('destroy', [Link::class, $linkIds]);

        $this->validate($this->request, [
            'linkIds' => 'required|array',
            'linkIds.*' => 'required|integer'
        ]);

        $linkGroup->links()->detach($linkIds);

        return $this->success();
    }
}
