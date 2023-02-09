import {FormSelect, FormSelectProps} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {Trans} from '@common/i18n/trans';
import {useDefaultCustomDomainHost} from '@common/custom-domains/use-default-custom-domain-host';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {useSettings} from '@common/core/settings/use-settings';
import {useLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';

interface FormCustomDomainSelectProps
  extends Omit<FormSelectProps, 'children' | 'selectionMode'> {}
export function LinkDomainSelect({
  ...selectProps
}: FormCustomDomainSelectProps) {
  const {data} = useLinkFormValueLists();
  const defaultHost = useDefaultCustomDomainHost(data?.domains);
  const {custom_domains} = useSettings();
  const domains = data?.domains || [];

  if (!custom_domains?.allow_select || !domains.length) return null;

  return (
    <FormSelect
      selectionMode="single"
      label={<Trans message="Domain" />}
      {...selectProps}
    >
      {custom_domains.allow_all_option && (
        <Item value={undefined} key="all">
          <Trans message="All my domains (including default)" />
        </Item>
      )}
      <Item
        value={0}
        key="default"
        startIcon={<RemoteFavicon url={defaultHost} />}
      >
        {removeProtocol(defaultHost)}
      </Item>
      {data?.domains?.map(domain => {
        if (domain.host === defaultHost) return null;
        return (
          <Item
            value={domain.id}
            key={domain.id}
            startIcon={<RemoteFavicon url={domain.host} />}
          >
            {removeProtocol(domain.host)}
          </Item>
        );
      })}
    </FormSelect>
  );
}
