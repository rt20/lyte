import {
  HidableLinkSettingsField,
  LinkSettingsForm,
} from '@app/dashboard/links/forms/link-settings-form';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {useForm} from 'react-hook-form';
import {CrupdateBiolinkFormValues} from '@app/dashboard/biolink/biolinks-datatable-page/crupdate/crupdate-biolink-form-values';
import {Form} from '@common/ui/forms/form';
import {Trans} from '@common/i18n/trans';
import {buildLinkeableDefaultFormValues} from '@app/dashboard/links/utils/build-linkeable-default-form-values';
import {useUpdateBiolink} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink';
import {Button} from '@common/ui/buttons/button';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {useEditorBiolink} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {AliasField} from '@app/dashboard/links/forms/alias-field';

const hiddenLinkSettingsFields: HidableLinkSettingsField[] = [
  'type',
  'groups',
  'title',
];

export function BiolinkSettingsForm() {
  const {biolink} = useEditorBiolink();

  if (!biolink) {
    return (
      <div className="py-24">
        <FullPageLoader />
      </div>
    );
  }

  return <SettingsForm biolink={biolink} />;
}

interface SettingsFormProps {
  biolink: Biolink;
}
function SettingsForm({biolink}: SettingsFormProps) {
  const form = useForm<CrupdateBiolinkFormValues>({
    defaultValues: buildLinkeableDefaultFormValues(biolink),
  });
  const updateSettings = useUpdateBiolink(form, biolink.id);

  return (
    <Form
      form={form}
      onBeforeSubmit={() => {
        // hook form won't clear errors for fields that are not bound to input
        form.clearErrors('hash');
      }}
      onSubmit={values => {
        updateSettings.mutate(values);
      }}
    >
      <div className="mb-24">
        <Button
          type="submit"
          variant="flat"
          color="primary"
          disabled={updateSettings.isLoading || !form.formState.isDirty}
        >
          <Trans message="Update" />
        </Button>
      </div>
      <div className="mb-24">
        <FormTextField
          name="name"
          label={<Trans message="Name" />}
          minLength={3}
          className="mb-8"
          autoFocus
        />
        <AliasField form={form} name="hash" />
      </div>
      <LinkSettingsForm
        hiddenFields={hiddenLinkSettingsFields}
        linkName={<Trans message="biolink" />}
      />
    </Form>
  );
}
