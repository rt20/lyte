import {useSettings} from '@common/core/settings/use-settings';
import {useLinkFeatureStatus} from '@app/dashboard/upgrade/use-link-feature-status';
import {SlugEditor} from '@common/ui/slug-editor';
import {NoPermissionButton} from '@app/dashboard/upgrade/no-permission-button';
import {Trans} from '@common/i18n/trans';
import {UseFormReturn} from 'react-hook-form';

interface AliasFieldProps {
  form: UseFormReturn<{hash: string; alias: string} | any>;
  name: 'alias' | 'hash';
}
export function AliasField({form, name}: AliasFieldProps) {
  const {
    links: {alias_min, alias_max},
    custom_domains,
  } = useSettings();
  const {disabled} = useLinkFeatureStatus('alias');
  const {watch, setValue, formState} = form;
  const currentAlias = watch('alias') || watch('hash');
  const aliasError =
    formState.errors.alias?.message || formState.errors.hash?.message;

  return (
    <div className="mb-24">
      <div className="flex items-center">
        <SlugEditor
          host={custom_domains?.default_host}
          pattern="[A-Za-z0-9_-]+"
          minLength={alias_min}
          maxLength={alias_max}
          value={currentAlias}
          onChange={newAlias => {
            setValue(name, newAlias);
          }}
          hideButton={disabled}
        />
        {disabled && (
          <NoPermissionButton
            message={
              <Trans message="Your current plan does not include alias editing." />
            }
          />
        )}
      </div>
      {aliasError && (
        <div className="text-xs text-danger mt-6">{aliasError as string}</div>
      )}
    </div>
  );
}
