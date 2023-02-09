<?php

namespace App\Http\Controllers;

use App\Biolink;
use App\BiolinkWidget;
use App\Link;
use Common\Core\BaseController;
use DB;

class BiolinkContentOrderController extends BaseController
{
    public function changeOrder(Biolink $biolink)
    {
        $this->authorize('update', $biolink);

        $data = $this->validate(request(), [
            'order' => 'array|min:1',
            'order.*.id' => 'required|integer',
            'order.*.model_type' => 'required|string',
            'widgetToPin' => 'integer',
        ]);

        $widgetQuery = '';
        $linkQuery = '';
        foreach ($data['order'] as $position => $value) {
            $position++;
            $id = $value['id'];
            if ($value['model_type'] === Link::MODEL_TYPE) {
                $linkQuery .= " when link_id=$id then $position";
            } else {
                $widgetQuery .= " when id=$id then $position";
            }
        }

        if ($linkQuery) {
            $linkIds = collect($data['order'])
                ->where('model_type', Link::MODEL_TYPE)
                ->pluck('id');
            DB::table('link_group_link')
                ->where('link_group_id', $biolink->id)
                ->whereIn('link_id', $linkIds)
                ->update(['position' => DB::raw("(case $linkQuery end)")]);
        }

        if ($widgetQuery) {
            $widgetIds = collect($data['order'])
                ->where('model_type', BiolinkWidget::MODEL_TYPE)
                ->pluck('id');
            BiolinkWidget::where('biolink_id', $biolink->id)
                ->whereIn('id', $widgetIds)
                ->update(['position' => DB::raw("(case $widgetQuery end)")]);
        }

        if (isset($data['widgetToPin'])) {
          BiolinkWidget::where('id', $data['widgetToPin'])->update(['pinned' => 'top']);
        }

        return $this->success();
    }
}
