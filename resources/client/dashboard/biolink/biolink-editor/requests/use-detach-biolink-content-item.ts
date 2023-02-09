import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {
  Biolink,
  BiolinkLink,
  BiolinkWidget,
} from '@app/dashboard/biolink/biolink';
import {
  setEditorBiolink,
  useEditorBiolinkId,
} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';

interface Response extends BackendResponse {
  biolink: Biolink;
}

interface Payload {
  item: BiolinkLink | BiolinkWidget;
}

export function useDetachBiolinkContentItem() {
  const biolinkId = useEditorBiolinkId();
  return useMutation((payload: Payload) => detachItem(biolinkId, payload), {
    onSuccess: response => {
      setEditorBiolink(response.biolink);
    },
    onError: err => showHttpErrorToast(err),
  });
}

function detachItem(biolinkId: number, payload: Payload): Promise<Response> {
  return apiClient
    .post(`biolink/${biolinkId}/content-item/detach`, payload)
    .then(r => r.data);
}
