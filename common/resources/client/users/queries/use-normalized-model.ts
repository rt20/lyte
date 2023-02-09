import {useQuery} from '@tanstack/react-query';
import {NormalizedModel} from '../../datatable/filters/normalized-model';
import {apiClient} from '../../http/query-client';
import {BackendResponse} from '../../http/backend-response/backend-response';

const endpoint = (modelName: string, modelId: string | number) =>
  `normalized-models/${modelName}/${modelId}`;

interface Response extends BackendResponse {
  model: NormalizedModel;
}

export function useNormalizedModel(model: string, modelId: string | number) {
  return useQuery(
    [endpoint(model, modelId)],
    () => fetchModel(model, modelId),
    {enabled: model != null && modelId != null}
  );
}

async function fetchModel(
  model: string,
  modelId: string | number
): Promise<Response> {
  return apiClient.get(endpoint(model, modelId), {}).then(r => r.data);
}
