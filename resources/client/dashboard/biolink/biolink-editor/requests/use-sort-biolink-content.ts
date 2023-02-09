import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {moveItemInNewArray} from '@common/utils/array/move-item-in-new-array';
import {biolinkEditorState} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {useEditorBiolinkId} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';

interface Response extends BackendResponse {
  biolink: Biolink;
}

interface Payload {
  oldIndex: number;
  newIndex: number;
  // id of widget that should be pinned to top
  widgetToPin?: number;
}

export function useSortBiolinkContent() {
  const biolinkId = useEditorBiolinkId();
  return useMutation((payload: Payload) => sortContent(biolinkId, payload));
}

function sortContent(
  biolinkId: number,
  {oldIndex, newIndex, widgetToPin}: Payload
): Promise<Response> {
  const biolink = biolinkEditorState().biolink!;
  const content = moveItemInNewArray(biolink.content, oldIndex, newIndex);
  if (widgetToPin) {
    content[newIndex] = {...content[newIndex], pinned: 'top'};
  }
  biolinkEditorState().setBiolink({...biolink, content});

  const order = content.map(item => ({
    id: item.id,
    model_type: item.model_type,
  }));

  return apiClient.post(`biolink/${biolinkId}/change-order`, {
    order,
    widgetToPin,
  });
}
