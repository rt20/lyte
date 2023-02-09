import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useForm} from 'react-hook-form';
import {BiolinkLink} from '@app/dashboard/biolink/biolink';
import {Form} from '@common/ui/forms/form';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {BiolinkItemPayload} from '@app/dashboard/biolink/biolink-editor/content/biolink-item-payload';
import {useUpdateBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink-content-item';

interface LinkThumbnailDialogProps {
  link: BiolinkLink;
}
export function LinkThumbnailDialog({link}: LinkThumbnailDialogProps) {
  const {close, formId} = useDialogContext();
  const form = useForm<BiolinkItemPayload>({
    defaultValues: {
      image: link.image,
    },
  });
  const updateItem = useUpdateBiolinkContentItem();
  const isDirty = form.formState.isDirty;

  return (
    <Dialog size="sm">
      <DialogHeader>
        <Trans message="Link thumbnail" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={async values => {
            updateItem.mutate(
              {
                item: link,
                values,
              },
              {
                onSuccess: () => {
                  toast.positive(message('Thumbnail updated'));
                  close();
                },
              }
            );
          }}
        >
          <FileUploadProvider>
            <FormImageSelector
              showRemoveButton
              name="image"
              diskPrefix="links"
            />
          </FileUploadProvider>
        </Form>
      </DialogBody>
      <DialogFooter dividerTop>
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
          disabled={updateItem.isLoading || !isDirty}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
