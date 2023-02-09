import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {CrupdateLinkFormValues} from '../forms/crupdate-link-form';
import {buildLinkPayload} from '@app/dashboard/links/requests/build-link-payload';
import {Link} from '../link';

interface Response extends BackendResponse {
  link: Link;
}

interface Options {
  endpoint?: string;
  invalidateQueries?: boolean;
}

export function useUpdateLink(
  form: UseFormReturn<CrupdateLinkFormValues>,
  linkId: number,
  {endpoint, invalidateQueries = true}: Options = {}
) {
  const {trans} = useTrans();
  return useMutation(
    (payload: CrupdateLinkFormValues) => updateLink(linkId, payload, endpoint),
    {
      onSuccess: () => {
        toast.positive(trans(message('Link updated')));
        if (invalidateQueries) {
          queryClient.invalidateQueries(PaginatedResourcesQueryKey('link'));
          queryClient.invalidateQueries(
            PaginatedResourcesQueryKey('link-group')
          );
          queryClient.invalidateQueries(PaginatedResourcesQueryKey('biolink'));
        }
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function updateLink(
  id: number,
  values: CrupdateLinkFormValues,
  endpoint?: string
): Promise<Response> {
  return apiClient
    .put(endpoint || `link/${id}`, buildLinkPayload(values))
    .then(r => r.data);
}
