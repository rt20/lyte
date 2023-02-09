<?php

namespace App\Http\Requests;

use Auth;
use Common\Core\BaseFormRequest;
use Common\Workspaces\Rules\UniqueWorkspacedResource;

class CrupdateTrackingPixelRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $required = $this->getMethod() === 'POST' ? 'required' : '';
        $ignore = $this->getMethod() === 'PUT' ? $this->route('trackingPixel')->id : '';
        $userId = $this->route('trackingPixel') ? $this->route('trackingPixel')->user_id : Auth::id();

        return [
            'name' => [
                $required, 'string', 'min:3',
                (new UniqueWorkspacedResource('tracking_pixels', 'NULL', $userId))->ignore($ignore)
            ],
            'type' => 'required|string|max:40',
            'pixel_id' => 'nullable|string|max:200',
            'head_code' => 'nullable|string',
            'body_code' => 'nullable|string',
        ];
    }
}
