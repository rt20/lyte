<?php

return [
    // LINKS
    ['method' => 'DELETE', 'name' => 'link/{link}', 'origin' => 'admin'],
    ['method' => 'PUT', 'name' => 'link/{link}', 'origin' => 'admin'],

    // LINK GROUPS
    [
        'method' => 'DELETE',
        'name' => 'link-group/{link_group}',
        'origin' => 'admin',
    ],
    [
        'method' => 'PUT',
        'name' => 'link-group/{link_group}',
        'origin' => 'admin',
    ],

    // BIOLINKS
    [
        'method' => 'DELETE',
        'name' => 'biolink/{biolink}',
        'origin' => 'admin',
    ],
    [
        'method' => 'PUT',
        'name' => 'biolink/{biolink}',
        'origin' => 'admin',
    ],
    [
        'method' => 'PUT',
        'name' => 'biolink/{biolink}/content-item',
        'origin' => 'admin',
    ],
    [
        'method' => 'POST',
        'name' => 'biolink/{biolink}/content-item/detach',
        'origin' => 'admin',
    ],

    // LINK OVERLAYS
    [
        'method' => 'DELETE',
        'name' => 'link-overlay/{link_overlay}',
        'origin' => 'admin',
    ],
    [
        'method' => 'PUT',
        'name' => 'link-overlay/{link_overlay}',
        'origin' => 'admin',
    ],

    // TRACKING PIXELS
    ['method' => 'DELETE', 'name' => 'tp/{ids}', 'origin' => 'admin'],
    ['method' => 'PUT', 'name' => 'tp/{trackingPixel}', 'origin' => 'admin'],
];
