import {useForm} from 'react-hook-form';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useCreatePixel} from '@app/dashboard/tracking-pixels/requests/use-create-pixel';
import {
  CrupdatePixelForm,
  CrupdatePixelFormValue,
} from '@app/dashboard/tracking-pixels/crupdate-dialog/crupdate-pixel-form';
import {Trans} from '@common/i18n/trans';

export function CreatePixelDialog() {
  const form = useForm<CrupdatePixelFormValue>({
    defaultValues: {type: 'facebook'},
  });
  const {formId, close} = useDialogContext();
  const createPixel = useCreatePixel(form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Create pixel" />
      </DialogHeader>
      <DialogBody>
        <CrupdatePixelForm
          formId={formId}
          form={form}
          onSubmit={values => {
            createPixel.mutate(values, {
              onSuccess: () => {
                close();
              },
            });
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
          disabled={createPixel.isLoading}
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
