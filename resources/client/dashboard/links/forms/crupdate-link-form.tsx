import {UseFormReturn} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {useSettings} from '@common/core/settings/use-settings';
import {Link} from '../link';
import {
  HidableLinkSettingsField,
  LinkSettingsForm,
} from '@app/dashboard/links/forms/link-settings-form';
import {urlIsValid} from '@app/dashboard/links/utils/url-is-valid';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {AliasField} from '@app/dashboard/links/forms/alias-field';
import {LinkeableFormValues} from '@app/dashboard/links/utils/build-linkeable-payload';
import clsx from 'clsx';

export interface CrupdateLinkFormValues
  extends Omit<Link, 'id' | 'utm'>,
    LinkeableFormValues {
  position?: number;
}

interface CrupdateLinkFormProps {
  onSubmit: (values: CrupdateLinkFormValues) => void;
  formId?: string;
  form: UseFormReturn<CrupdateLinkFormValues>;
  showButtonLabelField?: boolean;
  hiddenFields?: HidableLinkSettingsField[];
}
export function CrupdateLinkForm({
  form,
  onSubmit,
  formId,
  showButtonLabelField,
  hiddenFields,
}: CrupdateLinkFormProps) {
  const {clearErrors} = form;
  const {trans} = useTrans();
  const {
    links: {min_len, max_len},
  } = useSettings();
  const hideAlias = hiddenFields?.includes('alias');

  return (
    <Form
      form={form}
      onSubmit={values => {
        if (!urlIsValid(values.long_url)) {
          form.setError('long_url', {
            message: trans(message('This url is invalid.')),
          });
        } else {
          onSubmit(values);
        }
      }}
      onBeforeSubmit={() => {
        // hook form won't clear errors for fields that are not bound to input
        clearErrors('alias');
      }}
      id={formId}
    >
      {showButtonLabelField && (
        <FormTextField
          name="name"
          label={<Trans message="Button label" />}
          className="mb-24 flex-auto"
          placeholder={trans(message('e.g. My Webpage'))}
          autoFocus
        />
      )}
      <FormTextField
        label={<Trans message="Destination URL" />}
        name="long_url"
        placeholder="https://example.com"
        autoComplete="off"
        spellCheck="false"
        required
        className={clsx(hideAlias ? 'mb-24' : 'mb-12')}
        autoFocus={!showButtonLabelField}
        minLength={min_len}
        maxLength={max_len}
      />
      {!hideAlias && <AliasField form={form} name="alias" />}
      <LinkSettingsForm hiddenFields={hiddenFields} />
    </Form>
  );
}
