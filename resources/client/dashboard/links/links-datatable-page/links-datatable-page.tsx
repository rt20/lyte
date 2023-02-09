import {Trans} from '@common/i18n/trans';
import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import shareLink from '../share-link.svg';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {LinksDatatableFilters} from './links-datatable-filters';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {CreateLinkDialog} from '../dialogs/create-link-dialog';
import {useAuth} from '@common/auth/use-auth';
import {linksDatatableColumns} from './links-datatable-columns';
import {useExportCsv} from '@common/datatable/requests/use-export-csv';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {MoreHorizIcon} from '@common/icons/material/MoreHoriz';
import {Item} from '@common/ui/forms/listbox/item';
import {AddLinkIcon} from '@common/icons/material/AddLink';
import {ExportCsvIcon} from '@common/datatable/csv-export/export-csv-icon';
import {downloadFileFromUrl} from '@common/uploads/utils/download-file-from-url';
import {CsvExportInfoDialog} from '@common/datatable/csv-export/csv-export-info-dialog';
import {CreateMultipleLinksDialog} from '@app/dashboard/links/dialogs/create-multiple-links-dialog';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {prefetchLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

interface LinksDatablePageProps {
  forCurrentUser?: boolean;
}
export function LinksDatablePage({forCurrentUser}: LinksDatablePageProps) {
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? linksDatatableColumns
      : linksDatatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? LinksDatatableFilters
      : LinksDatatableFilters.filter(filter => filter.key !== 'user_id');

    return {filters, columns};
  }, [forCurrentUser]);

  const userId = forCurrentUser ? user?.id : '';

  useEffect(() => {
    prefetchLinkFormValueLists();
  }, []);

  return (
    <DataTablePage
      endpoint="link"
      queryParams={{userId, workspaceId, with: 'user'}}
      title={<Trans message="Links" />}
      filters={filters}
      columns={columns}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="link" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={shareLink}
          title={<Trans message="No links have been created yet" />}
          filteringTitle={<Trans message="No matching links" />}
        />
      }
    />
  );
}

function Actions() {
  const [activeDialog, setActiveDialog] = useState<
    'export' | 'addMultiple' | null
  >(null);
  const exportCsv = useExportCsv('link/csv/export');

  return (
    <Fragment>
      <MenuTrigger>
        <IconButton
          variant="outline"
          color="primary"
          radius="rounded"
          size="sm"
          className="flex-shrink-0"
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu>
          <Item
            value="addMultiple"
            startIcon={<AddLinkIcon />}
            onSelected={() => {
              setActiveDialog('addMultiple');
            }}
          >
            <Trans message="Shorten multiple links" />
          </Item>
          <Item
            value="export"
            startIcon={<ExportCsvIcon />}
            onSelected={() => {
              exportCsv.mutate(
                {},
                {
                  onSuccess: response => {
                    if (response.downloadPath) {
                      downloadFileFromUrl(response.downloadPath);
                    } else {
                      setActiveDialog('export');
                    }
                  },
                }
              );
            }}
          >
            <Trans message="Export links" />
          </Item>
        </Menu>
      </MenuTrigger>
      <DialogTrigger
        type="modal"
        isOpen={activeDialog !== null}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setActiveDialog(null);
          }
        }}
      >
        {activeDialog === 'export' && <CsvExportInfoDialog />}
        {activeDialog === 'addMultiple' && <CreateMultipleLinksDialog />}
      </DialogTrigger>
      <PermissionAwareButton resource="link" action="create">
        <DialogTrigger type="modal">
          <DataTableAddItemButton>
            <Trans message="Shorten link" />
          </DataTableAddItemButton>
          <CreateLinkDialog />
        </DialogTrigger>
      </PermissionAwareButton>
    </Fragment>
  );
}
