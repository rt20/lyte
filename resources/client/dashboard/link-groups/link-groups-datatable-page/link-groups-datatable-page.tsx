import {useAuth} from '@common/auth/use-auth';
import React, {Fragment, useEffect, useMemo} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import shareLink from '../../links/share-link.svg';
import {DataTableExportCsvButton} from '@common/datatable/csv-export/data-table-export-csv-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {LinkGroupsDatatableColumns} from './link-groups-datatable-columns';
import {LinkGroupsDatatableFilters} from './link-groups-datatable-filters';
import {CreateLinkGroupDialog} from './crupdate/create-link-group-dialog';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {prefetchLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

interface LinkGroupsDatatablePageProps {
  forCurrentUser?: boolean;
}
export function LinkGroupsDatatablePage({
  forCurrentUser,
}: LinkGroupsDatatablePageProps) {
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? LinkGroupsDatatableColumns
      : LinkGroupsDatatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? LinkGroupsDatatableFilters
      : LinkGroupsDatatableFilters.filter(filter => filter.key !== 'user_id');

    return {filters, columns};
  }, [forCurrentUser]);

  useEffect(() => {
    prefetchLinkFormValueLists();
  }, []);

  const userId = forCurrentUser ? user?.id : '';
  return (
    <DataTablePage
      endpoint="link-group"
      queryParams={{
        userId,
        withCount: 'links',
        with: 'user',
        workspaceId,
      }}
      title={<Trans message="Link groups" />}
      headerContent={<InfoTrigger />}
      filters={filters}
      columns={columns}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="linkGroup" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={shareLink}
          title={<Trans message="No groups have been created yet" />}
          filteringTitle={<Trans message="No matching groups" />}
        />
      }
    />
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      dialogSize="auto"
      title={<Trans message="Group links together to:" />}
      body={
        <ul className="list-disc list-inside whitespace-nowrap">
          <li>
            <Trans message="Simplify multiple link management." />
          </li>
          <li>
            <Trans message="View aggregated clicks report for the whole group." />
          </li>
          <li>
            <Trans message="Redirect to a random link from within the group." />
          </li>
          <li>
            <Trans message="Share all links in the group with one link." />
          </li>
        </ul>
      }
    />
  );
}

function Actions() {
  return (
    <Fragment>
      <DataTableExportCsvButton endpoint="link-group/csv/export" />
      <PermissionAwareButton resource="linkGroup" action="create">
        <DialogTrigger type="modal">
          <DataTableAddItemButton>
            <Trans message="New group" />
          </DataTableAddItemButton>
          <CreateLinkGroupDialog />
        </DialogTrigger>
      </PermissionAwareButton>
    </Fragment>
  );
}
