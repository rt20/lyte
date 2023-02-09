<?php

namespace App\Http\Controllers;

use Common\Auth\Validators\PasswordIsValid;
use Common\Core\BaseController;

class LinkPasswordController extends BaseController
{
    public function __invoke()
    {
        $data = $this->validate(request(), [
            'linkeableType' => 'required|string',
            'linkeableId' => 'required|int',
        ]);

        $namespace = modelTypeToNamespace($data['linkeableType']);
        $model = app($namespace)->find($data['linkeableId']);

        $this->validate(request(), [
            'password' => ['required', new PasswordIsValid($model->password)],
        ]);

        return $this->success(['matches' => true]);
    }
}
