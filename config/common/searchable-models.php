<?php

use App\Link;

return [
    Link::class => [
        'filter_only_fields' => [
            'id',
            'hash',
            'type',
            'disabled',
            'groups',
            'user_id',
            'created_at',
            'updated_at',
            'expires_at',
            'password',
            'workspace_id',
        ],
    ],
    \App\LinkGroup::class => [
        'filter_only_fields' => [
            'id',
            'user_id',
            'created_at',
            'updated_at',
            'public',
            'workspace_id',
            'rotator',
        ],
    ]
];
