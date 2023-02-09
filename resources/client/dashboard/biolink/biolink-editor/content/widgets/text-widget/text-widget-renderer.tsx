import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import {TextWidget} from '@app/dashboard/biolink/biolink-editor/content/widgets/text-widget/text-widget-dialog';

export function TextWidgetRenderer({
  widget,
  variant,
}: WidgetRendererProps<TextWidget>) {
  if (!widget.config.title && !widget.config.description) return null;

  if (variant === 'editor') {
    return (
      <div className="text-sm text-muted">
        <div>{widget.config.title}</div>
        <div>{widget.config.description}</div>
      </div>
    );
  }

  return (
    <div className="text-center mb-30">
      <div className="text-base font-medium">{widget.config.title}</div>
      <div className="text-sm mt-8">{widget.config.description}</div>
    </div>
  );
}
