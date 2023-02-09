import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {message} from '@common/i18n/message';
import {toast} from '@common/ui/toast/toast';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {setEditorBiolink} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';

interface Response extends BackendResponse {
  biolink: Biolink;
}

interface Payload {
  widgetId?: number;
  type: WidgetType;
  position?: number;
  config: BiolinkWidget['config'] | null;
}

export function useCrupdateBiolinkWidget(
  biolinkId: number,
  form: UseFormReturn<BiolinkWidget['config']>
) {
  const {trans} = useTrans();
  return useMutation((payload: Payload) => createWidget(biolinkId, payload), {
    onSuccess: (response, payload) => {
      toast.positive(
        trans(
          !payload.widgetId
            ? message('Widget updated')
            : message('Widget added')
        )
      );
      setEditorBiolink(response.biolink);
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createWidget(
  biolinkId: number,
  {widgetId, ...payload}: Payload
): Promise<Response> {
  const request = widgetId
    ? apiClient.put(`biolink/${biolinkId}/widget/${widgetId}`, payload)
    : apiClient.post(`biolink/${biolinkId}/widget`, payload);
  return request.then(r => r.data);
}
