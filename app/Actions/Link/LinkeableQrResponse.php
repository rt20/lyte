<?php

namespace App\Actions\Link;

use App\Biolink;
use App\Link;
use App\LinkGroup;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LinkeableQrResponse
{
    /**
     * @param LinkGroup|Link|Biolink $linkeable
     */
    public function make($linkeable): StreamedResponse
    {
        $renderer = new ImageRenderer(
            new RendererStyle(160),
            new SvgImageBackEnd(),
        );
        $writer = new Writer($renderer);
        $response = $writer->writeString("$linkeable->short_url?source=qr");

        return response()->stream(
            function () use ($response) {
                echo $response;
            },
            200,
            [
                'Content-Type' => 'image/svg+xml',
                'Content-Length: ' . strlen($response),
            ],
        );
    }
}
