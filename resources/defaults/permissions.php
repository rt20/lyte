<?php

return [
    'roles' => [
        [
            'default' => true,
            'name' => 'users',
            'extends' => 'users',
            'permissions' => [
                // API
                'api.access',

                // LINKS
                [
                    'name' => 'links.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 20,
                        ],
                        [
                            'name' => 'click_count',
                            'value' => 5000,
                        ]
                    ]
                ],

                // LINK GROUPS
                [
                    'name' => 'link_groups.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 5,
                        ],
                    ]
                ],

                // BIOLINKS
                [
                    'name' => 'biolinks.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 3,
                        ],
                    ]
                ],

                // CUSTOM DOMAINS
                [
                    'name' => 'custom_domains.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 5,
                        ],
                    ]
                ],

                // LINK OVERLAYS
                [
                    'name' => 'link_overlays.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 5,
                        ],
                    ]
                ],

                // LINK PAGES
                [
                    'name' => 'custom_pages.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 5,
                        ],
                    ]
                ],

                // TRACKING PIXELS
                [
                    'name' => 'tracking_pixels.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 5,
                        ],
                    ]
                ],

                // WORKSPACES
                [
                    'name' => 'workspaces.create',
                    'restrictions' => [
                        [
                            'name' => 'count',
                            'value' => 3,
                        ],
                        [
                            'name' => 'member_count',
                            'value' => 5,
                        ],
                    ]
                ],
            ]
        ],

        [
            'name' => 'guests',
            'guests' => true,
            'extends' => 'guests',
            'permissions' => [
                'links.create',
            ]
        ],
    ],
    'all' => [
        'links' => [
            [
                'name' => 'links.create',
                'restrictions' => [
                    [
                        'name' => 'count',
                        'type' => 'number',
                        'description' => __('policies.count_description', ['resources' => 'urls'])
                    ],
                    [
                        'name' => 'click_count',
                        'type' => 'number',
                        'description' => 'Maximum number of clicks/visits allowed per month for all user urls. Leave empty for unlimited.'
                    ],
                    [
                        'name' => 'alias',
                        'type' => 'bool',
                        'description' => 'Whether user is allowed to set custom alias for links.',
                    ],
                    [
                        'name' => 'expiration',
                        'type' => 'bool',
                        'description' => 'Whether user is allowed to set expiration date or clicks for links.',
                    ],
                    [
                        'name' => 'password',
                        'type' => 'bool',
                        'description' => 'Whether user is allowed to set password for links.',
                    ],
                    [
                        'name' => 'utm',
                        'type' => 'bool',
                        'description' => 'Whether user is allowed to use utm builder when shortening links.',
                    ],
                    [
                        'name' => 'retargeting',
                        'type' => 'bool',
                        'description' => 'Whether user is allowed to use location, device and platform retargeting features.',
                    ]
                ]
            ],
            [
                'name' => 'links.view',
                'description' => 'Allow viewing of all links on the site, regardless of who created them. User can view their own links without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'links.update',
                'description' => 'Allow editing of all links on the site, regardless of who created them. User can edit their own links without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'links.delete',
                'description' => 'Allow deleting of all links on the site, regardless of who created them. User can delete their own links without this permission.',
                'advanced' => true,
            ],
        ],
        'link_overlays' => [
            [
                'name' => 'link_overlays.create',
                'restrictions' => [
                    [
                        'name' => 'count',
                        'type' => 'number',
                        'description' => __('policies.count_description', ['resources' => 'overlays'])
                    ]
                ]
            ],
            [
                'name' => 'link_overlays.view',
                'description' => 'Allow viewing of all overlays on the site, regardless of who created them. User can view their own overlays without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'link_overlays.update',
                'description' => 'Allow editing of all overlays on the site, regardless of who created them. User can edit their own overlays without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'link_overlays.delete',
                'description' => 'Allow deleting of all overlays on the site, regardless of who created them. User can delete their own overlays without this permission.',
                'advanced' => true,
            ],
        ],
        'link_groups' => [
            [
                'name' => 'link_groups.create',
                'restrictions' => [
                    [
                        'name' => 'count',
                        'type' => 'number',
                        'description' => __('policies.count_description', ['resources' => 'groups'])
                    ]
                ]
            ],
            [
                'name' => 'link_groups.view',
                'description' => 'Allow viewing of all link groups on the site, regardless of who created them. User can view their own groups without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'link_groups.update',
                'description' => 'Allow editing of all link groups on the site, regardless of who created them. User can edit their own groups without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'link_groups.delete',
                'description' => 'Allow deleting of all link groups on the site, regardless of who created them. User can delete their own groups without this permission.',
                'advanced' => true,
            ],
        ],
        'biolinks' => [
            [
                'name' => 'biolinks.create',
                'restrictions' => [
                    [
                        'name' => 'count',
                        'type' => 'number',
                        'description' => __('policies.count_description', ['resources' => 'biolinks'])
                    ]
                ]
            ],
            [
                'name' => 'biolinks.view',
                'description' => 'Allow viewing of all biolinks on the site, regardless of who created them. User can view their own biolinks without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'biolinks.update',
                'description' => 'Allow editing of all biolinks on the site, regardless of who created them. User can edit their own biolinks without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'biolinks.delete',
                'description' => 'Allow deleting of all biolinks on the site, regardless of who created them. User can delete their own biolinks without this permission.',
                'advanced' => true,
            ],
        ],
        'tracking_pixels' => [
            [
                'name' => 'tracking_pixels.create',
                'restrictions' => [
                    [
                        'name' => 'count',
                        'type' => 'number',
                        'description' => __('policies.count_description', ['resources' => 'pixels'])
                    ]
                ]
            ],
            [
                'name' => 'tracking_pixels.view',
                'description' => 'Allow viewing of all pixels on the site, regardless of who created them. User can view their own pixels without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'tracking_pixels.update',
                'description' => 'Allow editing of all pixels on the site, regardless of who created them. User can edit their own pixels without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'tracking_pixels.delete',
                'description' => 'Allow deleting of all pixels on the site, regardless of who created them. User can delete their own pixels without this permission.',
                'advanced' => true,
            ],
        ],
        'workspaces' => [
            [
                'name' => 'workspaces.create',
                'restrictions' => [
                    [
                        'name' => 'count',
                        'type' => 'number',
                        'description' => __('policies.count_description', ['resources' => 'workspaces'])
                    ],
                    [
                        'name' => 'member_count',
                        'type' => 'number',
                        'description' => 'Maximum number of members workspace is allowed to have.',
                    ]
                ]
            ],
            [
                'name' => 'workspaces.view',
                'description' => 'Allow viewing of all workspaces on the site, regardless of who created them. User can view their own workspaces without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'workspaces.update',
                'description' => 'Allow editing of all workspaces on the site, regardless of who created them. User can edit their own workspaces without this permission.',
                'advanced' => true,
            ],
            [
                'name' => 'workspaces.delete',
                'description' => 'Allow deleting of all workspaces on the site, regardless of who created them. User can delete their own workspaces without this permission.',
                'advanced' => true,
            ],
        ],
        'workspace_members' => [
            [
                'name' => 'workspace_members.invite',
                'display_name' => 'Invite Members',
                'type' => 'workspace',
                'description' => 'Allow user to invite new members into a workspace.',
            ],
            [
                'name' => 'workspace_members.update',
                'display_name' => 'Update Members',
                'type' => 'workspace',
                'description' => 'Allow user to change role of other members.',
            ],
            [
                'name' => 'workspace_members.delete',
                'display_name' => 'Delete Members',
                'type' => 'workspace',
                'description' => 'Allow user to remove members from workspace.',
            ]
        ]
    ],
];
