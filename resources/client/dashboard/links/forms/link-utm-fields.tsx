import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {AddIcon} from '@common/icons/material/Add';
import {Button} from '@common/ui/buttons/button';
import {useFieldArray} from 'react-hook-form';
import {CrupdateLinkFormValues} from '@app/dashboard/links/forms/crupdate-link-form';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {LinkFormSection} from '@app/dashboard/links/forms/link-form-section';
import {useLinkFeatureStatus} from '@app/dashboard/upgrade/use-link-feature-status';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function LinkUtmFields() {
  const {trans} = useTrans();
  const {disabled} = useLinkFeatureStatus('utm');

  return (
    <LinkFormSection
      title={<Trans message="UTM tags" />}
      description={
        <Trans message="Add UTMs to track web traffic in analytics tools." />
      }
      upgradeMessage={
        disabled && (
          <Trans message="Your current plan doesn't include UTM functionality." />
        )
      }
    >
      <div className="block md:flex gap-24 items-center mt-24">
        <FormTextField
          name="utm.source"
          label={<Trans message="Source" />}
          placeholder={trans(message('e.g: adwords, google, facebook'))}
          className="mb-24 flex-auto"
          disabled={disabled}
        />
        <FormTextField
          name="utm.medium"
          label={<Trans message="Medium" />}
          placeholder={trans(message('e.g: banner, email, social post'))}
          className="mb-24 flex-auto"
          disabled={disabled}
        />
      </div>
      <div className="block md:flex gap-24 items-center">
        <FormTextField
          name="utm.campaign"
          label={<Trans message="Campaign" />}
          placeholder={trans(message('e.g: holiday special, birthday promo'))}
          className="mb-24 flex-auto"
          disabled={disabled}
        />
        <FormTextField
          name="utm.term"
          label={<Trans message="Term" />}
          placeholder={trans(message('Use to identify ppc keywords'))}
          className="mb-24 flex-auto"
          disabled={disabled}
        />
      </div>
      <FormTextField
        name="utm.content"
        label={<Trans message="Content" />}
        placeholder={trans(
          message('Use to differentiate ads or words on a page')
        )}
        className="mb-24"
        disabled={disabled}
      />
      <CustomTagsSection />
    </LinkFormSection>
  );
}

function CustomTagsSection() {
  const {fields, append, remove} = useFieldArray<CrupdateLinkFormValues>({
    name: 'utm_custom',
  });
  const {disabled} = useLinkFeatureStatus('utm');

  return (
    <LinkFormSection
      title={<Trans message="Custom parameters" />}
      description={
        <Trans message="Add query parameters to track web traffic in analytics tools." />
      }
      upgradeMessage={
        disabled && (
          <Trans message="Your current plan doesn't include query parameters functionality." />
        )
      }
    >
      {fields.map((field, index) => (
        <div key={field.id} className="block md:flex items-end gap-14">
          <FormTextField
            required
            name={`utm_custom.${index}.key`}
            label={<Trans message="Key" />}
            className="flex-auto mt-24"
            disabled={disabled}
          />
          <FormTextField
            required
            name={`utm_custom.${index}.value`}
            label={<Trans message="Value" />}
            className="flex-auto mt-24"
            disabled={disabled}
          />
          <RemoveButton onClick={() => remove(index)} />
        </div>
      ))}
      <Button
        className="mb-24 mt-12"
        variant="text"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          append({key: '', value: ''});
        }}
        disabled={disabled}
      >
        <Trans message="Add parameter" />
      </Button>
    </LinkFormSection>
  );
}

interface RemoveButtonProps {
  onClick: () => void;
}
function RemoveButton({onClick}: RemoveButtonProps) {
  const isMobile = useIsMobileMediaQuery();

  if (isMobile) {
    return (
      <div className="mt-12">
        <Button variant="outline" color="danger" size="xs" onClick={onClick}>
          <Trans message="Remove" />
        </Button>
      </div>
    );
  }

  return (
    <IconButton color="danger" onClick={onClick}>
      <CloseIcon />
    </IconButton>
  );
}
