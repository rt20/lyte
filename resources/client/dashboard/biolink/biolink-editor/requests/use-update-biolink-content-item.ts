import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {
  Biolink,
  BiolinkLink,
  BiolinkWidget,
} from '@app/dashboard/biolink/biolink';
import {
  setEditorBiolink,
  useEditorBiolinkId,
} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';
import {BiolinkItemPayload} from '@app/dashboard/biolink/biolink-editor/content/biolink-item-payload';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

interface Response extends BackendResponse {
  biolink: Biolink;
}

interface Payload {
  item: BiolinkLink | BiolinkWidget;
  values: BiolinkItemPayload;
}

export function useUpdateBiolinkContentItem() {
  const biolinkId = useEditorBiolinkId();
  return useMutation(
    ({item, values}: Payload) => updateItem(biolinkId, item, values),
    {
      onSuccess: response => {
        setEditorBiolink(response.biolink);
      },
      onError: err =>
        showHttpErrorToast(err, message('Could not update content item')),
    }
  );
}

function updateItem(
  biolinkId: number,
  item: BiolinkLink | BiolinkWidget,
  editorPayload: BiolinkItemPayload
): Promise<Response> {
  const backendPayload: BiolinkItemPayload & {
    item_id: number;
    item_model_type: string;
  } = {
    ...editorPayload,
    item_id: item.id,
    item_model_type: item.model_type,
  };
  return apiClient
    .put(`biolink/${biolinkId}/content-item`, backendPayload)
    .then(r => r.data);
}
