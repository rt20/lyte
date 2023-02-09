import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import getVideoId from 'get-video-id';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';

export interface VimeoWidget extends BiolinkWidget {
  type: WidgetType.Vimeo;
  config: {
    url: string;
  };
}

interface VimeoWidgetDialogProps {
  biolink: Biolink;
  widget?: VimeoWidget;
}
export function VimeoWidgetDialog({biolink, widget}: VimeoWidgetDialogProps) {
  const {trans} = useTrans();
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Vimeo}
      widget={widget}
      onSubmit={(values, form) => {
        const vimeoId = getVideoId(values.url).id;
        if (!vimeoId) {
          form.setError('url', {
            message: trans(message('Invalid vimeo url')),
          });
        } else {
          return Promise.resolve(values);
        }
      }}
    >
      <FormTextField
        required
        autoFocus
        placeholder="https://vimeo.com/1084537"
        name="url"
        type="url"
        label={<Trans message="Vimeo video url" />}
        description={<Trans message="Embed this vimeo video within biolink." />}
      />
    </CrupdateWidgetDialog>
  );
}
