import {Fragment, ReactElement} from 'react';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {useCurrentDateTime} from '@common/i18n/use-current-date-time';
import {FormDatePicker} from '@common/ui/forms/input-field/date/date-picker/date-picker';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {LinkFormSection} from './link-form-section';
import {useLinkFeatureStatus} from '@app/dashboard/upgrade/use-link-feature-status';
import {NoPermissionButton} from '@app/dashboard/upgrade/no-permission-button';
import {MessageDescriptor} from '@common/i18n/message-descriptor';

interface LinkRestrictionFieldsProps {
  linkName: ReactElement<MessageDescriptor>;
}
export function LinkRestrictionFields({linkName}: LinkRestrictionFieldsProps) {
  const {disabled} = useLinkFeatureStatus('password');

  return (
    <Fragment>
      <FormTextField
        type="password"
        name="password"
        label={<Trans message="Password" />}
        autoComplete="new-password"
        className="mb-24"
        labelSuffix={
          disabled && (
            <NoPermissionButton
              message={
                <Trans message="Your current plan doesn't include link password protection." />
              }
            />
          )
        }
        disabled={disabled}
      />
      <ScheduleFields linkName={linkName} />
      <ExpirationClicksField linkName={linkName} />
    </Fragment>
  );
}

function ScheduleFields({linkName}: LinkRestrictionFieldsProps) {
  const now = useCurrentDateTime();
  const {disabled} = useLinkFeatureStatus('expiration');

  return (
    <LinkFormSection
      title={<Trans message="Schedule" />}
      description={
        <Trans
          message="Specify a date when :name should become active and when it should expire. Both activation and expiration dates are optional."
          values={{name: linkName}}
        />
      }
      upgradeMessage={
        disabled && (
          <Trans
            message="Your current plan doesn't include :name scheduling."
            values={{name: linkName}}
          />
        )
      }
    >
      <div className="block md:flex items-center gap-24 mt-24">
        <FormDatePicker
          showCalendarFooter
          label={<Trans message="Activation date" />}
          min={now}
          name="activates_at"
          className="mb-24 flex-auto"
          disabled={disabled}
        />
        <FormDatePicker
          showCalendarFooter
          label={<Trans message="Expiration date" />}
          min={now}
          name="expires_at"
          className="mb-24 flex-auto"
          disabled={disabled}
        />
      </div>
    </LinkFormSection>
  );
}

function ExpirationClicksField({linkName}: LinkRestrictionFieldsProps) {
  const {trans} = useTrans();
  const {disabled} = useLinkFeatureStatus('expiration');

  return (
    <LinkFormSection
      title={<Trans message="Expiration clicks" />}
      description={
        <Trans
          message="After :name is visited specified amount of times, it will no longer be accessible.
Optionally, after click amount is reached :name can redirect to specified url instead."
          values={{name: linkName}}
        />
      }
      upgradeMessage={
        disabled && (
          <Trans message="Your current plan doesn't include expiration clicks." />
        )
      }
    >
      <div className="block md:flex items-center gap-24 mt-24">
        <FormTextField
          type="number"
          label={<Trans message="Max clicks" />}
          name="exp_clicks_rule.key"
          className="mb-24 flex-auto"
          disabled={disabled}
        />
        <FormTextField
          type="url"
          label={<Trans message="Redirect URL" />}
          placeholder={trans(message('Optional'))}
          name="exp_clicks_rule.value"
          className="mb-24 flex-auto"
          disabled={disabled}
        />
      </div>
    </LinkFormSection>
  );
}
