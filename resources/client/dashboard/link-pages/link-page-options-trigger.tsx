import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {SettingsIcon} from '@common/icons/material/Settings';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Form} from '@common/ui/forms/form';
import {useForm} from 'react-hook-form';
import {
  UpdateLinkPageOptionsPayload,
  useUpdateLinkPageOptions,
} from '@app/dashboard/link-pages/requests/use-update-link-page-options';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Tooltip} from '@common/ui/tooltip/tooltip';

interface LinkPageOptionsTriggerProps {
  page: CustomPage;
}
export function LinkPageOptionsTrigger({page}: LinkPageOptionsTriggerProps) {
  return (
    <DialogTrigger type="modal">
      <Tooltip label={<Trans message="Page options" />}>
        <IconButton className="text-muted">
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <OptionsDialog page={page} />
    </DialogTrigger>
  );
}

interface OptionsDialogProps {
  page: CustomPage;
}
function OptionsDialog({page}: OptionsDialogProps) {
  const {formId, close} = useDialogContext();
  const form = useForm<UpdateLinkPageOptionsPayload>({
    defaultValues: {
      hideFooter: Boolean(page.meta?.hideFooter),
      hideNavbar: Boolean(page.meta?.hideNavbar),
    },
  });
  const updateOptions = useUpdateLinkPageOptions(page.id, form);

  return (
    <Dialog size="sm">
      <DialogHeader>
        <Trans message="Link page options" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            updateOptions.mutate(values, {onSuccess: close});
          }}
        >
          <FormSwitch
            className="mb-24"
            name="hideNavbar"
            description={
              <Trans message="Whether navbar should be hidden on this link page." />
            }
          >
            <Trans message="Hide navbar" />
          </FormSwitch>
          <FormSwitch
            name="hideFooter"
            description={
              <Trans message="Whether footer should be hidden on this link page." />
            }
          >
            <Trans message="Hide footer" />
          </FormSwitch>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          form={formId}
          disabled={updateOptions.isLoading}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
