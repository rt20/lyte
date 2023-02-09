import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {PaginatedResourcesQueryKey} from '@common/datatable/requests/paginated-resources';

interface Response extends BackendResponse {}

interface Payload {
  linkIds: number[];
}

export function useMoveLinksToGroup(group: LinkGroup) {
  const {trans} = useTrans();
  return useMutation((payload: Payload) => moveLinks(group.id, payload), {
    onSuccess: () => {
      toast.positive(
        trans(message('Moved links to “:group“', {values: {group: group.name}}))
      );
      queryClient.invalidateQueries(PaginatedResourcesQueryKey('link-group'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function moveLinks(groupId: number, payload: Payload): Promise<Response> {
  return apiClient
    .post(`link-group/${groupId}/attach`, payload)
    .then(r => r.data);
}
