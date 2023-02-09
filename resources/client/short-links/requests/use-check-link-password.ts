import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Link} from '@app/dashboard/links/link';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';

interface Response extends BackendResponse {
  matches: boolean;
}

export interface CheckLinkPasswordPayload {
  password: string;
}

export function useCheckLinkPassword(
  linkeable: Link | LinkGroup | Biolink,
  form: UseFormReturn<CheckLinkPasswordPayload>
) {
  return useMutation(
    (payload: CheckLinkPasswordPayload) => checkPassword(linkeable, payload),
    {
      onSuccess: () => {
        //
      },
      onError: err => onFormQueryError(err, form),
    }
  );
}

function checkPassword(
  linkeable: Link | LinkGroup | Biolink,
  payload: CheckLinkPasswordPayload
): Promise<Response> {
  return apiClient
    .post('links/check-password', {
      ...payload,
      linkeableType: linkeable.model_type,
      linkeableId: linkeable.id,
    })
    .then(r => r.data);
}
