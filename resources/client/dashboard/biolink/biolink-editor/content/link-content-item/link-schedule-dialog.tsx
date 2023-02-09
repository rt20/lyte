import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {FormDatePicker} from '@common/ui/forms/input-field/date/date-picker/date-picker';
import {SectionHelper} from '@common/ui/section-helper';
import {Fragment, ReactNode, useMemo} from 'react';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useForm} from 'react-hook-form';
import {BiolinkLink} from '@app/dashboard/biolink/biolink';
import {Form} from '@common/ui/forms/form';
import {useCurrentDateTime} from '@common/i18n/use-current-date-time';
import {parseAbsolute} from '@internationalized/date';
import {useUserTimezone} from '@common/i18n/use-user-timezone';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {BiolinkItemPayload} from '@app/dashboard/biolink/biolink-editor/content/biolink-item-payload';
import {useUpdateBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink-content-item';

interface LinkScheduleDialogProps {
  link: BiolinkLink;
}
export function LinkScheduleDialog({link}: LinkScheduleDialogProps) {
  const now = useCurrentDateTime();
  const timezone = useUserTimezone();
  const {close, formId} = useDialogContext();
  const form = useForm<BiolinkItemPayload>({
    defaultValues: {
      activates_at: link.activates_at,
      expires_at: link.expires_at,
    },
  });
  const updateItem = useUpdateBiolinkContentItem();
  const activationDate = form.watch('activates_at');

  const expirationMinDate = useMemo(() => {
    if (activationDate) {
      return parseAbsolute(activationDate, timezone);
    }
    return now;
  }, [activationDate, now, timezone]);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Schedule" />
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
                  toast.positive(message('Schedule updated'));
                  close();
                },
              }
            );
          }}
        >
          <FormDatePicker
            name="activates_at"
            min={now}
            className="mb-24"
            label={<Trans message="Start date" />}
            showCalendarFooter
          />
          <FormDatePicker
            name="expires_at"
            min={expirationMinDate}
            className="mb-24"
            label={<Trans message="End date" />}
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
          disabled={updateItem.isLoading || !form.formState.isDirty}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function InfoSection() {
  const values = {
    b: (parts: ReactNode) => <span className="font-bold">{parts}</span>,
  };

  return (
    <SectionHelper
      description={
        <Fragment>
          <div>
            <Trans
              message="Leave <b>start date</b> blank to display this link immediately."
              values={values}
            />
          </div>
          <div>
            <Trans
              message="Leave <b>end date</b> blank to display this link forever."
              values={values}
            />
          </div>
        </Fragment>
      }
    />
  );
}
