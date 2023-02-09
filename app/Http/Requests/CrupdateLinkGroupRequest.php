<?php

namespace App\Http\Requests;

use Common\Settings\Settings;
use Common\Workspaces\Rules\UniqueWorkspacedResource;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CrupdateLinkGroupRequest extends FormRequest
{
    public function rules(Settings $settings): array
    {
        $groupId = $this->route('link_group')->id ?? $this->route('biolink');
        $ruleRequired = $this->getMethod() === 'POST' ? 'required' : '';

        $aliasMin = $settings->get('links.alias_min', 5);
        $aliasMax = $settings->get('links.alias_max', 10);
        $aliasContent = $settings->get('links.alias_content', 'alpha-dash');

        return [
            'name' => [
                'required',
                'min:3',
                'max:250',
                (new UniqueWorkspacedResource('link_groups'))->ignore(
                    $groupId,
                ),
            ],
            'description' => 'nullable|string|min:1|max:250',
            'expires_at' => 'nullable|date',
            'active' => 'boolean',
            'password' => 'nullable|string|max:250',
            'domain_id' => 'nullable|integer',
            'rules' => 'array',
            'rules.*.key' => "$ruleRequired|string|max:250",
            'rules.*.value' => "$ruleRequired|string|max:250",
            'rules.*.type' => "$ruleRequired|string|max:250",
            'hash' => [
                'required',
                'string',
                $aliasContent,
                "min:$aliasMin",
                "max:$aliasMax",
                Rule::unique('links', 'alias')
                    ->where(function (Builder $builder) {
                        if ($domainId = $this->get('domain_id')) {
                            $builder->where('domain_id', $domainId);
                        } else {
                            $builder
                                ->whereNull('domain_id')
                                ->orWhere('domain_id', 0);
                        }
                    }),
                Rule::unique('link_groups', 'hash')
                    ->ignore($groupId)
                    ->where(function (Builder $builder) {
                        if ($domainId = $this->get('domain_id')) {
                            $builder->where('domain_id', $domainId);
                        } else {
                            $builder
                                ->whereNull('domain_id')
                                ->orWhere('domain_id', 0);
                        }
                    }),
            ],
        ];
    }
}
