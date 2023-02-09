<?php

namespace App\Actions\TrackingPixel;

use App\TrackingPixel;
use Auth;
use Illuminate\Support\Arr;

class CrupdateTrackingPixel
{
    public function __construct(protected TrackingPixel $trackingPixel)
    {
    }

    public function execute(
        array $data,
        TrackingPixel $pixel = null,
    ): TrackingPixel {
        if (!$pixel) {
            $pixel = $this->trackingPixel->newInstance([
                'user_id' => Auth::id(),
            ]);
        }

        $attributes = [
            'name' => $data['name'],
            'type' => $data['type'],
            'pixel_id' => Arr::get($data, 'pixel_id'),
            'head_code' => Arr::get($data, 'head_code'),
            'body_code' => Arr::get($data, 'body_code'),
        ];

        $pixel->fill($attributes)->save();

        return $pixel;
    }
}
