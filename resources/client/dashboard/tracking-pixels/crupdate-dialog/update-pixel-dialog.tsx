import {useForm} from 'react-hook-form';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {
  CrupdatePixelForm,
  CrupdatePixelFormValue,
} from '@app/dashboard/tracking-pixels/crupdate-dialog/crupdate-pixel-form';
import {Trans} from '@common/i18n/trans';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {useUpdatePixel} from '@app/dashboard/tracking-pixels/requests/use-update-pixel';

interface UpdatePixelDialogProps {
  pixel: TrackingPixel;
}
export function UpdatePixelDialog({pixel}: UpdatePixelDialogProps) {
  const form = useForm<CrupdatePixelFormValue>({
    defaultValues: {
      name: pixel.name,
      type: pixel.type,
      pixel_id: pixel.pixel_id,
      head_code: pixel.head_code,
      body_code: pixel.body_code,
    },
  });
  const {formId, close} = useDialogContext();
  const updatePixel = useUpdatePixel(pixel.id, form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Update “:name“" values={{name: pixel.name}} />
      </DialogHeader>
      <DialogBody>
        <CrupdatePixelForm
          formId={formId}
          form={form}
          onSubmit={values => {
            updatePixel.mutate(values, {
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
          disabled={updatePixel.isLoading}
        >
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
