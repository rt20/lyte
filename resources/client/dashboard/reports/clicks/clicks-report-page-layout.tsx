import {StaticPageTitle} from '@common/seo/static-page-title';
import {Trans} from '@common/i18n/trans';
import {ReportDateSelector} from '@common/admin/analytics/report-date-selector';
import {ClicksReportCharts} from '@app/dashboard/reports/clicks/clicks-report-charts';
import React, {ReactNode, useState} from 'react';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {DateRangePresets} from '@common/ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';

interface ClicksReportPageLayoutProps {
  model: string;
  title: ReactNode;
  actions?: ReactNode;
}
export function ClicksReportPageLayout({
  model,
  title,
  actions,
}: ClicksReportPageLayoutProps) {
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => {
    // This week
    return DateRangePresets[2].getRangeValue();
  });
  return (
    <div className="min-h-full gap-12 md:gap-24 p-12 md:p-24">
      <StaticPageTitle>
        <Trans message="Clicks report" />
      </StaticPageTitle>
      <div className="md:flex items-center justify-between gap-24 mb-24">
        {title}
        <div className="flex-shrink-0 flex items-center md:justify-end mt-10 md:mt-0 gap-12">
          {actions}
          <div className="text-sm font-semibold">
            <ReportDateSelector
              value={dateRange}
              onChange={setDateRange}
              compactOnMobile={false}
            />
          </div>
        </div>
      </div>
      <ClicksReportCharts dateRange={dateRange} model={model} />
    </div>
  );
}
