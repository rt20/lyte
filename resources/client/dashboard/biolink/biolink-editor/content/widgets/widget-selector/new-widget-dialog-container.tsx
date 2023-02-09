import {
  WidgetList,
  WidgetType,
} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Biolink} from '@app/dashboard/biolink/biolink';

interface WidgetDialogContainerProps {
  biolink: Biolink;
  activeWidget: WidgetType | null;
  onOpenChange: (isOpen: boolean) => void;
}
export function NewWidgetDialogContainer({
  activeWidget,
  biolink,
  onOpenChange,
}: WidgetDialogContainerProps) {
  const Dialog = activeWidget ? WidgetList[activeWidget].dialog : null;
  return (
    <DialogTrigger
      type="modal"
      isOpen={activeWidget != null}
      onOpenChange={onOpenChange}
    >
      {Dialog && <Dialog biolink={biolink} />}
    </DialogTrigger>
  );
}
