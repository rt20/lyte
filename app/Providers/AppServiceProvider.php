<?php

namespace App\Providers;

use App\Actions\Admin\BuildAppAnalyticsReport;
use App\Actions\Admin\GetAnalyticsHeaderData;
use App\Actions\AppBootstrapData;
use App\Actions\AppValueLists;
use App\Biolink;
use App\BiolinkLink;
use App\Link;
use App\LinkDomain;
use App\LinkGroup;
use App\LinkOverlay;
use App\LinkPage;
use App\TrackingPixel;
use Common\Admin\Analytics\Actions\BuildAnalyticsReport;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Core\Bootstrap\BootstrapData;
use Common\Core\Values\ValueLists;
use Common\Domains\CustomDomain;
use Common\Pages\CustomPage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Jenssegers\Agent\Agent;

const WORKSPACED_RESOURCES = [
    Link::class,
    LinkGroup::class,
    LinkPage::class,
    Biolink::class,
    LinkOverlay::class,
    TrackingPixel::class,
    LinkDomain::class,
];

const WORKSPACE_HOME_ROUTE = '/dashboard';

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app->bind(BootstrapData::class, AppBootstrapData::class);

        Relation::morphMap([
            CustomDomain::class => LinkDomain::class,
            CustomPage::class => LinkPage::class,
            Link::class => BiolinkLink::class,
        ]);

        Model::preventLazyLoading(!app()->isProduction());
    }

    public function register()
    {
        // bind analytics
        $this->app->bind(
            GetAnalyticsHeaderDataAction::class,
            GetAnalyticsHeaderData::class,
        );

        $this->app->bind(
            BuildAnalyticsReport::class,
            BuildAppAnalyticsReport::class,
        );

        $this->app->bind(CustomDomain::class, LinkDomain::class);

        //        $this->app->bind(
        //            AppUrlGenerator::class,
        //            UrlGenerator::class
        //        );

        $this->app->bind(ValueLists::class, AppValueLists::class);

        $this->app->singleton(Agent::class, function () {
            return new Agent();
        });
    }
}
