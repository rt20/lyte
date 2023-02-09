import {useAuth} from '@common/auth/use-auth';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import React, {useMemo} from 'react';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import preferencesPopup from './preferences-popup.svg';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {Link} from 'react-router-dom';
import {LinkOverlaysDatatableColumns} from '@app/dashboard/link-overlays/link-overlays-datatable-columns';
import {LinkOverlaysDatatableFilters} from '@app/dashboard/link-overlays/link-overlays-datatable-filters';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

interface TrackingPixelsDatablePageProps {
  forCurrentUser?: boolean;
}
export function LinkOverlaysDatatablePage({
  forCurrentUser,
}: TrackingPixelsDatablePageProps) {
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? LinkOverlaysDatatableColumns
      : LinkOverlaysDatatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? LinkOverlaysDatatableFilters
      : LinkOverlaysDatatableFilters.filter(filter => filter.key !== 'user_id');

    return {filters, columns};
  }, [forCurrentUser]);

  const userId = forCurrentUser ? user?.id : '';

  return (
    <DataTablePage
      endpoint="link-overlay"
      queryParams={{userId, with: 'user', workspaceId}}
      title={<Trans message="Call-to-action overlays" />}
      headerContent={<InfoTrigger />}
      filters={filters}
      columns={columns}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="linkOverlay" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={preferencesPopup}
          title={<Trans message="No overlays have been added yet" />}
          filteringTitle={<Trans message="No matching overlays" />}
        />
      }
    />
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      body={
        <Trans message="Display fully customizable, non-intrusive overlay with a message and call-to-action button over destination website." />
      }
    />
  );
}

function Actions() {
  return (
    <PermissionAwareButton resource="linkOverlay" action="create">
      <DataTableAddItemButton to="new" elementType={Link}>
        <Trans message="Add overlay" />
      </DataTableAddItemButton>
    </PermissionAwareButton>
  );
}
