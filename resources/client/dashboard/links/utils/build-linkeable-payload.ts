import {removeEmptyValuesFromObject} from '@common/utils/objects/remove-empty-values-from-object';
import {Tag} from '@common/tags/tag';
import {LinkRule} from '@app/dashboard/links/link-rule';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {placeholderPassword} from '@app/dashboard/links/utils/build-linkeable-default-form-values';

export const defaultUtmTags = [
  'source',
  'medium',
  'campaign',
  'term',
  'content',
];

export interface CrupdateLinkeablePayload
  extends Omit<LinkeableFormValues, 'utm' | 'groups' | 'pixels' | 'tags'> {
  utm?: string | null;
  groups?: number[] | null;
  pixels?: number[] | null;
  tags?: string[] | null;
}

export interface LinkeableFormValues {
  exp_clicks_rule?: LinkRule;
  geo_rules?: LinkRule[];
  device_rules?: LinkRule[];
  platform_rules?: LinkRule[];
  pixels?: TrackingPixel[];
  tags?: Tag[];
  password?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    [key: string]: string | undefined;
  };
  utm_custom?: {key: string; value: string}[];
}

export function buildLinkeablePayload<R extends CrupdateLinkeablePayload>(
  values: LinkeableFormValues
): R {
  // remove placeholder password, otherwise it will be set every time link is updated
  if (values.password === placeholderPassword) {
    delete values.password;
  }
  let payload: CrupdateLinkeablePayload = {
    ...values,
    utm: null,
    groups: null,
    pixels: null,
    tags: null,
  };
  payload = addUtmAndCustomQueryParams(payload, values);
  payload.pixels = values.pixels ? values.pixels.map(pixel => pixel.id) : [];
  payload.tags = values.tags?.map((tag: Tag | string) =>
    typeof tag === 'string' ? tag : tag.name
  );
  return payload as R;
}

function addUtmAndCustomQueryParams(
  payload: CrupdateLinkeablePayload,
  values: LinkeableFormValues
): CrupdateLinkeablePayload {
  if (!values.utm && !values.utm_custom) return payload;
  const utm = removeEmptyValuesFromObject(values.utm || {}) as Record<
    string,
    string
  >;
  values.utm_custom?.forEach(({key, value}) => {
    utm[key] = value;
  });

  payload.utm = new URLSearchParams(utm).toString();
  return payload;
}
