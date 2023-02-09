import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';

export interface SoundcloudWidget extends BiolinkWidget {
  type: WidgetType.Soundcloud;
  config: {
    url: string;
    embedUrl: string;
  };
}

interface SoundcloudWidgetDialogProps {
  biolink: Biolink;
  widget?: SoundcloudWidget;
}
export function SoundcloudWidgetDialog({
  biolink,
  widget,
}: SoundcloudWidgetDialogProps) {
  const {trans} = useTrans();
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Soundcloud}
      widget={widget}
      onSubmit={async (values, form) => {
        const encodedUrl = encodeURIComponent(values.url);
        const response = await fetch(
          `https://soundcloud.com/oembed?format=json&url=${encodedUrl}`
        ).then(res => res.json());
        const embedCode = response.html;

        const div = document.createElement('div');
        div.innerHTML = embedCode;
        const embedUrl = div.querySelector('iframe')?.src;

        if (embedUrl) {
          return {
            ...values,
            embedUrl,
          };
        }

        form.setError('url', {
          message: trans(message('Invalid soundcloud url')),
        });
      }}
    >
      <FormTextField
        required
        autoFocus
        placeholder="https://soundcloud.com/artist/track"
        name="url"
        type="url"
        label={<Trans message="Soundcloud track url" />}
        description={
          <Trans message="Embed this soundcloud track within biolink." />
        }
      />
    </CrupdateWidgetDialog>
  );
}
