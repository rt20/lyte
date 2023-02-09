<?php

namespace App\Http\Controllers;

use App\LinkPage;
use Common\Pages\CustomPageController;
use Illuminate\Http\Request;

class LinkPagesController extends CustomPageController
{
    public function __construct(LinkPage $page, Request $request)
    {
        parent::__construct($page, $request);
    }
}
