<?php

namespace App\Http\Controllers;

use App\Actions\Link\BuildLinkClicksReport;
use Common\Core\BaseController;
use Common\Workspaces\ActiveWorkspace;
use Illuminate\Http\Request;

class ClicksReportController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected ActiveWorkspace $activeWorkspace,
    ) {
        $this->middleware('auth');
    }

    public function show()
    {
        $report = app(BuildLinkClicksReport::class)->execute(
            $this->request->all(),
        );

        return $this->success(['report' => $report]);
    }
}
