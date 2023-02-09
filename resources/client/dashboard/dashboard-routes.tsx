import {Navigate, RouteObject, useRoutes} from 'react-router-dom';
import React from 'react';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {BelinkDashboardLayout} from './layout/belink-dasbboard-layout';
import {AllClicksReportPage} from './all-clicks-report-page';
import {LinksDatablePage} from './links/links-datatable-page/links-datatable-page';
import {LinkGroupsLinksDatatablePage} from './link-groups/link-group-links-datatable-page/link-group-links-datatable-page';
import {LinkGroupsDatatablePage} from './link-groups/link-groups-datatable-page/link-groups-datatable-page';
import {LinkGroupClicksReportPage} from '@app/dashboard/link-groups/link-group-clicks-report-page';
import {LinkClicksReportPage} from '@app/dashboard/links/link-clicks-report-page';
import {DomainsDatatablePage} from '@app/dashboard/custom-domains/domains-datatable-page';
import {TrackingPixelsDatablePage} from '@app/dashboard/tracking-pixels/tracking-pixels-datatable-page';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {PageEditorLayout} from '@common/admin/custom-pages/editor/page-editor-layout';
import {LinkPagesDatatablePage} from '@app/dashboard/link-pages/link-pages-datatable-page';
import {LinkOverlaysDatatablePage} from '@app/dashboard/link-overlays/link-overlays-datatable-page';
import {CreateLinkOverlayPage} from '@app/dashboard/link-overlays/crupdate/create-link-overlay-page';
import {UpdateLinkOverlayPage} from '@app/dashboard/link-overlays/crupdate/update-link-overlay-page';
import {BioLinksDatatablePage} from '@app/dashboard/biolink/biolinks-datatable-page/biolinks-datatable-page';
import {BiolinkClicksReportPage} from '@app/dashboard/biolink/biolink-clicks-report-page';
import {BiolinkEditorPage} from '@app/dashboard/biolink/biolink-editor/biolink-editor-page';

export const SharedDashboardRoutes = ({forCurrentUser = false}) => {
  return [
    // links
    {
      path: 'links',
      element: <LinksDatablePage forCurrentUser={forCurrentUser} />,
    },
    {
      path: 'links/:linkId',
      element: <LinkClicksReportPage />,
    },

    // biolinks
    {
      path: 'biolinks',
      element: <BioLinksDatatablePage forCurrentUser={forCurrentUser} />,
    },
    {
      path: 'biolinks/:biolinkId',
      element: <BiolinkClicksReportPage />,
    },
    {
      path: 'biolinks/:biolinkId/edit',
      element: <Navigate to="content" replace />,
    },
    {
      path: 'biolinks/:biolinkId/edit/:tabName',
      element: <BiolinkEditorPage />,
    },

    // groups
    {
      path: 'link-groups',
      element: <LinkGroupsDatatablePage forCurrentUser={forCurrentUser} />,
    },
    {
      path: 'link-groups/:groupId',
      element: <LinkGroupClicksReportPage />,
    },
    {
      path: 'link-groups/:groupId/links',
      element: <LinkGroupsLinksDatatablePage />,
    },

    // domains
    {
      path: 'custom-domains',
      element: <DomainsDatatablePage forCurrentUser={forCurrentUser} />,
    },

    // tracking pixels
    {
      path: 'pixels',
      element: <TrackingPixelsDatablePage forCurrentUser={forCurrentUser} />,
    },

    // overlays
    {
      path: 'link-overlays',
      element: <LinkOverlaysDatatablePage forCurrentUser={forCurrentUser} />,
    },
    {
      path: 'link-overlays/new',
      element: <CreateLinkOverlayPage />,
    },
    {
      path: 'link-overlays/:overlayId/edit',
      element: <UpdateLinkOverlayPage />,
    },
  ];
};

export default function DashboardRoutes() {
  const {workspaceId} = useActiveWorkspaceId();
  const DashboardRouteConfig: RouteObject[] = [
    {
      path: '/',
      element: (
        <AuthRoute>
          <BelinkDashboardLayout />
        </AuthRoute>
      ),
      children: [
        {index: true, element: <AllClicksReportPage />},

        // link pages
        {
          path: 'link-pages',
          element: <LinkPagesDatatablePage forCurrentUser={!workspaceId} />,
        },
        {
          path: 'link-pages/new',
          element: (
            <PageEditorLayout allowSlugEditing={false} endpoint="link-page" />
          ),
        },
        {
          path: 'link-pages/:pageId/edit',
          element: (
            <PageEditorLayout allowSlugEditing={false} endpoint="link-page" />
          ),
        },

        ...SharedDashboardRoutes({forCurrentUser: !workspaceId}),
      ],
    },
    {path: '*', element: <NotFoundPage />},
  ];

  return useRoutes(DashboardRouteConfig);
}
