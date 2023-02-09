<?php

namespace App\Http\Controllers;

use App\Biolink;
use App\BiolinkLink;
use App\Link;
use Common\Core\BaseController;

class BiolinkContentItemController extends BaseController
{
    public function update(Biolink $biolink)
    {
        $this->authorize('update', $biolink);

        $data = $this->validate(request(), [
            'active' => 'boolean',
            'image' => 'nullable|string',
            'animation' => 'nullable|string',
            'leap_until' => 'nullable|date',
            'expires_at' => 'nullable|date',
            'activates_at' => 'nullable|date',
            'item_id' => 'required|int',
            'item_model_type' => 'required|string',
            'pinned' => 'nullable|string',
        ]);
        $isLink = $data['item_model_type'] === Link::MODEL_TYPE;
        $item = $isLink
            ? $biolink->links()->findOrFail($data['item_id'])
            : $biolink->widgets()->findOrFail($data['item_id']);
        $modelFields = $isLink
            ? ['active', 'image', 'expires_at', 'activates_at']
            : ['active', 'pinned'];

        // update values that are in the pivot table
        if ($isLink) {
            $this->setPivotAttrs($biolink, $item, $data);
        }

        // update values that are directly on the model
        $modelValues = collect($modelFields)->mapWithKeys(function (
            $field,
        ) use ($data) {
            if (array_key_exists($field, $data)) {
                return [$field => $data[$field]];
            }
            return [];
        });

        if ($modelValues->isNotEmpty()) {
            $item->update($modelValues->toArray());
        }

        return $this->success([
            'biolink' => $biolink->fresh()->loadContent(),
        ]);
    }

    public function detach(Biolink $biolink)
    {
        $this->authorize('update', $biolink);

        $data = $this->validate(request(), [
            'item.id' => 'required|int',
            'item.model_type' => 'required|string',
            'item.position' => 'required|int',
        ]);

        if ($data['item']['model_type'] === Link::MODEL_TYPE) {
            $biolink->links()->detach($data['item']['id']);
        } else {
            $biolink
                ->widgets()
                ->where('id', $data['item']['id'])
                ->delete();
        }

        $biolink->adjustPositions(
            direction: 'decrement',
            anchor: $data['item']['position'],
        );

        return $this->success([
            'biolink' => $biolink->fresh()->loadContent(),
        ]);
    }

    private function setPivotAttrs(
        Biolink $biolink,
        BiolinkLink $link,
        array $data,
    ) {
        $pivotAttrs = [];

        if (array_key_exists('animation', $data)) {
            $pivotAttrs['animation'] = $data['animation'];
        }
        if (array_key_exists('leap_until', $data)) {
            // clear all other leap links for this biolink
            $biolink
                ->links()
                ->whereNotNull('leap_until')
                ->update(['leap_until' => null]);
            $pivotAttrs['leap_until'] = $data['leap_until'];
        }

        if (!empty($pivotAttrs)) {
            $link->pivot->update($pivotAttrs);
        }
    }
}
