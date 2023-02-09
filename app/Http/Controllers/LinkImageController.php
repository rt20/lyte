<?php

namespace App\Http\Controllers;

use App\Link;
use Arr;
use Carbon\Carbon;
use Common\Core\BaseController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Storage;

class LinkImageController extends BaseController
{

    public function __construct(protected Link $link)
    {
    }

    public function show(string $hash)
    {
        $link = $this->link->where('hash', $hash)->firstOrFail();
        $this->authorize('show', $link);

        // Don't create image if request is coming from a crawler
        if (defined('SHOULD_PRERENDER')) {
            return $link->image;
        }

        if (
            !$link->image ||
            // update automatically generated image once a week
            (Str::contains($link->image, '_auto_') &&
                $link->updated_at->lessThan(Carbon::now()->subWeek()))
        ) {
            $this->generateWebsiteScreenshot($link);
        }

        return redirect("storage/$link->image");
    }

    private function generateWebsiteScreenshot(Link $link)
    {
        $path = "link_images/{$link->hash}_auto_.jpg";

        try {
            $apis = [
                "https://s.wordpress.com/mshots/v1/$link->long_url?w=800",
                "https://api.pagepeeker.com/v2/thumbs.php?size=l&url=$link->long_url",
                "https://api.miniature.io/?width=800&height=600&screen=1024&url=$link->long_url",
                'https://image.thum.io/get/width/600/crop/900/' .
                urldecode($link->long_url),
            ];
            $imageData = Http::get(Arr::random($apis))->body();
        } catch (\Exception $e) {
          //
        }

        if (isset($imageData)) {
            Storage::disk('public')->put($path, $imageData);
            $link->fill(['image' => $path])->save();
        }
    }
}
