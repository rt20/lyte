<?php

use App\Http\Controllers\LinkImageController;
use Common\Core\Controllers\HomeController;

Route::group(['prefix' => 'secure'], function () {
   //
});

Route::get('{linkHash}/img', [LinkImageController::class, 'show']);

// FRONT-END ROUTES THAT NEED TO BE PRE-RENDERED

// CATCH ALL ROUTES AND REDIRECT TO HOME
Route::get('{all}', [HomeController::class, 'show'])
    ->where('all', '.*')
    ->middleware('prerenderIfCrawler:homepage')
    ->middleware('redirectLink');
