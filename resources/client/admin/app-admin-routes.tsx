import {RouteObject} from 'react-router-dom';
import React from 'react';
import {SharedDashboardRoutes} from '@app/dashboard/dashboard-routes';
import {BelinkAdminReportPage} from '@app/admin/reports/belink-admin-report-page';
import {AdminClicksReport} from '@app/admin/reports/admin-clicks-report';
import {AdminVisitorsReport} from '@app/admin/reports/admin-visitors-report';

export const AppAdminRoutes: RouteObject[] = [
  {
    path: '/',
    element: <BelinkAdminReportPage />,
    children: [
      {path: 'clicks', element: <AdminClicksReport />},
      {path: 'visitors', element: <AdminVisitorsReport />},
      {index: true, element: <AdminVisitorsReport />},
    ],
  },
  ...SharedDashboardRoutes({
    forCurrentUser: false,
  }),
];
