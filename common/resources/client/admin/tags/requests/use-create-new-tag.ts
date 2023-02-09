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

interface Payload extends Partial<Tag> {}

export function useCreateNewTag(form: UseFormReturn<Payload>) {
  const {trans} = useTrans();
  return useMutation((props: Payload) => createNewTag(props), {
    onSuccess: () => {
      toast(trans(message('Tag created')));
      queryClient.invalidateQueries(PaginatedResourcesQueryKey('tags'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createNewTag(payload: Payload): Promise<Response> {
  return apiClient.post('tags', payload).then(r => r.data);
}
