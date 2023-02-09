import {useAuth} from '@common/auth/use-auth';
import React, {useEffect, useMemo} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import marketing from './marketing.svg';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {BiolinksDatatableColumns} from './biolinks-datatable-columns';
import {BiolinksDatatableFilters} from './biolinks-datatable-filters';
import {CreateBiolinkDialog} from './crupdate/create-biolink-dialog';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {prefetchLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

interface LinkGroupsDatatablePageProps {
  forCurrentUser?: boolean;
}
export function BioLinksDatatablePage({
  forCurrentUser,
}: LinkGroupsDatatablePageProps) {
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? BiolinksDatatableColumns
      : BiolinksDatatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? BiolinksDatatableFilters
      : BiolinksDatatableFilters.filter(filter => filter.key !== 'user_id');

    return {filters, columns};
  }, [forCurrentUser]);

  useEffect(() => {
    prefetchLinkFormValueLists();
  }, []);

  const userId = forCurrentUser ? user?.id : '';
  return (
    <DataTablePage
      endpoint="biolink"
      queryParams={{
        userId,
        withCount: 'links',
        with: 'user,domain',
        workspaceId,
      }}
      title={<Trans message="Biolinks" />}
      headerContent={<InfoTrigger />}
      filters={filters}
      columns={columns}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="biolink" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={marketing}
          title={<Trans message="No biolinks have been created yet" />}
          filteringTitle={<Trans message="No matching biolinks" />}
        />
      }
    />
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      title={<Trans message="Link in bio" />}
      body={
        <Trans message="Offer multiple choices to your followers when they click on your Biolink. Share all your Social Media profiles, videos, songs, articles and other important links with just one url." />
      }
    />
  );
}

function Actions() {
  return (
    <PermissionAwareButton resource="biolink" action="create">
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="New biolink" />
        </DataTableAddItemButton>
        <CreateBiolinkDialog />
      </DialogTrigger>
    </PermissionAwareButton>
  );
}
