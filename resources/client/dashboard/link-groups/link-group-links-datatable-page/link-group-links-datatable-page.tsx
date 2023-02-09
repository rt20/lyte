import React, {Fragment, useContext, useState} from 'react';
import {Trans} from '@common/i18n/trans';
import {LinksDatatableFilters} from '@app/dashboard/links/links-datatable-page/links-datatable-filters';
import {linksDatatableColumns} from '@app/dashboard/links/links-datatable-page/links-datatable-columns';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import shareLink from '../../links/share-link.svg';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {useParams} from 'react-router-dom';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {DataTable} from '@common/datatable/data-table';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {Link} from '@app/dashboard/links/link';
import {StaticPageTitle} from '@common/seo/static-page-title';
import {CreateLinkDialog} from '@app/dashboard/links/dialogs/create-link-dialog';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Item} from '@common/ui/forms/listbox/item';
import {AddLinkIcon} from '@common/icons/material/AddLink';
import {ExportCsvIcon} from '@common/datatable/csv-export/export-csv-icon';
import {MoreHorizIcon} from '@common/icons/material/MoreHoriz';
import {MoveDownIcon} from '@common/icons/material/MoveDown';
import {useExportCsv} from '@common/datatable/requests/use-export-csv';
import {downloadFileFromUrl} from '@common/uploads/utils/download-file-from-url';
import {CsvExportInfoDialog} from '@common/datatable/csv-export/csv-export-info-dialog';
import {MoveLinksToGroupDialog} from '@app/dashboard/link-groups/link-group-links-datatable-page/move-links-to-group-dialog';
import {DataTableContext} from '@common/datatable/page/data-table-context';
import {CreateMultipleLinksDialog} from '@app/dashboard/links/dialogs/create-multiple-links-dialog';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

interface LinkGroupLinksResponse extends PaginatedBackendResponse<Link> {
  linkGroup: LinkGroup;
}

export function LinkGroupsLinksDatatablePage() {
  const {groupId} = useParams();

  return (
    <div className="p-12 md:p-24">
      <DataTable
        endpoint={`link-group/${groupId}/links`}
        filters={LinksDatatableFilters}
        columns={linksDatatableColumns}
        actions={<Actions groupId={groupId ? +groupId : undefined} />}
        selectedActions={
          <PermissionAwareButton resource="link" action="delete">
            <DeleteSelectedItemsAction />
          </PermissionAwareButton>
        }
        emptyStateMessage={
          <DataTableEmptyStateMessage
            image={shareLink}
            title={<Trans message="There are no links in this group yet" />}
            filteringTitle={<Trans message="No matching links" />}
          />
        }
      >
        <PageTitle />
      </DataTable>
    </div>
  );
}

function PageTitle() {
  const navigate = useNavigate();
  const {query} = useContext(DataTableContext);
  const linkGroup = (query.data as LinkGroupLinksResponse)?.linkGroup;

  // avoid layout shift when link group is not loaded yet
  if (!linkGroup) return <Breadcrumb size="xl" className="mb-16" />;

  const title = (
    <Trans message="“:group“ links" values={{group: linkGroup.name}} />
  );
  return (
    <Fragment>
      <StaticPageTitle>{title}</StaticPageTitle>
      <Breadcrumb size="xl" className="mb-16">
        <BreadcrumbItem
          onSelected={() => {
            navigate('/dashboard/link-groups');
          }}
        >
          <Trans message="Link groups" />
        </BreadcrumbItem>
        <BreadcrumbItem className="first-letter:capitalize">
          {title}
        </BreadcrumbItem>
      </Breadcrumb>
    </Fragment>
  );
}

interface ActionsProps {
  groupId?: number;
}
function Actions({groupId}: ActionsProps) {
  const [activeDialog, setActiveDialog] = useState<
    'move' | 'export' | 'addMultiple' | null
  >(null);
  const exportCsv = useExportCsv('link/csv/export');

  const {query} = useContext(DataTableContext);
  const linkGroup = (query.data as LinkGroupLinksResponse)?.linkGroup;

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
            value="moveLinks"
            startIcon={<MoveDownIcon />}
            onSelected={() => {
              setActiveDialog('move');
            }}
          >
            <Trans message="Move links to this group" />
          </Item>
          <Item
            value="addMultiple"
            startIcon={<AddLinkIcon />}
            onSelected={() => {
              setActiveDialog('addMultiple');
            }}
          >
            <Trans message="Add multiple links" />
          </Item>
          <Item
            value="export"
            startIcon={<ExportCsvIcon />}
            onSelected={() => {
              exportCsv.mutate(
                {groupId},
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
        {activeDialog === 'move' && (
          <MoveLinksToGroupDialog group={linkGroup} />
        )}
        {activeDialog === 'export' && <CsvExportInfoDialog />}
        {activeDialog === 'addMultiple' && (
          <CreateMultipleLinksDialog group={linkGroup} />
        )}
      </DialogTrigger>
      <PermissionAwareButton resource="link" action="create">
        <DialogTrigger type="modal">
          <DataTableAddItemButton>
            <Trans message="Add link" />
          </DataTableAddItemButton>
          <CreateLinkDialog group={linkGroup} />
        </DialogTrigger>
      </PermissionAwareButton>
    </Fragment>
  );
}
