import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import clsx from 'clsx';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {formatEmbedURL} from '@app/dashboard/biolink/biolink-editor/content/widgets/spotify-widget/spotify-uri';
import {SpotifyWidget} from '@app/dashboard/biolink/biolink-editor/content/widgets/spotify-widget/spotify-widget-dialog';

export function SpotifyWidgetRenderer({
  widget,
  variant,
}: WidgetRendererProps<SpotifyWidget>) {
  if (!widget.config.url) return null;

  if (variant === 'editor') {
    return (
      <div className="flex items-center gap-8">
        <RemoteFavicon url={widget.config.url} />
        <a
          href={widget.config.url}
          target="_blank"
          className="text-muted text-sm hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[80%]"
          rel="noreferrer"
        >
          {widget.config.url}
        </a>
      </div>
    );
  }

  const embedURL = formatEmbedURL(widget.config.url);
  return (
    <iframe
      className={clsx(
        'w-full rounded shadow-lg',
        getEmbedHeight(widget.config.type)
      )}
      loading="lazy"
      src={embedURL}
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  );
}

function getEmbedHeight(type?: string) {
  switch (type) {
    case 'track':
      return 'h-80';
    default:
      return 'h-[152px]';
  }
}
