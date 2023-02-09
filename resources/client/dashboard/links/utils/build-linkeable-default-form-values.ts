import {Biolink} from '@app/dashboard/biolink/biolink';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Link} from '@app/dashboard/links/link';
import {CrupdateLinkFormValues} from '@app/dashboard/links/forms/crupdate-link-form';
import {defaultUtmTags} from '@app/dashboard/links/utils/build-linkeable-payload';

export const placeholderPassword = '********';

export function buildLinkeableDefaultFormValues(
  linkeable: Biolink | LinkGroup | Link
) {
  const rules = linkeable.rules || [];
  const defaultUtm: CrupdateLinkFormValues['utm'] = {};
  const customUtm: CrupdateLinkFormValues['utm_custom'] = [];

  if (linkeable.utm) {
    const queryParams = new URLSearchParams(linkeable.utm);
    for (const [key, value] of queryParams.entries()) {
      if (defaultUtmTags.includes(key)) {
        defaultUtm[key] = value;
      } else {
        customUtm.push({key, value});
      }
    }
  }

  return {
    hash: linkeable.hash,
    active: linkeable.active,
    activates_at: linkeable.activates_at,
    expires_at: linkeable.expires_at,
    name: linkeable.name,
    description: linkeable.description,
    image: linkeable.image,
    geo_rules: rules.filter(rule => rule.type === 'geo'),
    device_rules: rules.filter(rule => rule.type === 'device'),
    platform_rules: rules.filter(rule => rule.type === 'platform'),
    exp_clicks_rule: rules.find(r => r.type === 'exp_clicks'),
    // show an indication to user that password exists
    password: linkeable.has_password ? placeholderPassword : '',
    utm: defaultUtm,
    utm_custom: customUtm,
    domain_id: linkeable.domain_id,
    pixels: linkeable.pixels,
    tags: linkeable.tags,
  };
}
