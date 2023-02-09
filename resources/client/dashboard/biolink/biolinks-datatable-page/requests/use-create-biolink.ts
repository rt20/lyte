import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {apiClient, queryClient} from '@common/http/query-client';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {CrupdateBiolinkFormValues} from '../crupdate/crupdate-biolink-form-values';
import {buildLinkeablePayload} from '@app/dashboard/links/utils/build-linkeable-payload';
import {CrupdateBiolinkPayload} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink';
import {Biolink} from '@app/dashboard/biolink/biolink';

interface Response extends BackendResponse {
  biolink: Biolink;
}

export function useCreateBiolink(
  form: UseFormReturn<CrupdateBiolinkFormValues>
) {
  const {trans} = useTrans();
  return useMutation(
    (props: CrupdateBiolinkFormValues) => createLinkGroup(props),
    {
      onSuccess: () => {
        toast.positive(trans(message('Biolink created')));
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('biolink'));
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function createLinkGroup(
  payload: CrupdateBiolinkFormValues
): Promise<Response> {
  return apiClient
    .post('biolink', buildLinkeablePayload<CrupdateBiolinkPayload>(payload))
    .then(r => r.data);
}
