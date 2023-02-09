<?php

namespace App\Actions\Biolink;

use App\BiolinkWidget;
use Common\Auth\BaseUser;

class AddInitialContentToBiolink
{
    public function execute(
        int $biolinkId,
        BaseUser $user,
        int $linkCount = 0,
    ): void {
        $widgets = [
            [
                'biolink_id' => $biolinkId,
                'type' => 'image',
                'position' => 0,
                'pinned' => 'top',
                'config' => json_encode([
                    'type' => 'avatar',
                ]),
            ],
            [
                'biolink_id' => $biolinkId,
                'type' => 'text',
                'position' => 1,
                'pinned' => 'top',
                'config' => json_encode([
                    'title' => '@' . $user->display_name,
                ]),
            ],
            [
                'biolink_id' => $biolinkId,
                'type' => 'socials',
                'position' => $linkCount + 2,
                'pinned' => null,
                'config' => json_encode([
                    'facebook' => 'https://facebook.com/username',
                    'instagram' => '#instagram-handle',
                    'twitter' => '#twitter-handle',
                ]),
            ],
        ];

        BiolinkWidget::insert($widgets);
    }
}
