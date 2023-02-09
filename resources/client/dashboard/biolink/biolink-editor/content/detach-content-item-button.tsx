import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {Trans} from '@common/i18n/trans';
import {BiolinkLink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {useDetachBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-detach-biolink-content-item';

interface DetachItemButtonProps {
  item: BiolinkLink | BiolinkWidget;
}
export function DetachContentItemButton({item}: DetachItemButtonProps) {
  const detachItem = useDetachBiolinkContentItem();
  return (
    <DialogTrigger type="modal">
      <IconButton
        className="text-muted flex-shrink-0"
        disabled={detachItem.isLoading}
      >
        <CloseIcon />
      </IconButton>
      <ConfirmationDialog
        isDanger
        onConfirm={() => {
          detachItem.mutate({item});
        }}
        title={<Trans message="Remove item" />}
        body={
          <Trans message="Are you sure you want to remove this item from the biolink?" />
        }
        confirm={<Trans message="Remove" />}
      />
    </DialogTrigger>
  );
}
