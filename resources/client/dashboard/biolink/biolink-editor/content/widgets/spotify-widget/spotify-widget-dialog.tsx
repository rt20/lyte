import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {parse} from '@app/dashboard/biolink/biolink-editor/content/widgets/spotify-widget/spotify-uri';

export interface SpotifyWidget extends BiolinkWidget {
  type: WidgetType.Vimeo;
  config: {
    url: string;
    type?: string;
  };
}

interface SpotifyWidgetDialogProps {
  biolink: Biolink;
  widget?: SpotifyWidget;
}
export function SpotifyWidgetDialog({
  biolink,
  widget,
}: SpotifyWidgetDialogProps) {
  const {trans} = useTrans();
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Spotify}
      widget={widget}
      onSubmit={(values, form) => {
        const spotifyInfo = parse(values.url);
        if (!('id' in spotifyInfo)) {
          form.setError('url', {
            message: trans(message('Invalid spotify url')),
          });
        } else {
          return Promise.resolve({
            ...values,
            type: spotifyInfo.type,
          });
        }
      }}
    >
      <FormTextField
        required
        autoFocus
        placeholder="https://open.spotify.com/track/2sqfLwGKXDw1nGjFhH3GGX?si=f329040f45804ec5"
        name="url"
        type="url"
        label={<Trans message="Spotify share url" />}
        description={
          <Trans message="Any share url from spotify can be used, including artist, album, track, playlist etc." />
        }
      />
    </CrupdateWidgetDialog>
  );
}
