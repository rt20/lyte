import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {UseFormReturn} from 'react-hook-form';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {CrupdateLinkOverlayPayload} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-payload';

interface Response extends BackendResponse {}

export function useCreateLinkOverlay(
  form: UseFormReturn<CrupdateLinkOverlayPayload>
) {
  const {trans} = useTrans();
  return useMutation(
    (payload: CrupdateLinkOverlayPayload) => createOverlay(payload),
    {
      onSuccess: () => {
        toast.positive(trans(message('Overlay created')));
        queryClient.invalidateQueries(
          PaginatedResourcesQueryKey('link-overlay')
        );
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function createOverlay(payload: CrupdateLinkOverlayPayload): Promise<Response> {
  return apiClient.post('link-overlay', payload).then(r => r.data);
}
