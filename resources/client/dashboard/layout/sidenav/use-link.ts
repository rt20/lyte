import {useQuery} from '@tanstack/react-query';
import {Link} from '@app/dashboard/links/link';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';

interface GetLinkResponse extends BackendResponse {
  link: Link;
}

export function useLink(linkId: number | string) {
  return useQuery(['link', linkId], () => fetchLink(linkId), {
    initialData: seedInitialDataFromPaginatedList(linkId),
  });
}

function fetchLink(linkId: number | string): Promise<GetLinkResponse> {
  return apiClient.get(`link/${linkId}`).then(response => response.data);
}

function seedInitialDataFromPaginatedList(linkId: number | string) {
  const link = queryClient
    .getQueryData<PaginatedBackendResponse<Link>>(
      PaginatedResourcesQueryKey('link'),
      {exact: false}
    )
    ?.pagination?.data.find(link => link.id === +linkId);
  return link ? {link} : undefined;
}
