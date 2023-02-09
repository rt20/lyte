import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {
  buildLinkPayload,
  CrupdateLinkPayload,
} from '@app/dashboard/links/requests/build-link-payload';
import {CreateMultipleLinksFormValue} from '@app/dashboard/links/dialogs/create-multiple-links-dialog';
import {Link} from '@app/dashboard/links/link';

interface CreateMultipleLinksPayload
  extends Omit<CrupdateLinkPayload, 'hash' | 'long_url'> {
  long_urls: string[];
}

interface Response extends BackendResponse {
  links: Link[];
}

export function useCreateMultipleLinks(
  form: UseFormReturn<CreateMultipleLinksFormValue>
) {
  const {trans} = useTrans();
  return useMutation(
    (values: CreateMultipleLinksFormValue) => createLinks(values),
    {
      onSuccess: response => {
        toast.positive(
          trans(
            message('[one 1 link|other :count links] shortened', {
              values: {count: response.links.length},
            })
          )
        );
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('link'));
        queryClient.invalidateQueries(PaginatedResourcesQueryKey('link-group'));
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function createLinks(values: CreateMultipleLinksFormValue): Promise<Response> {
  return apiClient
    .post('link/batch/shorten', formToPayload(values))
    .then(r => r.data);
}

function formToPayload(
  values: CreateMultipleLinksFormValue
): CreateMultipleLinksPayload {
  const payload = buildLinkPayload(values as any);
  const longUrls = values.long_urls.split(/\n/g);
  return {
    ...payload,
    long_urls: longUrls,
  };
}
