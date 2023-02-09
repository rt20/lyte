<?php

namespace App\Actions;

use Common\Core\Bootstrap\BaseBootstrapData;
use Illuminate\Http\Request;

class AppBootstrapData extends BaseBootstrapData
{
    public function init(): self
    {
        parent::init();
        $this->data['linkeableResponse'] = app(Request::class)->route('linkeableResponse');
        return $this;
    }
}
