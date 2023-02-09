import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrupdateLinkFormValues} from '../forms/crupdate-link-form';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {useCreateMultipleLinks} from '@app/dashboard/links/requests/use-create-multiple-links';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {LinkSettingsForm} from '@app/dashboard/links/forms/link-settings-form';
import {urlIsValid} from '@app/dashboard/links/utils/url-is-valid';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Biolink} from '@app/dashboard/biolink/biolink';

export interface CreateMultipleLinksFormValue
  extends Omit<CrupdateLinkFormValues, 'hash' | 'long_url'> {
  long_urls: string;
}

interface CreateMultipleLinksDialogProps {
  group?: LinkGroup | Biolink | null;
}
export function CreateMultipleLinksDialog({
  group,
}: CreateMultipleLinksDialogProps) {
  const {trans} = useTrans();
  const {close, formId} = useDialogContext();
  const form = useForm<CreateMultipleLinksFormValue>({
    defaultValues: {
      active: true,
      type: 'direct',
      geo_rules: [],
      device_rules: [],
      platform_rules: [],
      // set undefined if no group id specified, so existing groups are not cleared in backend
      groups: group ? [group as LinkGroup] : undefined,
      utm: {},
      utm_custom: [],
    },
  });
  const createMultiple = useCreateMultipleLinks(form);
  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Shorten links" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            const someUrlsInvalid = values.long_urls
              .split(/\r?\n/)
              .some(url => !urlIsValid(url));
            if (someUrlsInvalid) {
              form.setError('long_urls', {
                message: trans(message('Some of the urls are not valid.')),
              });
            } else {
              createMultiple.mutate(values, {onSuccess: () => close()});
            }
          }}
        >
          <FormTextField
            label={<Trans message="Multiple URLs (one per line)" />}
            inputElementType="textarea"
            rows={10}
            name="long_urls"
            autoComplete="off"
            spellCheck="false"
            required
            className="mb-24"
            autoFocus
          />
          <LinkSettingsForm multipleLinks />
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
          disabled={createMultiple.isLoading}
        >
          <Trans message="Shorten" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
