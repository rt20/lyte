import React from 'react';
import {ClicksReportCharts} from '@app/dashboard/reports/clicks/clicks-report-charts';
import {useOutletContext} from 'react-router-dom';
import {AdminReportOutletContext} from '@app/admin/reports/belink-admin-report-page';

export function AdminClicksReport() {
  const {dateRange} = useOutletContext<AdminReportOutletContext>();
  return <ClicksReportCharts dateRange={dateRange} model="linkeable_click=0" />;
}
