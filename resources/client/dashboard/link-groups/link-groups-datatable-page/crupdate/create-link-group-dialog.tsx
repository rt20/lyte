import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {
  CrupdateLinkGroupForm,
  CrupdateLinkGroupPayload,
} from './crupdate-link-group-form';
import {useForm} from 'react-hook-form';
import {useCreateLinkGroup} from '../requests/use-create-link-group';
import {nanoid} from 'nanoid';
import {useSettings} from '@common/core/settings/use-settings';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';

export function CreateLinkGroupDialog() {
  const {formId, close} = useDialogContext();
  const {custom_domains} = useSettings();
  const {verify, isVerifying} = useRecaptcha('link_creation');

  const form = useForm<CrupdateLinkGroupPayload>({
    defaultValues: {
      active: true,
      hash: nanoid(6),
      rotator: false,
      domain_id: custom_domains?.allow_all_option ? undefined : 0,
    },
  });

  const createGroup = useCreateLinkGroup(form);
  return (
    <Dialog size="md">
      <DialogHeader>
        <Trans message="Create link group" />
      </DialogHeader>
      <DialogBody>
        <CrupdateLinkGroupForm
          formId={formId}
          form={form}
          onSubmit={async values => {
            const isValid = await verify();
            if (isValid) {
              createGroup.mutate(values, {onSuccess: () => close()});
            }
          }}
        />
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
          disabled={createGroup.isLoading || isVerifying}
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
