import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '../../../http/query-client';
import {useTrans} from '../../../i18n/use-trans';
import {BackendResponse} from '../../../http/backend-response/backend-response';
import {toast} from '../../../ui/toast/toast';
import {message} from '../../../i18n/message';
import {Tag} from '../../../tags/tag';
import {PaginatedResourcesQueryKey} from '../../../datatable/requests/paginated-resources';
import {onFormQueryError} from '../../../errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';

interface Response extends BackendResponse {
  tag: Tag;
}

export interface UpdateTagPayload extends Partial<Tag> {
  id: number;
}

export function useUpdateTag(form: UseFormReturn<UpdateTagPayload>) {
  const {trans} = useTrans();
  return useMutation((props: UpdateTagPayload) => updateTag(props), {
    onSuccess: () => {
      toast(trans(message('Tag updated')));
      queryClient.invalidateQueries(PaginatedResourcesQueryKey('tags'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateTag({id, ...payload}: UpdateTagPayload): Promise<Response> {
  return apiClient.put(`tags/${id}`, payload).then(r => r.data);
}
