import {useQuery} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {useParams} from 'react-router-dom';

export interface FetchBiolinkResponse extends BackendResponse {
  biolink: Biolink;
}

interface FetchBiolinkParams {
  loadContent?: boolean;
}

export const biolinkQueryKey = (
  biolinkId: string | number,
  params?: FetchBiolinkParams
) => {
  return PaginatedResourcesQueryKey(
    `biolink/${biolinkId}`,
    params as Record<string, string | boolean> | undefined
  );
};

export function useBiolink() {
  const {biolinkId} = useParams();
  return useQuery(biolinkQueryKey(biolinkId!), () => fetchBiolink(biolinkId!), {
    initialData: seedInitialDataFromPaginatedList(biolinkId!),
  });
}

export function fetchBiolink(
  biolinkId: number | string,
  params?: FetchBiolinkParams
): Promise<FetchBiolinkResponse> {
  return apiClient
    .get(`biolink/${biolinkId}`, {params})
    .then(response => response.data);
}

function seedInitialDataFromPaginatedList(biolinkId: number | string) {
  const biolink = queryClient
    .getQueryData<PaginatedBackendResponse<Biolink>>(
      PaginatedResourcesQueryKey('biolink'),
      {exact: false}
    )
    ?.pagination?.data.find(link => link.id === +biolinkId);
  return biolink ? {biolink} : undefined;
}
