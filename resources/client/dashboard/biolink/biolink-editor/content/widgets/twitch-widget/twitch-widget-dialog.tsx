import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';

export interface TwitchWidget extends BiolinkWidget {
  type: WidgetType.Image;
  config: {
    url: string;
  };
}

interface YoutubeWidgetDialogProps {
  biolink: Biolink;
  widget?: TwitchWidget;
}
export function TwitchWidgetDialog({
  biolink,
  widget,
}: YoutubeWidgetDialogProps) {
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Twitch}
      widget={widget}
    >
      <FormTextField
        required
        autoFocus
        placeholder="https://www.twitch.tv/kasparovchess"
        name="url"
        type="url"
        pattern="https://(www.)?twitch.tv/.*"
        label={<Trans message="Twitch channel or clip url" />}
        description={
          <Trans message="Embed this twitch channel or clip within biolink." />
        }
      />
    </CrupdateWidgetDialog>
  );
}
