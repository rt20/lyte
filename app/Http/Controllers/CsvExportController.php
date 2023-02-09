<?php

namespace App\Http\Controllers;

use App\Jobs\ExportLinkGroupsCsv;
use App\Jobs\ExportLinksCsv;
use App\Link;
use Auth;
use Common\Csv\BaseCsvExportController;

class CsvExportController extends BaseCsvExportController
{
    public function exportLinks()
    {
        $forUser = null;
        if ($this->request->get('type') === 'all') {
            $this->authorize('index', Link::class);
        } else {
            $forUser = Auth::user();
        }

        return $this->exportUsing(
            new ExportLinksCsv(Auth::id(), $forUser, $this->request->all()),
        );
    }

    public function exportGroups()
    {
        $forUser = null;
        if ($this->request->get('type') === 'all') {
            $this->authorize('index', Link::class);
        } else {
            $forUser = Auth::user();
        }

        return $this->exportUsing(
            new ExportLinkGroupsCsv(Auth::id(), $forUser),
        );
    }
}
