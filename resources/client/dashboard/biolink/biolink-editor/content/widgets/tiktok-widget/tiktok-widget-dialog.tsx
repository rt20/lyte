import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';

export interface TiktokWidget extends BiolinkWidget {
  type: WidgetType.Vimeo;
  config: {
    url: string;
  };
}

interface TiktokWidgetDialogProps {
  biolink: Biolink;
  widget?: TiktokWidget;
}
export function TiktokWidgetDialog({biolink, widget}: TiktokWidgetDialogProps) {
  const {trans} = useTrans();
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Tiktok}
      widget={widget}
      onSubmit={(values, form) => {
        if (!values.url.includes('tiktok.com/')) {
          form.setError('url', {
            message: trans(message('Invalid tiktok url')),
          });
        } else {
          return Promise.resolve(values);
        }
      }}
    >
      <FormTextField
        required
        autoFocus
        placeholder="https://www.tiktok.com/@bts_official_bighit/video/6964945720885464322"
        name="url"
        type="url"
        label={<Trans message="Tiktok url" />}
        description={
          <Trans message="Embed this tiktok video within biolink." />
        }
      />
    </CrupdateWidgetDialog>
  );
}
