import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {apiClient, queryClient} from '@common/http/query-client';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {CrupdateLinkGroupPayload} from '../crupdate/crupdate-link-group-form';

interface Response extends BackendResponse {}

export function useUpdateLinkGroup(
  form: UseFormReturn<CrupdateLinkGroupPayload>,
  groupId: number
) {
  const {trans} = useTrans();
  return useMutation(
    (payload: CrupdateLinkGroupPayload) => updateLinkGroup(groupId, payload),
    {
      onSuccess: () => {
        toast.positive(trans(message('Link group updated')));
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('link-group'));
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function updateLinkGroup(
  id: number,
  payload: CrupdateLinkGroupPayload
): Promise<Response> {
  return apiClient.put(`link-group/${id}`, payload).then(r => r.data);
}
