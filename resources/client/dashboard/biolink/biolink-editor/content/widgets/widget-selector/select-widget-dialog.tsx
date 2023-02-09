import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {WidgetList} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';

export function SelectWidgetDialog() {
  const {close} = useDialogContext();
  return (
    <Dialog size="xl">
      <DialogHeader titleTextSize="text-md" padding="px-24 pt-14 pb-4">
        <Trans message="Add widget" />
      </DialogHeader>
      <DialogBody padding="p-24">
        <div className="grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(WidgetList).map(([widgetType, widget]) => (
            <div
              key={widgetType}
              className="bg-paper border rounded p-14 shadow cursor-pointer hover:bg-primary/hover"
              role="button"
              tabIndex={0}
              onClick={() => {
                close(widgetType);
              }}
            >
              <img
                src={widget.image}
                alt=""
                className="block w-54 h-54 mb-20 mr-auto"
              />
              <div className="text-primary text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                <Trans {...widget.name} />
              </div>
              <div className="text-muted">
                <Trans {...widget.description} />
              </div>
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
}
