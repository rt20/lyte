<?php

namespace App\Actions\Overlay;

use App\LinkOverlay;
use Auth;

class CrupdateLinkOverlay
{
    public function __construct(protected LinkOverlay $overlay)
    {
    }

    public function execute(
        array $data,
        LinkOverlay $overlay = null
    ): LinkOverlay {
        if (!$overlay) {
            $overlay = $this->overlay->newInstance(['user_id' => Auth::id()]);
        }

        $attributes = [
            'name' => $data['name'],
            'position' => $data['position'],
            'theme' => $data['theme'] ?? 'default',
            'message' => $data['message'],
            'label' => $data['label'],
            'btn_link' => $data['btn_link'],
            'btn_text' => $data['btn_text'],
            'colors' => $data['colors'],
        ];

        $overlay->fill($attributes)->save();

        return $overlay;
    }
}
