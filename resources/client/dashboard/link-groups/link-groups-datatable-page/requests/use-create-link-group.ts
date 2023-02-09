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

export function useCreateLinkGroup(
  form: UseFormReturn<CrupdateLinkGroupPayload>
) {
  const {trans} = useTrans();
  return useMutation(
    (props: CrupdateLinkGroupPayload) => createLinkGroup(props),
    {
      onSuccess: () => {
        toast.positive(trans(message('Link group created')));
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('link-group'));
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function createLinkGroup(payload: CrupdateLinkGroupPayload): Promise<Response> {
  return apiClient.post(`link-group`, payload).then(r => r.data);
}
