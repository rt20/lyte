<?php

namespace App\Http\Controllers;

use App\Biolink;
use Common\Core\BaseController;

class BiolinkAppearanceController extends BaseController
{
    public function save(Biolink $biolink)
    {
        $this->authorize('update', $biolink);

        $config = request('config', []);

        // delete appearance col if there's no config
        if ($biolink->appearance && empty($config)) {
            $biolink->appearance->delete();
        } else {
            if ($biolink->appearance) {
                $biolink->appearance->update(['config' => $config]);
            } else {
                $appearance = $biolink
                    ->appearance()
                    ->create(['config' => $config]);
                $biolink->setRelation('appearance', $appearance);
            }
        }

        $biolink->touch();

        return $this->success(['appearance' => $biolink->appearance]);
    }
}
