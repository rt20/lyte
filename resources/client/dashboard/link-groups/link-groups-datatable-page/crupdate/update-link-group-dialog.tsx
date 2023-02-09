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
import {useUpdateLinkGroup} from '../requests/use-update-link-group';
import {LinkGroup} from '../../link-group';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';

interface UpdateLinkGroupDialogProps {
  group: LinkGroup;
}
export function UpdateLinkGroupDialog({group}: UpdateLinkGroupDialogProps) {
  const {verify, isVerifying} = useRecaptcha('link_creation');
  const {formId, close} = useDialogContext();
  const form = useForm<CrupdateLinkGroupPayload>({
    defaultValues: {
      name: group.name,
      hash: group.hash,
      description: group.description,
      active: group.active,
      rotator: group.rotator,
    },
  });
  const updateGroup = useUpdateLinkGroup(form, group.id);

  return (
    <Dialog size="md">
      <DialogHeader>
        <Trans message="Update link group" />
      </DialogHeader>
      <DialogBody>
        <CrupdateLinkGroupForm
          formId={formId}
          form={form}
          onSubmit={async values => {
            const isValid = await verify();
            if (isValid) {
              updateGroup.mutate(values, {onSuccess: () => close()});
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
          disabled={updateGroup.isLoading || isVerifying}
        >
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
