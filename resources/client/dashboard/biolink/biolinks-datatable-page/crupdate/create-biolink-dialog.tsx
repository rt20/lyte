import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {CrupdateBiolinkFormValues} from './crupdate-biolink-form-values';
import {useForm} from 'react-hook-form';
import {useCreateBiolink} from '../requests/use-create-biolink';
import {nanoid} from 'nanoid';
import {useSettings} from '@common/core/settings/use-settings';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {AliasField} from '@app/dashboard/links/forms/alias-field';
import {LinkDomainSelect} from '@app/dashboard/links/forms/link-domain-select';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {useNavigate} from '@common/utils/hooks/use-navigate';

export function CreateBiolinkDialog() {
  const navigate = useNavigate();
  const {formId, close} = useDialogContext();
  const {custom_domains} = useSettings();
  const {verify, isVerifying} = useRecaptcha('link_creation');

  const form = useForm<CrupdateBiolinkFormValues>({
    defaultValues: {
      active: true,
      hash: nanoid(6),
      domain_id: custom_domains?.allow_all_option ? undefined : 0,
    },
  });
  const createBiolink = useCreateBiolink(form);

  const handleSubmit = async (values: CrupdateBiolinkFormValues) => {
    const isValid = await verify();
    if (isValid) {
      createBiolink.mutate(values, {
        onSuccess: response => {
          close();
          navigate(`${response.biolink.id}/edit`);
        },
      });
    }
  };

  return (
    <Dialog size="md">
      <DialogHeader>
        <Trans message="Create biolink" />
      </DialogHeader>
      <DialogBody>
        <Form
          form={form}
          id={formId}
          onBeforeSubmit={() => {
            // hook form won't clear errors for fields that are not bound to input
            form.clearErrors('hash');
          }}
          onSubmit={handleSubmit}
        >
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
          <LinkDomainSelect name="domain_id" className="mb-24" />
          <FormTextField
            name="description"
            className="mb-24"
            label={<Trans message="Description" />}
            inputElementType="textarea"
            rows={2}
          />
          <FormSwitch
            name="active"
            description={
              <Trans message="Whether this biolink is viewable publicly." />
            }
            className="mb-24"
          >
            <Trans message="Active" />
          </FormSwitch>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          form={formId}
          disabled={createBiolink.isLoading || isVerifying}
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
