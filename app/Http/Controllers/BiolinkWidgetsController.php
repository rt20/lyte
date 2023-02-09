<?php

namespace App\Http\Controllers;

use App\Biolink;
use App\BiolinkWidget;
use Common\Core\BaseController;

class BiolinkWidgetsController extends BaseController
{
    public function store(Biolink $biolink)
    {
        $this->authorize('update', $biolink);

        $payload = $this->validate(request(), [
            'type' => 'required|string',
            'position' => 'int',
            'config' => 'nullable|array',
        ]);

        $widget = $biolink->widgets()->create($payload);

        $biolink->adjustPositions(
            direction: 'increment',
            anchor: $payload['position'] ?? null,
            widgetToSkip: $widget->id,
        );

        return $this->success([
            'biolink' => $biolink->fresh()->loadContent(),
        ]);
    }

    public function update(Biolink $biolink, BiolinkWidget $widget)
    {
        $this->authorize('update', $biolink);

        $payload = $this->validate(request(), [
            'type' => 'string',
            'config' => 'array',
        ]);

        $widget->update($payload);

        return $this->success([
            'biolink' => $biolink->fresh()->loadContent(),
        ]);
    }
}
