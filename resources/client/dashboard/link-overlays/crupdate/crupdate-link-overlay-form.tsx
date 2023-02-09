import {useFormContext, UseFormReturn} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {Trans} from '@common/i18n/trans';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {FormSelect} from '@common/ui/forms/select/select';
import {
  LinkOverlayColors,
  LinkOverlayPositions,
  LinkOverlayThemes,
} from '@app/dashboard/link-overlays/crupdate/link-overlay-constants';
import {Item} from '@common/ui/forms/listbox/item';
import {OverlayWebsiteBackground} from './overlay-website-background';
import {Fragment, ReactElement} from 'react';
import {FloatingLinkOverlay} from '@app/short-links/floating-link-overlay';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ColorIcon} from '@common/admin/appearance/sections/themes/color-icon';
import {ColorPickerDialog} from '@common/ui/color-picker/color-picker-dialog';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {ButtonBase} from '@common/ui/buttons/button-base';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {Button, ButtonProps} from '@common/ui/buttons/button';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {CrupdateLinkOverlayPayload} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-payload';
import {FormImageSelector} from '@common/ui/images/image-selector';

interface CrupdateLinkOverlayFormProps {
  isLoading: boolean;
  form: UseFormReturn<CrupdateLinkOverlayPayload>;
  onSubmit: (values: CrupdateLinkOverlayPayload) => void;
}
export function CrupdateLinkOverlayForm({
  form,
  isLoading,
  onSubmit,
}: CrupdateLinkOverlayFormProps) {
  return (
    <Form form={form} onSubmit={onSubmit} className="flex h-full">
      <div className="flex-shrink-0 w-full md:w-288 px-16 md:border-r md:shadow-lg h-full overflow-y-auto">
        <Tabs>
          <TabList expand>
            <Tab>
              <Trans message="General" />
            </Tab>
            <Tab>
              <Trans message="Style" />
            </Tab>
          </TabList>
          <TabPanels className="my-24">
            <TabPanel>
              <GeneralFields />
              <SaveButton disabled={isLoading} />
            </TabPanel>
            <TabPanel>
              <StyleFields />
              <SaveButton disabled={isLoading} className="mt-14" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div className="flex-auto relative hidden md:block">
        <OverlayWebsiteBackground />
        <OverlayPreview />
      </div>
    </Form>
  );
}

function SaveButton(props: ButtonProps) {
  return (
    <Button type="submit" variant="flat" color="primary" {...props}>
      <Trans message="Save" />
    </Button>
  );
}

function BackgroundField() {
  return (
    <FormImageSelector
      className="mb-20"
      name="colors.bg-image"
      label={<Trans message="Background image" />}
      diskPrefix="overlays"
      showRemoveButton
    />
  );
}

interface ColorFieldProps {
  name: keyof LinkOverlay['colors'];
  children: ReactElement;
}
function ColorField({name, children}: ColorFieldProps) {
  const {watch, setValue} = useFormContext<CrupdateLinkOverlayPayload>();
  const color = watch(`colors.${name}`);

  return (
    <DialogTrigger
      currentValue={color}
      type="popover"
      placement="right"
      offset={10}
      onClose={newColor => {
        setValue(`colors.${name}`, newColor);
      }}
    >
      <ButtonBase className="flex items-center gap-10 w-full rounded border text-sm h-54 px-14 mb-10 bg relative hover:bg-hover">
        <ColorIcon
          viewBox="0 0 48 48"
          className="icon-lg"
          style={{fill: color}}
        />
        <div>{children}</div>
        <KeyboardArrowRightIcon className="icon-sm text-muted ml-auto" />
      </ButtonBase>
      <ColorPickerDialog
        defaultValue={color}
        onChange={newColor => {
          setValue(`colors.${name}`, newColor);
        }}
      />
    </DialogTrigger>
  );
}

function StyleFields() {
  return (
    <Fragment>
      <FileUploadProvider>
        <BackgroundField />
      </FileUploadProvider>
      {LinkOverlayColors.map(({key, label}) => (
        <ColorField name={key} key={key}>
          <Trans {...label} />
        </ColorField>
      ))}
    </Fragment>
  );
}

function GeneralFields() {
  return (
    <Fragment>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        className="mb-24"
        required
      />
      <FormSelect
        name="position"
        selectionMode="single"
        label={<Trans message="Position" />}
        className="mb-24"
      >
        {LinkOverlayPositions.map(position => (
          <Item key={position.key} value={position.key}>
            <Trans {...position.label} />
          </Item>
        ))}
      </FormSelect>
      <FormSelect
        name="theme"
        selectionMode="single"
        label={<Trans message="Theme" />}
        className="mb-24"
      >
        {LinkOverlayThemes.map(theme => (
          <Item key={theme.key} value={theme.key}>
            <Trans {...theme.label} />
          </Item>
        ))}
      </FormSelect>
      <FormTextField
        name="message"
        label={<Trans message="Message" />}
        inputElementType="textarea"
        maxLength={200}
        rows={2}
        className="mb-24"
      />
      <FormTextField
        name="label"
        label={<Trans message="Label" />}
        maxLength={8}
        className="mb-24"
      />
      <FormTextField
        type="url"
        name="btn_link"
        label={<Trans message="Button link" />}
        className="mb-24"
      />
      <FormTextField
        name="btn_text"
        label={<Trans message="Button text" />}
        maxLength={30}
        className="mb-24"
      />
    </Fragment>
  );
}

function OverlayPreview() {
  const {watch} = useFormContext<CrupdateLinkOverlayPayload>();
  const values = watch();
  return <FloatingLinkOverlay overlay={values} />;
}
