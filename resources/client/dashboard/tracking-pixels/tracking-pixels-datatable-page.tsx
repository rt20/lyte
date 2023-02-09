import {useAuth} from '@common/auth/use-auth';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import React, {useMemo} from 'react';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {TrackingPixelsDatatableColumns} from '@app/dashboard/tracking-pixels/tracking-pixels-datatable-columns';
import locationTracking from './location-tracking.svg';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {TrackingPixelsDatatableFilters} from '@app/dashboard/tracking-pixels/tracking-pixels-datatable-filters';
import {CreatePixelDialog} from '@app/dashboard/tracking-pixels/crupdate-dialog/create-pixel-dialog';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';

interface TrackingPixelsDatablePageProps {
  forCurrentUser?: boolean;
}
export function TrackingPixelsDatablePage({
  forCurrentUser,
}: TrackingPixelsDatablePageProps) {
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? TrackingPixelsDatatableColumns
      : TrackingPixelsDatatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? TrackingPixelsDatatableFilters
      : TrackingPixelsDatatableFilters.filter(
          filter => filter.key !== 'user_id'
        );

    return {filters, columns};
  }, [forCurrentUser]);

  const userId = forCurrentUser ? user?.id : '';

  return (
    <DataTablePage
      endpoint="tp"
      queryParams={{userId, with: 'user', workspaceId}}
      title={<Trans message="Tracking pixels" />}
      filters={filters}
      columns={columns}
      headerContent={<InfoTrigger />}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="trackingPixel" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={locationTracking}
          title={<Trans message="No tracking pixels have been added yet" />}
          filteringTitle={<Trans message="No matching tracking pixels" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <PermissionAwareButton resource="trackingPixel" action="create">
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="Add pixel" />
        </DataTableAddItemButton>
        <CreatePixelDialog />
      </DialogTrigger>
    </PermissionAwareButton>
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      body={
        <Trans message="Add third party tracking integration to your links using pixels or custom code snippet." />
      }
    />
  );
}
