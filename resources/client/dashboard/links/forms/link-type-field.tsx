import {useSettings} from '@common/core/settings/use-settings';
import {useLinkFormValueLists} from '../requests/use-link-form-value-lists';
import {useFormContext} from 'react-hook-form';
import {FormSelect} from '@common/ui/forms/select/select';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import {CrupdateLinkFormValues} from '@app/dashboard/links/forms/crupdate-link-form';

export function LinkTypeField() {
  const {
    branding: {site_name},
  } = useSettings();
  const {data} = useLinkFormValueLists();
  const {watch, setValue} = useFormContext<CrupdateLinkFormValues>();
  const type = watch('type');

  return (
    <div className="flex items-center gap-12">
      <FormSelect
        className="mb-24 flex-auto"
        name="type"
        label={<Trans message="Type" />}
        selectionMode="single"
        onSelectionChange={() => {
          // clear type id when link type changes
          setValue('type_id', null);
        }}
      >
        <Item
          value="direct"
          description={<Trans message="Redirect user to url instantly" />}
        >
          <Trans message="Direct" />
        </Item>
        <Item
          value="frame"
          description={
            <Trans
              message=" Show url inside iframe with :siteName navigation bar."
              values={{siteName: site_name}}
            />
          }
        >
          <Trans message="Frame" />
        </Item>
        <Item
          value="splash"
          description={
            <Trans message="Show splash page with optional ads and redirect user to url after a delay." />
          }
        >
          <Trans message="Splash" />
        </Item>
        {data?.pages?.length ? (
          <Item
            value="page"
            description={
              <Trans
                message="Show specified link page with :siteName navigation bar and button to open
      long url."
                values={{siteName: site_name}}
              />
            }
          >
            <Trans message="Link page" />
          </Item>
        ) : null}
        {data?.overlays.length ? (
          <Item
            value="overlay"
            description={
              <Trans message="Redirect user instantly and show specified overlay over the link." />
            }
          >
            <Trans message="Overlay" />
          </Item>
        ) : null}
      </FormSelect>
      {type === 'page' && (
        <FormSelect
          label={<Trans message="Link page" />}
          name="type_id"
          selectionMode="single"
          className="mb-24 flex-auto"
          required
        >
          {data?.pages?.map(page => (
            <Item key={page.id} value={page.id}>
              {page.title}
            </Item>
          ))}
        </FormSelect>
      )}
      {type === 'overlay' && (
        <FormSelect
          label={<Trans message="Link overlay" />}
          name="type_id"
          selectionMode="single"
          className="mb-24 flex-auto"
          required
        >
          {data?.overlays?.map(overlay => (
            <Item key={overlay.id} value={overlay.id}>
              {overlay.name}
            </Item>
          ))}
        </FormSelect>
      )}
    </div>
  );
}
