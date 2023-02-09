import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import {
  SocialsList,
  SocialsType,
} from '@app/dashboard/biolink/biolink-editor/content/widgets/socials-widget/socials-list';
import {isAbsoluteUrl} from '@common/utils/urls/is-absolute-url';
import {SocialsWidget} from '@app/dashboard/biolink/biolink-editor/content/widgets/socials-widget/socials-widget-dialog';
import clsx from 'clsx';
import {IconButton} from '@common/ui/buttons/icon-button';

export function SocialsWidgetRenderer({
  widget,
  variant,
}: WidgetRendererProps<SocialsWidget>) {
  return (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-y-8',
        variant === 'editor'
          ? 'gap-x-14 mt-4 text-muted'
          : 'gap-x-2 mt-20 mb-26 justify-center'
      )}
    >
      {Object.entries(widget.config).map(([type, uri]) => {
        const Icon = SocialsList[type as SocialsType].icon;
        if (!Icon) return null;

        if (variant === 'editor') {
          return <Icon key={type} />;
        }

        return (
          <IconButton
            className="flex-shrink-0"
            elementType="a"
            href={buildUrl(type as SocialsType, uri)}
            key={type}
          >
            <Icon />
          </IconButton>
        );
      })}
    </div>
  );
}

function buildUrl(socialsType: SocialsType, uri: string): string {
  if (!uri || isAbsoluteUrl(uri)) {
    return uri;
  }
  // only remove @ from the begging of string (Twitter and Instagram handle for example)
  if (socialsType === SocialsType.Twitter) {
    return `https://twitter.com/${uri.replace('@', '')}`;
  } else if (socialsType === SocialsType.Instagram) {
    return `https://instagram.com/${uri.replace('@', '')}`;
  } else if (socialsType === SocialsType.Tiktok) {
    return `https://tiktok.com/${uri}`;
  } else if (socialsType === SocialsType.Mail) {
    return `mailto:${uri}`;
  } else if (socialsType === SocialsType.Whatsapp) {
    return `https://api.whatsapp.com/send?phone=${uri}`;
  }
  return uri;
}
