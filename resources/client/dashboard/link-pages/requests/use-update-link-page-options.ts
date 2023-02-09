import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';

interface Response extends BackendResponse {}

export interface UpdateLinkPageOptionsPayload {
  hideNavbar: boolean;
  hideFooter: boolean;
}

export function useUpdateLinkPageOptions(
  pageId: number | string,
  form: UseFormReturn<UpdateLinkPageOptionsPayload>
) {
  const {trans} = useTrans();
  return useMutation(
    (props: UpdateLinkPageOptionsPayload) => updatePage(pageId, props),
    {
      onSuccess: () => {
        toast.positive(trans(message('Page options updated')));
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('link-page'));
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function updatePage(
  pageId: number | string,
  payload: UpdateLinkPageOptionsPayload
): Promise<Response> {
  return apiClient
    .put(`link-page/${pageId}`, {meta: payload})
    .then(r => r.data);
}
