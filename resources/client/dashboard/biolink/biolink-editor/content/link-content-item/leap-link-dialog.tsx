import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {FormDatePicker} from '@common/ui/forms/input-field/date/date-picker/date-picker';
import {SectionHelper} from '@common/ui/section-helper';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useForm} from 'react-hook-form';
import {BiolinkLink} from '@app/dashboard/biolink/biolink';
import {Form} from '@common/ui/forms/form';
import {useCurrentDateTime} from '@common/i18n/use-current-date-time';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {BiolinkItemPayload} from '@app/dashboard/biolink/biolink-editor/content/biolink-item-payload';
import {useUpdateBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink-content-item';

interface LinkScheduleDialogProps {
  link: BiolinkLink;
}
export function LeapLinkDialog({link}: LinkScheduleDialogProps) {
  const now = useCurrentDateTime();
  const {close, formId} = useDialogContext();
  const form = useForm<BiolinkItemPayload>({
    defaultValues: {
      leap_until: link.leap_until,
    },
  });
  const isDirty = form.formState.isDirty;
  const updateItem = useUpdateBiolinkContentItem();

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Redirect link" />
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
                  toast.positive(message('Redirect link updated'));
                  close();
                },
              }
            );
          }}
        >
          <FormDatePicker
            required
            name="leap_until"
            min={now}
            className="mb-24"
            label={<Trans message="Redirect until" />}
            showCalendarFooter
          />
        </Form>
        <InfoSection />
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
          disabled={!isDirty || updateItem.isLoading}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function InfoSection() {
  return (
    <SectionHelper
      description={
        <Trans message="Send all visitors straight to this link, instead of your Biolink, until the specified date. After that date, Biolink will resume to showing normally." />
      }
    />
  );
}
