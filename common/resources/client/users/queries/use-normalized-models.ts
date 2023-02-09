import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {NormalizedModel} from '../../datatable/filters/normalized-model';
import {apiClient} from '../../http/query-client';
import {BackendResponse} from '../../http/backend-response/backend-response';

const endpoint = (model: string) => `normalized-models/${model}`;

interface Response extends BackendResponse {
  results: NormalizedModel[];
}

interface Params {
  query?: string;
  perPage?: number;
}

export function useNormalizedModels(
  model: string,
  params: Params,
  options?: Omit<
    UseQueryOptions<Response, unknown, Response, [string, Params]>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery([endpoint(model), params], () => fetchUsers(model, params), {
    keepPreviousData: true,
    ...options,
  });
}

async function fetchUsers(model: string, params: Params): Promise<Response> {
  return apiClient
    .get(endpoint(model), {
      params,
    })
    .then(r => r.data);
}
