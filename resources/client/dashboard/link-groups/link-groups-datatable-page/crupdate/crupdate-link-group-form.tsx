import {UseFormReturn} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {LinkDomainSelect} from '@app/dashboard/links/forms/link-domain-select';
import {LinkGroup} from '../../link-group';
import {AliasField} from '@app/dashboard/links/forms/alias-field';

export interface CrupdateLinkGroupPayload
  extends Pick<
    LinkGroup,
    'name' | 'description' | 'hash' | 'active' | 'rotator' | 'domain_id'
  > {}

interface CrupdateLinkGroupFormProps {
  formId: string;
  form: UseFormReturn<CrupdateLinkGroupPayload>;
  onSubmit: (values: CrupdateLinkGroupPayload) => void;
}
export function CrupdateLinkGroupForm({
  onSubmit,
  form,
  formId,
}: CrupdateLinkGroupFormProps) {
  const {clearErrors} = form;
  return (
    <Form
      form={form}
      id={formId}
      onBeforeSubmit={() => {
        // hook form won't clear errors for fields that are not bound to input
        clearErrors('hash');
      }}
      onSubmit={onSubmit}
    >
      <div className="mb-24">
        <FormTextField
          name="name"
          label={<Trans message="Name" />}
          minLength={3}
          className="mb-8"
          autoFocus
        />
        <AliasField form={form} name="hash" />
      </div>
      <LinkDomainSelect name="domain_id" className="mb-24" />
      <FormTextField
        name="description"
        className="mb-24"
        label={<Trans message="Description" />}
        inputElementType="textarea"
        rows={2}
      />
      <FormSwitch
        name="active"
        description={
          <Trans message="Whether this link group is viewable publicly." />
        }
        className="mb-24"
      >
        <Trans message="Active" />
      </FormSwitch>
      <FormSwitch
        name="rotator"
        description={
          <Trans message="When checked, url above will redirect to random link from the group, instead of showing all links belonging to group." />
        }
      >
        <Trans message="Rotator" />
      </FormSwitch>
    </Form>
  );
}
