<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class BiolinkPivot extends Pivot
{
  protected $dates = ['leap_until'];
  protected $casts = [
    'position' => 'int',
  ];

  public $incrementing = true;
}
