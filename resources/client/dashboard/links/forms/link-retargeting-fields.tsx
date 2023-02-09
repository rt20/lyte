import {LinkFormSection} from './link-form-section';
import {Trans} from '@common/i18n/trans';
import {FormComboBox} from '@common/ui/forms/combobox/form-combobox';
import {useLinkFormValueLists} from '../requests/use-link-form-value-lists';
import {useFieldArray} from 'react-hook-form';
import {Item} from '@common/ui/forms/listbox/item';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Button} from '@common/ui/buttons/button';
import {AddIcon} from '@common/icons/material/Add';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {cloneElement, ReactElement} from 'react';
import {FormSelect} from '@common/ui/forms/select/select';
import {CrupdateLinkFormValues} from '@app/dashboard/links/forms/crupdate-link-form';
import {useLinkFeatureStatus} from '@app/dashboard/upgrade/use-link-feature-status';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function LinkRetargetingFields() {
  return (
    <div>
      <GeoFields />
      <DeviceFields />
      <PlatformFields />
    </div>
  );
}

function GeoFields() {
  const {data} = useLinkFormValueLists();
  return (
    <FieldsLayout
      defaultKey="us"
      name="geo_rules"
      title={<Trans message="Location targeting" />}
      description={
        <Trans message="Redirect users to different url based on their location." />
      }
      buttonLabel={<Trans message="Add location" />}
    >
      <FormComboBox
        required
        useOptionLabelAsInputValue={true}
        items={data?.countries}
        name="temp"
        label={<Trans message="Country" />}
        className="flex-auto mt-24"
      >
        {country => (
          <Item key={country.code} value={country.code}>
            {country.name}
          </Item>
        )}
      </FormComboBox>
    </FieldsLayout>
  );
}

function DeviceFields() {
  return (
    <FieldsLayout
      name="device_rules"
      title={<Trans message="Device targeting" />}
      description={
        <Trans message="Redirect users to different url based on their device." />
      }
      buttonLabel={<Trans message="Add device" />}
      defaultKey="desktop"
    >
      <FormSelect
        required
        selectionMode="single"
        name="temp"
        label={<Trans message="Device" />}
        className="flex-auto mt-24"
      >
        <Item value="desktop">
          <Trans message="Desktop" />
        </Item>
        <Item value="table">
          <Trans message="Tablet" />
        </Item>
        <Item value="mobile">
          <Trans message="Mobile" />
        </Item>
      </FormSelect>
    </FieldsLayout>
  );
}

function PlatformFields() {
  return (
    <FieldsLayout
      name="platform_rules"
      title={<Trans message="Platform targeting" />}
      description={
        <Trans message="Redirect users to different url based on their platform." />
      }
      defaultKey="windows"
      buttonLabel={<Trans message="Add platform" />}
    >
      <FormSelect
        name="temp"
        required
        selectionMode="single"
        label={<Trans message="Platform" />}
        className="flex-auto mt-24"
      >
        <Item value="windows">
          <Trans message="Windows" />
        </Item>
        <Item value="osx">
          <Trans message="MacOs" />
        </Item>
        <Item value="ios">
          <Trans message="iOS" />
        </Item>
        <Item value="android">
          <Trans message="Android" />
        </Item>
        <Item value="linux">
          <Trans message="Linux" />
        </Item>
      </FormSelect>
    </FieldsLayout>
  );
}

interface FieldsLayoutProps {
  name: 'geo_rules' | 'device_rules' | 'platform_rules';
  title: ReactElement;
  description: ReactElement;
  buttonLabel: ReactElement;
  defaultKey: string;
  children: ReactElement;
}
function FieldsLayout({
  name,
  title,
  description,
  buttonLabel,
  defaultKey,
  children,
}: FieldsLayoutProps) {
  const {fields, append, remove} = useFieldArray<CrupdateLinkFormValues>({
    name,
  });
  const {disabled} = useLinkFeatureStatus('retargeting');

  return (
    <LinkFormSection
      title={title}
      description={description}
      upgradeMessage={
        disabled && (
          <Trans message="Your current plan doesn't include link retargeting." />
        )
      }
    >
      {fields.map((field, index) => (
        <div key={field.id} className="block md:flex items-end gap-14">
          {cloneElement(children, {name: `${name}.${index}.key`, disabled})}
          <FormTextField
            required
            type="url"
            name={`${name}.${index}.value`}
            label={<Trans message="URL" />}
            className="flex-auto mt-24"
            disabled={disabled}
          />
          <RemoveButton onClick={() => remove(index)} />
        </div>
      ))}
      <Button
        className="my-8"
        variant="text"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          append({key: defaultKey, value: ''} as any);
        }}
        disabled={disabled}
      >
        {buttonLabel}
      </Button>
    </LinkFormSection>
  );
}

interface RemoveButtonProps {
  onClick: () => void;
}
function RemoveButton({onClick}: RemoveButtonProps) {
  const isMobile = useIsMobileMediaQuery();

  if (isMobile) {
    return (
      <div className="mt-12">
        <Button variant="outline" color="danger" size="xs" onClick={onClick}>
          <Trans message="Remove" />
        </Button>
      </div>
    );
  }

  return (
    <IconButton color="danger" onClick={onClick}>
      <CloseIcon />
    </IconButton>
  );
}
