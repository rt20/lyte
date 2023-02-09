import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {TiktokWidget} from '@app/dashboard/biolink/biolink-editor/content/widgets/tiktok-widget/tiktok-widget-dialog';
import tiktokImage from './tiktok.png';
import {useEffect} from 'react';
import lazyLoader from '@common/utils/http/lazy-loader';

export function TiktokWidgetRenderer({
  widget,
  variant,
}: WidgetRendererProps<TiktokWidget>) {
  useEffect(() => {
    lazyLoader.loadAsset('https://www.tiktok.com/embed.js', {type: 'js'});
  }, []);

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

  const embedURL = new URL(widget.config.url).pathname.split('/').pop()?.trim();
  return (
    <blockquote data-video-id={embedURL} className="tiktok-embed">
      <img src={tiktokImage} alt="" />
    </blockquote>
  );
}
