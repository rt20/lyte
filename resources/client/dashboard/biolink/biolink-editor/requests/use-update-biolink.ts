import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {apiClient, queryClient} from '@common/http/query-client';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {CrupdateBiolinkFormValues} from '@app/dashboard/biolink/biolinks-datatable-page/crupdate/crupdate-biolink-form-values';
import {
  buildLinkeablePayload,
  CrupdateLinkeablePayload,
} from '@app/dashboard/links/utils/build-linkeable-payload';

export interface CrupdateBiolinkPayload
  extends Omit<CrupdateBiolinkFormValues, 'utm' | 'groups' | 'pixels' | 'tags'>,
    CrupdateLinkeablePayload {}

interface Response extends BackendResponse {}

export function useUpdateBiolink(
  form: UseFormReturn<CrupdateBiolinkFormValues>,
  biolinkId: number
) {
  const {trans} = useTrans();
  return useMutation(
    (payload: CrupdateBiolinkFormValues) => updateBiolink(biolinkId, payload),
    {
      onSuccess: () => {
        toast.positive(trans(message('Biolink updated')));
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('biolink'));
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function updateBiolink(
  biolinkId: number,
  payload: CrupdateBiolinkFormValues
): Promise<Response> {
  return apiClient
    .put(
      `biolink/${biolinkId}`,
      buildLinkeablePayload<CrupdateBiolinkPayload>(payload)
    )
    .then(r => r.data);
}
