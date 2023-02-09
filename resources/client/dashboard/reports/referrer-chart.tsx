import {Trans} from '@common/i18n/trans';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {ChartLayout, ChartLayoutProps} from '@common/charts/chart-layout';
import React from 'react';
import {ReportMetric} from '@common/admin/analytics/report-metric';
import clsx from 'clsx';
import {ChartLoadingIndicator} from '@common/charts/chart-loading-indicator';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {RemoteFavicon} from '@common/ui/remote-favicon';

interface ReferrerChartProps extends Partial<ChartLayoutProps> {
  data?: ReportMetric;
}
export function ReferrerChart({
  data,
  isLoading,
  ...layoutProps
}: ReferrerChartProps) {
  const dataItems = data?.datasets[0].data || [];
  return (
    <ChartLayout
      {...layoutProps}
      className="min-w-500 md:min-w-0 w-1/2"
      title={<Trans message="Referrers" />}
      contentIsFlex={isLoading}
      contentClassName="max-h-[370px] overflow-y-auto"
    >
      {isLoading && <ChartLoadingIndicator />}
      {dataItems.map((dataItem, index) => (
        <div
          key={dataItem.label || index}
          className="mb-20 text-sm flex items-center justify-between gap-24"
        >
          {dataItem.label ? (
            <div className="flex items-center gap-8">
              <RemoteFavicon url={dataItem.label} />
              <a
                className={clsx(LinkStyle, 'lowercase')}
                href={dataItem.label}
                target="_blank"
                rel="noreferrer"
              >
                {removeProtocol(dataItem.label)}
              </a>
            </div>
          ) : (
            <Trans message="Direct, Email, SMS" />
          )}
          <Chip
            radius="rounded"
            size="xs"
            color="primary"
            className="font-semibold"
          >
            {dataItem.value}
          </Chip>
        </div>
      ))}
    </ChartLayout>
  );
}
