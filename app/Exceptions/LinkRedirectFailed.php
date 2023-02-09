<?php

namespace App\Exceptions;

use App\Link;
use App\LinkGroup;
use Exception;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Contracts\Support\Responsable;

class LinkRedirectFailed extends Exception implements Responsable
{
    /**
     * @var Link|LinkGroup
     */
    protected $linkOrGroup;

    /**
     * @var string|null
     */
    protected $redirectUrl;

    /**
     * @inheritDoc
     */
    public function toResponse($request)
    {
        if (app(Gate::class)->allows('show', $this->linkOrGroup)) {
            return response()->view(
                'redirects/redirect-error',
                ['message' => $this->getMessage(), 'linkOrGroup' => $this->linkOrGroup],
                403
            );
        } else if ($this->redirectUrl) {
            return response()->redirectTo($this->redirectUrl);
        } else {
            abort(404);
        }
    }

    /**
     * @param LinkGroup|Link $linkOrGroup
     */
    public function setModel($linkOrGroup): self
    {
        $this->linkOrGroup = $linkOrGroup;
        return $this;
    }

    public function setRedirectUrl(string $url = null): self
    {
        $this->redirectUrl = $url;
        return $this;
    }
}
