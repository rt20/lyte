<?php

namespace App\Http\Controllers;

use Common\Admin\Search\SearchSettingsController;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Contracts\Auth\Access\Gate;

class SearchController extends BaseController
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function index()
    {
        $models = SearchSettingsController::searchableModels();

        $results = collect($models)
            ->filter(function ($namespace) {
                return true;
                return App(Gate::class)->allows('index', $namespace);
            })
            ->mapWithKeys(function ($namespace) {
                $model = new $namespace();

                $dataSource = new Datasource($model, [
                    'query' => request()->get('query'),
                    'perPage' => 5,
                ]);
                //$dataSource->where('user_id', '=', Auth::id());
                return [
                    $model->getTable() => $dataSource->get(),
                ];
            });

        return $this->success(['results' => $results]);
    }
}
