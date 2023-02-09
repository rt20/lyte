import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {UseFormReturn} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {Trans} from '@common/i18n/trans';
import {FormSelect} from '@common/ui/forms/select/select';
import {SupportedTrackingPixels} from '@app/dashboard/tracking-pixels/supported-tracking-pixels';
import {Item} from '@common/ui/forms/listbox/item';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {TuneIcon} from '@common/icons/material/Tune';
import {Fragment} from 'react';
import {HelpOutlineIcon} from '@common/icons/material/HelpOutline';

export interface CrupdatePixelFormValue {
  name: string;
  type: string;
  pixel_id?: string | number;
  head_code?: string;
  body_code?: string;
}

interface CrupdatePixelFormProps {
  formId: string;
  form: UseFormReturn<CrupdatePixelFormValue>;
  onSubmit: (value: CrupdatePixelFormValue) => void;
}
export function CrupdatePixelForm({
  formId,
  form,
  onSubmit,
}: CrupdatePixelFormProps) {
  const {watch} = form;
  const type = watch('type');
  const config = SupportedTrackingPixels.find(p => p.name === type);

  return (
    <Form id={formId} form={form} onSubmit={onSubmit}>
      <FormTextField
        autoFocus
        required
        name="name"
        label={<Trans message="Name" />}
        className="mb-24"
      />
      <FormSelect
        name="type"
        selectionMode="single"
        className="mb-24"
        label={<Trans message="Type" />}
        description={
          config?.docsUrl ? (
            <div className="flex items-center gap-6">
              <HelpOutlineIcon size="sm" />
              <a
                data-testid="pixel-docs-link"
                href={config.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                <Trans message="More information" />
              </a>
            </div>
          ) : null
        }
      >
        {SupportedTrackingPixels.map(pixel => (
          <Item
            capitalizeFirst
            key={pixel.name}
            value={pixel.name}
            startIcon={
              pixel.docsUrl ? (
                <RemoteFavicon url={pixel.docsUrl} />
              ) : (
                <TuneIcon size="xs" />
              )
            }
          >
            {pixel.name}
          </Item>
        ))}
      </FormSelect>
      {type !== 'custom' && (
        <FormTextField
          required
          pattern={config?.pattern}
          type={config?.type === 'number' ? 'number' : 'text'}
          name="pixel_id"
          label={<Trans message="Pixel ID" />}
        />
      )}
      {type === 'custom' && <CustomCodeFields />}
    </Form>
  );
}

function CustomCodeFields() {
  return (
    <Fragment>
      <FormTextField
        name="head_code"
        label={<Trans message="Custom code for page head" />}
        className="mb-24"
        inputElementType="textarea"
        rows={5}
      />
      <FormTextField
        name="body_code"
        label={<Trans message="Custom code for page body" />}
        inputElementType="textarea"
        rows={5}
      />
    </Fragment>
  );
}
