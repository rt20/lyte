import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import clsx from 'clsx';
import {RemoteFavicon} from '@common/ui/remote-favicon';

interface VideoEmbedWidgetRenderer {
  variant: WidgetRendererProps['variant'];
  embedUrl: string;
}
export function VideoEmbedWidgetRenderer({
  variant,
  embedUrl,
}: VideoEmbedWidgetRenderer) {
  if (!embedUrl) return null;

  if (variant === 'editor') {
    return (
      <div className="flex items-center gap-8">
        <RemoteFavicon url={embedUrl} />
        <a
          href={embedUrl}
          target="_blank"
          className="text-muted text-sm hover:underline"
          rel="noreferrer"
        >
          {embedUrl}
        </a>
      </div>
    );
  }
  return (
    <iframe
      className={clsx('aspect-video w-full rounded shadow-lg')}
      loading="lazy"
      src={embedUrl}
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  );
}
