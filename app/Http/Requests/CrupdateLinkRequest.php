<?php

namespace App\Http\Requests;

use App\Actions\Link\Validators\ValidateLinkWithGoogleSafeBrowsing;
use App\Actions\Link\Validators\ValidateLinkWithPhishtank;
use Common\Core\BaseFormRequest;
use Common\Settings\Settings;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Str;

class CrupdateLinkRequest extends BaseFormRequest
{
    public function rules(Settings $settings): array
    {
        $ruleRequired = $this->getMethod() === 'POST' ? 'required' : '';
        $longUrlRequired =
            $this->getMethod() === 'POST' ? 'required_without:long_urls' : '';
        $except = $this->getMethod() === 'PUT' ? $this->route('link')->id : '';

        $aliasMin = $settings->get('links.alias_min', 5);
        $aliasMax = $settings->get('links.alias_max', 10);
        $aliasContent = $settings->get('links.alias_content', 'alpha-dash');

        $linkMin = $settings->get('links.min_len', 3);
        $linkMax = $settings->get('links.max_len', 1000);

        $rules = [
            'alias' => [
                'nullable',
                'string',
                $aliasContent,
                "min:$aliasMin",
                "max:$aliasMax",
                Rule::unique('links', 'alias')
                    ->ignore($except)
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
            'long_url' => "string|$longUrlRequired|min:$linkMin|max:$linkMax",
            'domain_id' => 'nullable|integer',
            'password' => 'nullable|string|max:250',
            'image' => 'string|nullable|max:250',
            'active' => 'nullable|boolean',
            'description' => 'nullable|string|max:250',
            'expires_at' => 'nullable|date',
            'pixels.*' => 'required|int',
            'groups' => 'array',
            'rules' => 'array',
            'rules.*.key' => "$ruleRequired|string|max:250",
            'rules.*.value' => "$ruleRequired|string|max:250",
            'rules.*.type' => "$ruleRequired|string|max:250",
        ];

        if ($this->getMethod() === 'POST') {
            $rules['long_urls'] = 'required_without:long_url|array|max:10';
            $rules['long_urls.*'] = 'required';
        }

        return $rules;
    }

    protected function withValidator(Validator $validator)
    {
        return $validator->after(function (Validator $validator) {
            if ($validator->errors()->has('long_urls.*')) {
                $validator
                    ->errors()
                    ->add('long_urls', 'One of the urls is not valid.');
                // base "url" validation failed, can bail
                return;
            }

            if ($multipleUrls = $this->get('long_urls')) {
                foreach ($multipleUrls as $url) {
                    $this->runCustomValidations($url, $validator, 'long_urls');
                }
            } elseif ($longUrl = $this->get('long_url')) {
                $this->runCustomValidations($longUrl, $validator, 'long_url');
            }
        });
    }

    private function runCustomValidations(
        string $url,
        Validator $validator,
        string $errorKey,
    ) {
        $this->validateAgainstBlacklist(
            $url,
            $validator,
            'keywords',
            $errorKey,
        );
        $this->validateAgainstBlacklist($url, $validator, 'domains', $errorKey);
        $this->validateAgainstGoogleSafeBrowsing($url, $validator, $errorKey);
        $this->validateAgainstPhishtank($url, $validator, $errorKey);
        $this->validateOriginPolicy($url, $validator, $errorKey);
    }

    private function validateOriginPolicy($url, Validator $validator, $errorKey)
    {
        $type = $this->get('type') ?: $this->route('link.type');
        if ($type !== 'frame' && $type !== 'overlay') {
            return;
        }

        $blacklist = [
            'x-frame-options: deny',
            'x-frame-options: sameorigin',
            'x-frame-options: allow-from',
        ];

        try {
            $headers = get_headers($url);
        } catch (Exception $e) {
            $headers = [];
        }

        $cantIframe = collect($headers)->first(function ($header) use (
            $blacklist,
        ) {
            $header = strtolower($header);
            return array_search($header, $blacklist) !== false;
        });

        if ($cantIframe) {
            $start = $errorKey === 'long_url' ? 'This URL' : 'One of the urls';
            $validator
                ->errors()
                ->add(
                    $errorKey,
                    __(
                        "$start does not allow framing. Please select a different link type.",
                    ),
                );
        }
    }

    private function validateAgainstBlacklist(
        string $url,
        Validator $validator,
        string $listName,
        string $errorKey,
    ) {
        // key specified blacklist (keyword or domain)
        $list = collect(
            explode(
                ',',
                app(Settings::class)->get("links.blacklist.$listName"),
            ),
        );
        $list->transform(function ($item) {
            return trim($item);
        });

        // check if url matches any blacklist item
        $match = $list->first(function ($item) use ($url) {
            return Str::contains($url, $item);
        });
        if ($match) {
            if ($listName === 'keywords') {
                $validator->errors()->add(
                    $errorKey,
                    __('URLs can\'t contain the word ":word".', [
                        'word' => $match,
                    ]),
                );
            } else {
                $validator->errors()->add(
                    $errorKey,
                    __('URLs from ":domain" domain can\'t be shortened.', [
                        'domain' => $match,
                    ]),
                );
            }
        }
    }

    private function validateAgainstGoogleSafeBrowsing(
        string $url,
        Validator $validator,
        string $errorKey,
    ) {
        $valid = app(ValidateLinkWithGoogleSafeBrowsing::class)->execute($url);

        if (!$valid) {
            $start = $errorKey === 'long_url' ? 'This URL' : 'One of the urls';
            $validator
                ->errors()
                ->add(
                    $errorKey,
                    __("$start can't be shortened, because it is unsafe."),
                );
        }
    }

    private function validateAgainstPhishtank(
        $url,
        Validator $validator,
        $errorKey,
    ) {
        $valid = app(ValidateLinkWithPhishtank::class)->execute($url);

        if (!$valid) {
            $start = $errorKey === 'long_url' ? 'This URL' : 'One of the urls';
            $validator
                ->errors()
                ->add(
                    $errorKey,
                    __(
                        "$start can't be shortened, because it is used for phising.",
                    ),
                );
        }
    }
}
