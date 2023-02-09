import {ImageWidget} from '@app/dashboard/biolink/biolink-editor/content/widgets/image-widget/image-widget-dialog';
import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import clsx from 'clsx';
import {ImageIcon} from '@common/icons/material/Image';

export function ImageWidgetRenderer({
  widget,
  variant,
}: WidgetRendererProps<ImageWidget>) {
  const image = widget.config.url ? (
    <img
      className={clsx('object-cover', getImageClassName({widget, variant}))}
      src={widget.config.url}
      alt=""
    />
  ) : (
    <div
      className={clsx(
        getImageClassName({widget, variant}),
        'flex items-center justify-center'
      )}
    >
      <ImageIcon
        size={variant === 'editor' ? 'sm' : 'lg'}
        className="text-muted"
      />
    </div>
  );

  if (widget.config.destinationUrl) {
    return <a href={widget.config.destinationUrl}>{image}</a>;
  }
  return image;
}

function getImageClassName({
  widget,
  variant,
}: WidgetRendererProps<ImageWidget>) {
  const type = widget.config.type;
  if (variant === 'editor') {
    return `w-20 h-20 ${type === 'avatar' ? 'rounded-full' : 'rounded'}`;
  } else if (type === 'avatar') {
    return 'w-96 h-96 rounded-full mx-auto';
  }
  return 'w-full h-full rounded block';
}
