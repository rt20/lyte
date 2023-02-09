<?php

namespace App\Http\Controllers;

use App\Actions\TrackingPixel\CrupdateTrackingPixel;
use App\Actions\TrackingPixel\DeleteTrackingPixels;
use App\Http\Requests\CrupdateTrackingPixelRequest;
use App\TrackingPixel;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Http\Request;

class TrackingPixelController extends BaseController
{
    public function __construct(
        protected TrackingPixel $trackingPixel,
        protected Request $request,
    ) {
    }

    public function index()
    {
        $this->authorize('index', TrackingPixel::class);

        $dataSource = new Datasource(
            $this->trackingPixel,
            $this->request->all(),
        );

        $pagination = $dataSource->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function show(TrackingPixel $trackingPixel)
    {
        $this->authorize('show', $trackingPixel);

        return $this->success(['pixel' => $trackingPixel]);
    }

    public function store(CrupdateTrackingPixelRequest $request)
    {
        $this->authorize('store', TrackingPixel::class);

        $pixel = app(CrupdateTrackingPixel::class)->execute($request->all());

        return $this->success(['pixel' => $pixel]);
    }

    public function update(
        TrackingPixel $trackingPixel,
        CrupdateTrackingPixelRequest $request,
    ) {
        $this->authorize('update', $trackingPixel);

        $pixel = app(CrupdateTrackingPixel::class)->execute(
            $request->all(),
            $trackingPixel,
        );

        return $this->success(['pixel' => $pixel]);
    }

    public function destroy(string $ids)
    {
        $trackingPixelIds = explode(',', $ids);
        $this->authorize('destroy', [TrackingPixel::class, $trackingPixelIds]);

        app(DeleteTrackingPixels::class)->execute($trackingPixelIds);

        return $this->success();
    }
}
