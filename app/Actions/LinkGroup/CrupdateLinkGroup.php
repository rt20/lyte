<?php

namespace App\Actions\LinkGroup;

use App\Biolink;
use App\LinkGroup;
use Arr;
use Auth;
use Common\Tags\Tag;

class CrupdateLinkGroup
{
    public function execute(
        LinkGroup|Biolink $initialGroup,
        array $data,
    ): LinkGroup|Biolink {
        if (!$initialGroup->exists) {
            $group = $initialGroup->create([
                'name' => $data['name'],
                'user_id' => Auth::id(),
                'hash' => $data['hash'],
                'clicks_count' => 0,
            ]);
        } else {
            $group = $initialGroup;
        }

        $attributes = [
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'expires_at' => $data['expires_at'] ?? null,
            'activates_at' => $data['activates_at'] ?? null,
            'active' => $data['active'] ?? true,
            'hash' => $data['hash'],
            'utm' => $data['utm'] ?? null,
            'rotator' => $data['rotator'] ?? false,
            'domain_id' => $data['domain_id'] ?? null, // can be 0
        ];

        if (array_key_exists('image', $data)) {
            $attributes['image'] = $data['image'] ?? null;
        }

        // restore group if user has removed expires_at date from expired link
        if (is_null($attributes['expires_at'])) {
            $attributes['deleted_at'] = null;
        }

        // make sure not to clear password if it was not changed
        if (Arr::has($data, 'password')) {
            $attributes['password'] = $data['password'] ?: null;
        }

        $group->fill($attributes)->save();

        if (isset($data['rules'])) {
            $group->rules()->delete();
            $rules = $group->rules()->createMany(Arr::get($data, 'rules'));
            $group->setRelation('rules', $rules);
        }

        if (Arr::get($data, 'exp_clicks_rule.key')) {
            $group
                ->rules()
                ->updateOrCreate(
                    ['type' => 'exp_clicks'],
                    $data['exp_clicks_rule'],
                );
        }

        if (isset($data['tags'])) {
            $tags = app(Tag::class)->insertOrRetrieve($data['tags'], Tag::DEFAULT_TYPE);
            $group->tags()->sync($tags);
            $group->setRelation('tags', $tags);
        }

        if (isset($data['pixels'])) {
            $group->pixels()->sync(Arr::get($data, 'pixels'));
        }

        return $group;
    }
}
