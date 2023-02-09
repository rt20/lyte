import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import getVideoId from 'get-video-id';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';

export interface YoutubeWidget extends BiolinkWidget {
  type: WidgetType.Youtube;
  config: {
    url: string;
  };
}

interface YoutubeWidgetDialogProps {
  biolink: Biolink;
  widget?: YoutubeWidget;
}
export function YoutubeWidgetDialog({
  biolink,
  widget,
}: YoutubeWidgetDialogProps) {
  const {trans} = useTrans();
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Youtube}
      widget={widget}
      onSubmit={(values, form) => {
        const youtubeId = getVideoId(values.url).id;
        if (!youtubeId) {
          form.setError('url', {
            message: trans(message('Invalid youtube url')),
          });
        } else {
          return Promise.resolve(values);
        }
      }}
    >
      <FormTextField
        required
        autoFocus
        placeholder="https://www.youtube.com/watch?v=YE7VzlLtp-4"
        name="url"
        type="url"
        label={<Trans message="Youtube video url" />}
        description={
          <Trans message="Embed this youtube video within biolink." />
        }
      />
    </CrupdateWidgetDialog>
  );
}
