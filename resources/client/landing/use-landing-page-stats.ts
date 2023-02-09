import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';

const endpoint = 'homepage/stats';

export interface GetLandingPageStatsResponse extends BackendResponse {
  stats: {
    links: number;
    clicks: number;
    users: number;
  };
}

export function useLandingPageStats() {
  return useQuery([endpoint], () => getLandingPageStats());
}

function getLandingPageStats(): Promise<GetLandingPageStatsResponse> {
  return apiClient.get(endpoint).then(response => response.data);
}
