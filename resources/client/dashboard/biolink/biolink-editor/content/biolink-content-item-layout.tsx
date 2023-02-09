import {DragIndicatorIcon} from '@common/icons/material/DragIndicator';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Button} from '@common/ui/buttons/button';
import {EditIcon} from '@common/icons/material/Edit';
import {Trans} from '@common/i18n/trans';
import {DetachContentItemButton} from '@app/dashboard/biolink/biolink-editor/content/detach-content-item-button';
import {ReactNode, useRef} from 'react';
import {
  Biolink,
  BiolinkLink,
  BiolinkWidget,
} from '@app/dashboard/biolink/biolink';
import {useSortable} from '@common/ui/interactions/dnd/use-sortable';
import {useSortBiolinkContent} from '@app/dashboard/biolink/biolink-editor/requests/use-sort-biolink-content';
import clsx from 'clsx';

interface BiolinkContentItemLayoutProps {
  item?: BiolinkLink | BiolinkWidget;
  biolink?: Biolink;
  title?: ReactNode;
  updateDialog?: ReactNode;
  children: ReactNode;
  actionRow?: ReactNode;
}
export function BiolinkContentItemLayout({
  item,
  biolink,
  title,
  updateDialog,
  children,
  actionRow,
}: BiolinkContentItemLayoutProps) {
  const sortContent = useSortBiolinkContent();
  const itemRef = useRef<HTMLDivElement>(null);
  const sortDisabled = !item || item.pinned != null;

  const {sortableProps, dragHandleRef} = useSortable({
    item: item || 'noop',
    items: biolink?.content || [],
    type: 'biolinkEditorSortable',
    ref: itemRef,
    onSortEnd: (oldIndex, newIndex) => {
      sortContent.mutate({oldIndex, newIndex});
    },
    disabled: sortDisabled,
  });

  return (
    <div
      className="rounded-lg shadow border flex items-stretch mb-20 bg-paper h-172"
      ref={itemRef}
      {...sortableProps}
    >
      <button
        type="button"
        className={clsx(
          'text-muted border-r flex-shrink-0 px-10',
          !sortDisabled && 'hover:text-primary'
        )}
        disabled={sortDisabled}
        ref={dragHandleRef}
      >
        <DragIndicatorIcon />
      </button>
      <div className="p-24 flex-auto min-w-0">
        <div className="flex items-center">
          {title && (
            <div className="font-medium mb-4 whitespace-nowrap overflow-hidden overflow-ellipsis flex-auto mr-auto">
              {title}
            </div>
          )}
          {updateDialog && (
            <DialogTrigger type="modal">
              <Button
                className="flex-shrink-0 ml-20"
                variant="text"
                color="primary"
                startIcon={<EditIcon />}
              >
                <Trans message="Edit" />
              </Button>
              {updateDialog}
            </DialogTrigger>
          )}
          {biolink && item && <DetachContentItemButton item={item} />}
        </div>
        <div className="mb-20">{children}</div>
        {actionRow}
      </div>
    </div>
  );
}
