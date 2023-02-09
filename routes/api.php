<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\BiolinkAppearanceController;
use App\Http\Controllers\BiolinkContentItemController;
use App\Http\Controllers\BiolinkContentOrderController;
use App\Http\Controllers\BiolinkController;
use App\Http\Controllers\BiolinkLinkController;
use App\Http\Controllers\BiolinkWidgetsController;
use App\Http\Controllers\ClicksReportController;
use App\Http\Controllers\CsvExportController;
use App\Http\Controllers\HomepageStatsController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\LinkGroupAttachmentsController;
use App\Http\Controllers\LinkGroupController;
use App\Http\Controllers\LinkOverlayController;
use App\Http\Controllers\LinkPagesController;
use App\Http\Controllers\LinkPasswordController;
use App\Http\Controllers\LinkUsageController;
use App\Http\Controllers\TrackingPixelController;

Route::group(['prefix' => 'v1'], function() {
    Route::group(['middleware' => ['optionalAuth:sanctum', 'verified']], function () {
        Route::get('reports/clicks', [ClicksReportController::class, 'show']);

        // HOMEPAGE STATS
        Route::get('homepage/stats', HomepageStatsController::class);

        // LINK
        Route::post('link/batch/shorten', [LinkController::class, 'storeBatch']);
        Route::get('link/usage', [LinkUsageController::class, 'getUsage']);
        Route::apiResource('link', LinkController::class);
        Route::post('links/check-password', LinkPasswordController::class);

        // LINK GROUP
        Route::apiResource('link-group', LinkGroupController::class);
        Route::get('link-group/{linkGroup}/links', [LinkGroupController::class, 'links']);
        Route::post('link-group/{linkGroup}/detach', [LinkGroupAttachmentsController::class, 'detach']);
        Route::post('link-group/{linkGroup}/attach', [LinkGroupAttachmentsController::class, 'attach']);

        // BIOLINKS
        Route::put('biolink/{biolink}/content-item', [BiolinkContentItemController::class, 'update']);
        Route::post('biolink/{biolink}/content-item/detach', [BiolinkContentItemController::class, 'detach']);
        Route::post('biolink/{biolink}/change-order', [BiolinkContentOrderController::class, 'changeOrder']);
        Route::post('biolink/{biolink}/appearance', [BiolinkAppearanceController::class, 'save']);
        Route::apiResource('biolink', BiolinkController::class);
        Route::post('biolink/{biolink}/widget', [BiolinkWidgetsController::class, 'store']);
        Route::put('biolink/{biolink}/widget/{widget}', [BiolinkWidgetsController::class, 'update']);
        Route::post('biolink/{biolink}/link', [BiolinkLinkController::class, 'store']);
        Route::put('biolink/{biolink}/link/{link}', [BiolinkLinkController::class, 'update']);

        // LINK OVERLAY
        Route::apiResource('link-overlay', LinkOverlayController::class);

        // TRACKING PIXEL
        Route::get('tp/{trackingPixel}', [TrackingPixelController::class, 'show']);
        Route::get('tp', [TrackingPixelController::class, 'index']);
        Route::post('tp', [TrackingPixelController::class, 'store']);
        Route::put('tp/{trackingPixel}', [TrackingPixelController::class, 'update']);
        Route::delete('tp/{ids}', [TrackingPixelController::class, 'destroy']);

        // LINK PAGES
        Route::apiResource('link-page', LinkPagesController::class);

        // CSV EXPORT
        Route::post('link/csv/export', [CsvExportController::class, 'exportLinks']);
        Route::post('link-group/csv/export', [CsvExportController::class, 'exportGroups']);
    });
});
