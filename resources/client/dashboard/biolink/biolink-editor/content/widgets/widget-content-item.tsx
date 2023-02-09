import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {WidgetList} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {Trans} from '@common/i18n/trans';
import {Switch} from '@common/ui/forms/toggle/switch';
import {BiolinkContentItemLayout} from '@app/dashboard/biolink/biolink-editor/content/biolink-content-item-layout';
import {useUpdateBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink-content-item';
import {Button} from '@common/ui/buttons/button';
import {ArrowUpwardIcon} from '@common/icons/material/ArrowUpward';
import {useSortBiolinkContent} from '@app/dashboard/biolink/biolink-editor/requests/use-sort-biolink-content';
import {biolinkEditorState} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {ArrowDownwardIcon} from '@common/icons/material/ArrowDownward';
import {WidgetRenderers} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-renderers';

interface WidgetContentItemProps {
  item: BiolinkWidget;
  biolink: Biolink;
}
export function WidgetContentItem({
  item: widget,
  biolink,
}: WidgetContentItemProps) {
  const config = WidgetList[widget.type];
  const WidgetRenderer = WidgetRenderers[widget.type];
  const WidgetDialog = config.dialog;

  return (
    <BiolinkContentItemLayout
      biolink={biolink}
      item={widget}
      title={<Trans {...config.name} />}
      updateDialog={<WidgetDialog widget={widget} biolink={biolink} />}
      actionRow={<ActionRow widget={widget} />}
    >
      <WidgetRenderer widget={widget} variant="editor" />
    </BiolinkContentItemLayout>
  );
}

interface ActionRowProps {
  widget: BiolinkWidget;
}
function ActionRow({widget}: ActionRowProps) {
  const updateItem = useUpdateBiolinkContentItem();
  const sortContent = useSortBiolinkContent();

  const handlePinToTop = () => {
    const biolink = biolinkEditorState().biolink;
    if (!biolink) return;

    const pinnedCount = biolink.content.filter(x => x.pinned === 'top').length;

    if (!widget.pinned) {
      const oldIndex = biolink.content.findIndex(
        x => x.model_type === widget.model_type && x.id === widget.id
      );
      sortContent.mutate({
        oldIndex,
        // pinned widget after any other widgets that are already pinned to top
        newIndex: pinnedCount,
        widgetToPin: widget.id,
      });
    } else {
      updateItem.mutate({item: widget, values: {pinned: null}});
    }
  };

  return (
    <div className="flex items-center gap-24 justify-between text-muted h-42">
      <Switch
        checked={widget.active}
        disabled={updateItem.isLoading}
        onChange={() => {
          updateItem.mutate({
            item: widget,
            values: {
              active: !widget.active,
            },
          });
        }}
      />
      <Button
        variant="outline"
        size="2xs"
        radius="rounded-full"
        color={widget.pinned === 'top' ? 'primary' : undefined}
        startIcon={
          widget.pinned === 'top' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
        }
        disabled={sortContent.isLoading}
        onClick={handlePinToTop || updateItem.isLoading}
      >
        {widget.pinned === 'top' ? (
          <Trans message="Unpin from top" />
        ) : (
          <Trans message="Pin to top" />
        )}
      </Button>
    </div>
  );
}
