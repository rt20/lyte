import {CrupdateLinkFormValues} from '@app/dashboard/links/forms/crupdate-link-form';
import {
  buildLinkeablePayload,
  CrupdateLinkeablePayload,
} from '@app/dashboard/links/utils/build-linkeable-payload';

export interface CrupdateLinkPayload
  extends Omit<CrupdateLinkFormValues, 'utm' | 'groups' | 'pixels' | 'tags'>,
    CrupdateLinkeablePayload {}

export function buildLinkPayload(
  values: CrupdateLinkFormValues
): CrupdateLinkPayload {
  const payload = buildLinkeablePayload<CrupdateLinkPayload>(values);
  payload.groups = values.groups?.map(group => group.id);
  return payload;
}
