import {useQuery} from '@tanstack/react-query';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {apiClient} from '@common/http/query-client';
import {
  LocationDatasetItem,
  ReportMetric,
} from '@common/admin/analytics/report-metric';
import {BackendResponse} from '@common/http/backend-response/backend-response';

const endpoint = 'reports/clicks';

export interface FetchLinkReportResponse extends BackendResponse {
  report: {
    totalClicks: number;
    clicks: ReportMetric;
    browsers: ReportMetric;
    locations: ReportMetric<LocationDatasetItem>;
    devices: ReportMetric;
    platforms: ReportMetric;
    referrers: ReportMetric;
  };
}

export type ClicksReportMetric =
  | 'clicks'
  | 'devices'
  | 'browsers'
  | 'platforms'
  | 'locations'
  | 'referrers';

interface Payload {
  dateRange: DateRangeValue;
  model?: string;
  metrics?: ClicksReportMetric[];
}

interface Options {
  isEnabled: boolean;
}

export function useClicksReport(payload: Payload, options: Options) {
  return useQuery(
    [endpoint, payload],
    () => fetchClicksReport(endpoint, payload),
    {
      keepPreviousData: true,
      enabled: options.isEnabled,
    }
  );
}

function fetchClicksReport<
  T extends FetchLinkReportResponse = FetchLinkReportResponse
>(endpoint: string, payload: Payload): Promise<T> {
  const params: Record<string, any> = {
    model: payload.model,
    metrics: payload.metrics?.join(','),
  };
  params.startDate = payload.dateRange.start.toAbsoluteString();
  params.endDate = payload.dateRange.end.toAbsoluteString();
  params.timezone = payload.dateRange.start.timeZone;

  return apiClient.get(endpoint, {params}).then(response => response.data);
}
