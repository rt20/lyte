import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {PaginatedBackendResponse} from '../../http/backend-response/pagination-response';
import {apiClient} from '../../http/query-client';

export interface ResourcePaginationParams {
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  filters?: string | null;
  query?: string;
  with?: string;
  perPage?: number;
  page?: number;
  [key: string]: string | number | boolean | undefined | null;
}

export const PaginatedResourcesQueryKey = (
  endpoint: string,
  params?: ResourcePaginationParams | Record<string, string | number | boolean>
) => {
  // split endpoint by slash, so we can clear cache from the root later,
  // for example, 'link-group' will clear 'link-group/1/links' endpoint
  const key: (string | ResourcePaginationParams)[] = endpoint.split('/');
  if (params) {
    key.push(params);
  }
  return key;
};

export function usePaginatedResources<T = object>(
  endpoint: string,
  params: ResourcePaginationParams,
  options?: Omit<
    UseQueryOptions<
      PaginatedBackendResponse<T>,
      unknown,
      PaginatedBackendResponse<T>,
      any[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery(
    PaginatedResourcesQueryKey(endpoint, params),
    () => paginateResources<T>(endpoint, params),
    {
      ...options,
      keepPreviousData: true,
    }
  );
}

function paginateResources<T>(
  endpoint: string,
  params: ResourcePaginationParams
): Promise<PaginatedBackendResponse<T>> {
  return apiClient.get(endpoint, {params}).then(response => response.data);
}
