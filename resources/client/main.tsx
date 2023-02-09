import './app.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {AppearanceListener} from '@common/admin/appearance/commands/appearance-listener';
import {CommonProvider} from '@common/core/common-provider';
import {AuthRoutes} from '@common/auth/auth-routes';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {BillingRoutes} from '@common/billing/billing-routes';
import {NotificationRoutes} from '@common/notifications/notification-routes';
import {CookieNotice} from '@common/ui/cookie-notice/cookie-notice';
import {ContactUsPage} from '@common/contact/contact-us-page';
import {CustomPageLayout} from '@common/custom-page/custom-page-layout';
import {ToastContainer} from '@common/ui/toast/toast-container';
import {useAuth} from '@common/auth/use-auth';
import {EmailVerificationPage} from '@common/auth/ui/email-verification-page/email-verification-page';
import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import {rootEl} from '@common/core/root-el';
import {useSettings} from '@common/core/settings/use-settings';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {ActiveWorkspaceProvider} from '@common/workspace/active-workspace-id-context';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {ShortLinkRenderer} from '@app/short-links/short-link-renderer';
import {Link, LinkType} from '@app/dashboard/links/link';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {MetaTag} from '@common/seo/meta-tag';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {LandingPageContent} from '@app/landing/landing-page-content';
import {DynamicHomepage} from '@common/ui/dynamic-homepage';
import {GuestRoute} from '@common/auth/guards/guest-route';
import {LandingPage} from '@app/landing/landing-page';

const DashboardRoutes = React.lazy(
  () => import('./dashboard/dashboard-routes')
);
const AdminRoutes = React.lazy(() => import('@common/admin/admin-routes'));
const SwaggerApiDocs = React.lazy(
  () => import('@common/swagger/swagger-api-docs-page')
);

declare module '@common/http/value-lists' {
  interface FetchValueListsResponse {
    overlays: LinkOverlay[];
    pixels: TrackingPixel[];
    groups: LinkGroup[];
  }
}

declare module '@common/core/settings/settings' {
  interface Settings {
    homepage: {
      appearance: LandingPageContent;
      type: 'loginPage' | 'registerPage' | string;
    };
    links: {
      gchart_api_key?: string;
      alias_min?: number;
      alias_max?: number;
      redirect_time?: number;
      enable_type?: boolean;
      default_type?: LinkType;
      min_len?: number;
      max_len?: number;
      retargeting?: boolean;
      pixels?: boolean;
      dash_footer?: boolean;
      homepage_creation?: boolean;
      homepage_stats?: boolean;
      homepage_pricing?: boolean;
    };
    ads?: {
      biolink_top?: string;
      splash_top?: string;
      splash_bottom?: string;
      dashboard?: string;
      frame?: string;
      landing?: string;
      link_page?: string;
      disable?: boolean;
    };
  }
}

declare module '@common/core/bootstrap-data/bootstrap-data' {
  interface BootstrapData {
    linkeableResponse?: {
      linkeable: Link | LinkGroup | Biolink;
      seo: MetaTag[];
    };
  }
}

const sentryDsn = getBootstrapData().settings.logging.sentry_public;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const root = createRoot(rootEl);
root.render(
  <CommonProvider>
    <Router />
  </CommonProvider>
);

function Router() {
  const {
    billing,
    notifications,
    require_email_confirmation,
    api,
    html_base_uri,
  } = useSettings();
  const {user, hasPermission} = useAuth();

  if (user != null && require_email_confirmation && !user.email_verified_at) {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="*" element={<EmailVerificationPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter basename={html_base_uri}>
      <AppearanceListener />
      <CookieNotice />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <DynamicHomepage
              homepageResolver={() => (
                <GuestRoute>
                  <LandingPage />
                </GuestRoute>
              )}
            />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <React.Suspense fallback={<FullPageLoader />}>
              <ActiveWorkspaceProvider>
                <DashboardRoutes />
              </ActiveWorkspaceProvider>
            </React.Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AuthRoute permission="admin.access">
              <React.Suspense fallback={<FullPageLoader />}>
                <AdminRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        {AuthRoutes}
        {billing.enable && BillingRoutes}
        {notifications.integrated && NotificationRoutes}
        {api?.integrated && hasPermission('api.access') && (
          <Route
            path="api-docs"
            element={
              <React.Suspense fallback={<FullPageLoader />}>
                <SwaggerApiDocs />
              </React.Suspense>
            }
          ></Route>
        )}
        <Route path="contact" element={<ContactUsPage />}></Route>
        <Route path="pages/:pageSlug" element={<CustomPageLayout />}></Route>
        <Route path="*" element={<ShortLinkRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}
