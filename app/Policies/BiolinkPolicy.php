<?php

namespace App\Policies;

use App\Biolink;

class BiolinkPolicy extends LinkGroupPolicy
{
    protected string $resource = Biolink::class;
}
