import {Accordion, AccordionItem} from '@common/ui/accordion/accordion';
import {Trans} from '@common/i18n/trans';
import {SettingsIcon} from '@common/icons/material/Settings';
import {LinkTypeField} from '@app/dashboard/links/forms/link-type-field';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {LockIcon} from '@common/icons/material/Lock';
import {LinkRestrictionFields} from '@app/dashboard/links/forms/link-restriction-fields';
import {SwapVertIcon} from '@common/icons/material/SwapVert';
import {LinkRetargetingFields} from '@app/dashboard/links/forms/link-retargeting-fields';
import {PublicIcon} from '@common/icons/material/Public';
import {LinkSeoFields} from '@app/dashboard/links/forms/link-seo-fields';
import {AccountTreeIcon} from '@common/icons/material/AccountTree';
import {LinkUtmFields} from '@app/dashboard/links/forms/link-utm-fields';
import {useLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {Item} from '@common/ui/forms/listbox/item';
import {useSettings} from '@common/core/settings/use-settings';
import {LinkDomainSelect} from '@app/dashboard/links/forms/link-domain-select';
import {Fragment, ReactElement, useState} from 'react';
import {MessageDescriptor} from '@common/i18n/message-descriptor';

type AccordionKey = 'options' | 'restrictions' | 'retargeting' | 'seo' | 'utm';
export type HidableLinkSettingsField =
  | 'type'
  | 'groups'
  | 'seo'
  | 'enabled'
  | 'alias'
  | 'title';

interface LinkSettingsFormProps {
  multipleLinks?: boolean;
  defaultExpanded?: AccordionKey[];
  hiddenFields?: HidableLinkSettingsField[];
  linkName?: ReactElement<MessageDescriptor>;
}
export function LinkSettingsForm({
  defaultExpanded,
  multipleLinks,
  hiddenFields = [],
  linkName = <Trans message="link" />,
}: LinkSettingsFormProps) {
  const {
    links: {retargeting},
  } = useSettings();
  const [expandedValues, setExpandedValues] = useState<AccordionKey[]>(
    defaultExpanded || []
  );

  return (
    <Accordion
      className="-ml-14 -mr-14"
      mode="multiple"
      variant="minimal"
      expandedValues={expandedValues}
      onExpandedChange={values => {
        setExpandedValues(values as AccordionKey[]);
      }}
    >
      <AccordionItem
        value="options"
        label={<Trans message="Settings" />}
        startIcon={<SettingsIcon />}
      >
        <LinkOptionsFields
          multipleLinks={multipleLinks}
          hiddenFields={hiddenFields}
          linkName={linkName}
        />
      </AccordionItem>
      <AccordionItem
        value="restrictions"
        label={<Trans message="Restrictions" />}
        startIcon={<LockIcon />}
      >
        <LinkRestrictionFields linkName={linkName} />
      </AccordionItem>
      {retargeting && (
        <AccordionItem
          value="retargeting"
          label={<Trans message="Retargeting" />}
          startIcon={<SwapVertIcon />}
        >
          <LinkRetargetingFields />
        </AccordionItem>
      )}
      {!hiddenFields.includes('seo') && (
        <AccordionItem
          label={<Trans message="SEO" />}
          startIcon={<PublicIcon />}
          value="seo"
        >
          <LinkSeoFields hideTitle={hiddenFields?.includes('title')} />
        </AccordionItem>
      )}
      <AccordionItem
        value="utm"
        label={<Trans message="UTM" />}
        startIcon={<AccountTreeIcon />}
      >
        <LinkUtmFields />
      </AccordionItem>
    </Accordion>
  );
}

interface LinkOptionsFieldsProps {
  multipleLinks?: boolean;
  hiddenFields: HidableLinkSettingsField[];
  linkName: ReactElement<MessageDescriptor>;
}
function LinkOptionsFields({
  multipleLinks,
  hiddenFields,
  linkName,
}: LinkOptionsFieldsProps) {
  const {
    links: {enable_type, pixels},
  } = useSettings();
  const linkCount = multipleLinks ? 2 : 1;
  const hideGroups = hiddenFields.includes('groups');
  const hideType = hiddenFields.includes('type');
  const hideEnabled = hiddenFields.includes('enabled');

  return (
    <Fragment>
      {enable_type && !hideType && <LinkTypeField />}
      <LinkDomainSelect
        name="domain_id"
        className="mb-24"
        description={
          <Trans
            message="Select which domain should [one :name|other :names] be accessible with."
            values={{name: linkName, count: linkCount}}
          />
        }
      />
      {!hideGroups && <LinkGroupsField multipleLinks={multipleLinks} />}
      {pixels && (
        <LinkPixelsField multipleLinks={multipleLinks} linkName={linkName} />
      )}
      {!hideEnabled && (
        <FormSwitch
          name="active"
          description={
            <Trans
              message="When [one :name is|other :names are] disabled, 404 page will be shown when short URL is visited."
              values={{name: linkName, count: linkCount}}
            />
          }
        >
          <Trans message="Enabled" />
        </FormSwitch>
      )}
    </Fragment>
  );
}

interface LinkGroupsFieldProps {
  multipleLinks?: boolean;
}
function LinkGroupsField({multipleLinks}: LinkGroupsFieldProps) {
  const {data} = useLinkFormValueLists();
  return (
    <FormChipField
      suggestions={data?.groups}
      openMenuOnFocus={true}
      allowCustomValue={false}
      showDropdownArrow
      className="mb-24"
      name="groups"
      label={<Trans message="Groups" />}
      description={
        <Trans
          message="Which groups should [one link|other these links] belong to."
          values={{count: multipleLinks ? 2 : 1}}
        />
      }
    >
      {group => <Item value={group.id}>{group.name}</Item>}
    </FormChipField>
  );
}

interface LinkPixelsFieldProps {
  multipleLinks?: boolean;
  linkName: ReactElement<MessageDescriptor>;
}
function LinkPixelsField({multipleLinks, linkName}: LinkPixelsFieldProps) {
  const {data} = useLinkFormValueLists();
  return (
    <FormChipField
      suggestions={data?.pixels}
      openMenuOnFocus={true}
      className="mb-24"
      name="pixels"
      label={<Trans message="Pixels" />}
      description={
        <Trans
          message="Which tracking pixels should be used for [one this :name|other these :names]."
          values={{count: multipleLinks ? 2 : 1, name: linkName}}
        />
      }
    >
      {pixel => <Item value={pixel.id}>{pixel.name}</Item>}
    </FormChipField>
  );
}
