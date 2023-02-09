import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {
  CrupdateLinkForm,
  CrupdateLinkFormValues,
} from '../forms/crupdate-link-form';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {useUpdateLink} from '../requests/use-update-link';
import {Link} from '../link';
import {useMemo} from 'react';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';
import {buildLinkeableDefaultFormValues} from '@app/dashboard/links/utils/build-linkeable-default-form-values';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {CreateLinkDialogProps} from '@app/dashboard/links/dialogs/create-link-dialog';

interface UpdateLinkDialogProps extends Omit<CreateLinkDialogProps, 'group'> {
  link: Link;
}
export function UpdateLinkDialog({
  link,
  showButtonLabelField,
  hiddenFields,
  invalidateQueries,
  onSuccess,
  endpoint,
}: UpdateLinkDialogProps) {
  const {close, formId} = useDialogContext();
  const {verify, isVerifying} = useRecaptcha('link_creation');

  const defaultValues = useMemo(() => buildDefaultFormValues(link), [link]);
  const form = useForm<CrupdateLinkFormValues>({
    defaultValues,
  });
  const updateLink = useUpdateLink(form, link.id, {
    endpoint,
    invalidateQueries,
  });

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Update link" />
      </DialogHeader>
      <DialogBody>
        <CrupdateLinkForm
          hiddenFields={hiddenFields}
          showButtonLabelField={showButtonLabelField}
          formId={formId}
          form={form}
          onSubmit={async values => {
            const isValid = await verify();
            if (isValid) {
              updateLink.mutate(values, {
                onSuccess: response => {
                  onSuccess?.(response);
                  close();
                },
              });
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
          disabled={updateLink.isLoading || isVerifying}
        >
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export function buildDefaultFormValues(link: Link) {
  const values = buildLinkeableDefaultFormValues(link);
  return {
    ...values,
    long_url: link.long_url,
    alias: link.alias,
    type: link.type,
    type_id: link.type_id,
    groups: link.groups as LinkGroup[],
  };
}
