import {FetchLinkUsageResponse, useLinkSummary} from './use-link-summary';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {message} from '@common/i18n/message';
import {Trans} from '@common/i18n/trans';
import {FormattedNumber} from '@common/i18n/formatted-number';

type ResourceKey = keyof FetchLinkUsageResponse['usage'];

export const resourceTranslationMap: Record<ResourceKey, MessageDescriptor> = {
  links: message('Links'),
  biolinks: message('Biolinks'),
  link_clicks: message('Visitors'),
  link_overlays: message('Link overlays'),
  custom_pages: message('Custom link pages'),
  custom_domains: message('Custom domains'),
  link_groups: message('Link groups'),
  tracking_pixels: message('Tracking pixels'),
} as const;

export function ResourceUsageList() {
  const {data} = useLinkSummary();
  if (!data) {
    return null;
  }

  const unlimited = <Trans message="Unlimited" />;

  return (
    <ul>
      {Object.entries(resourceTranslationMap).map(([key, label]) => {
        const usage = data?.usage[key as ResourceKey];
        if (!usage) return null;
        const name = <Trans {...label} />;
        return (
          <li key={key} className="mt-8">
            {usage.total ? (
              <Trans
                message=":used out of :total :name"
                values={{
                  used: <FormattedNumber value={usage.used} />,
                  total: usage.total ? (
                    <FormattedNumber value={usage.total} />
                  ) : (
                    unlimited
                  ),
                  name,
                }}
              />
            ) : (
              <Trans
                message=":count :name created"
                values={{count: usage.used, name}}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
