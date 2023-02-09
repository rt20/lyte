import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {biolinkEditorState} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {useEditorBiolinkId} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

interface Response extends BackendResponse {
  appearance: Biolink['appearance'];
}

export function useSaveBiolinkAppearance() {
  const biolinkId = useEditorBiolinkId();
  return useMutation(
    () => {
      const appearance = biolinkEditorState().appearance!;
      return saveAppearance(biolinkId, {config: appearance});
    },
    {
      onSuccess: () => {
        biolinkEditorState().setAppearanceIsDirty(false);
        toast.positive(message('Appearance saved'));
      },
      onError: err =>
        showHttpErrorToast(err, message('Could not save appearance')),
    }
  );
}

function saveAppearance(
  biolinkId: number,
  appearance: Biolink['appearance']
): Promise<Response> {
  return apiClient
    .post(`biolink/${biolinkId}/appearance`, appearance)
    .then(r => r.data);
}
