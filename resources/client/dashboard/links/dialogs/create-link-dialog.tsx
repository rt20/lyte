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
import {useCreateLink} from '../requests/use-create-link';
import {useForm} from 'react-hook-form';
import {nanoid} from 'nanoid';
import {useSettings} from '@common/core/settings/use-settings';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {HidableLinkSettingsField} from '@app/dashboard/links/forms/link-settings-form';

export interface CreateLinkDialogProps {
  group?: LinkGroup | Biolink | null;
  showButtonLabelField?: boolean;
  hiddenFields?: HidableLinkSettingsField[];
  endpoint?: string;
  position?: number;
  invalidateQueries?: boolean;
  onSuccess?: (response: any) => void;
}
export function CreateLinkDialog({
  group,
  position,
  showButtonLabelField,
  hiddenFields,
  endpoint,
  onSuccess,
  invalidateQueries,
}: CreateLinkDialogProps) {
  const {close, formId} = useDialogContext();
  const {
    links: {default_type},
    custom_domains,
  } = useSettings();
  const {verify, isVerifying} = useRecaptcha('link_creation');

  const form = useForm<CrupdateLinkFormValues>({
    defaultValues: {
      hash: nanoid(5),
      active: true,
      type: default_type || 'direct',
      geo_rules: [],
      device_rules: [],
      platform_rules: [],
      // set undefined if no group id specified, so existing groups are not cleared in backend
      groups: group ? [group as LinkGroup] : [],
      position: position, // for biolink
      utm: {},
      utm_custom: [],
      domain_id: custom_domains?.allow_all_option ? undefined : 0,
    },
  });
  const createLink = useCreateLink(form, {endpoint, invalidateQueries});

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Create link" />
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
              createLink.mutate(values, {
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
          disabled={createLink.isLoading || isVerifying}
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
