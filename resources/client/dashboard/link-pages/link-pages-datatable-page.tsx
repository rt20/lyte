import {ColumnConfig} from '@common/datatable/column-config';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {CustomPageDatatableFilters} from '@common/admin/custom-pages/custom-page-datatable-filters';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {useAuth} from '@common/auth/use-auth';
import React, {Fragment, useContext, useMemo} from 'react';
import {CustomPageDatatableColumns} from '@common/admin/custom-pages/custom-page-datatable-columns';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import articlesSvg from '@common/admin/custom-pages/articles.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {LinkPageOptionsTrigger} from '@app/dashboard/link-pages/link-page-options-trigger';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';

const actionColumn: ColumnConfig<CustomPage> = {
  ...CustomPageDatatableColumns[4],
  body: page => {
    return (
      <Fragment>
        <LinkPageOptionsTrigger page={page} />
        <PermissionAwareButton resource={page} action="update">
          <Tooltip label={<Trans message="Edit page" />}>
            <IconButton
              size="md"
              className="text-muted"
              elementType={Link}
              to={`${page.id}/edit`}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </PermissionAwareButton>
      </Fragment>
    );
  },
};

const columnConfig = [
  ...CustomPageDatatableColumns.filter(
    col => col.key !== 'actions' && col.key !== 'type'
  ),
  actionColumn,
];

interface CustomPageDatablePageProps {
  forCurrentUser?: boolean;
}
export function LinkPagesDatatablePage({
  forCurrentUser,
}: CustomPageDatablePageProps) {
  const config = useContext(SiteConfigContext);
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? columnConfig
      : columnConfig.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? CustomPageDatatableFilters(config)
      : CustomPageDatatableFilters(config).filter(
          filter => filter.key !== 'user_id'
        );

    return {filters, columns};
  }, [forCurrentUser, config]);

  const userId = forCurrentUser ? user?.id : '';

  return (
    <DataTablePage
      endpoint="link-page"
      title={<Trans message="Link pages" />}
      filters={filters}
      columns={columns}
      headerContent={<InfoTrigger />}
      queryParams={{userId, with: 'user', workspaceId}}
      actions={<Actions />}
      selectedActions={
        <PermissionAwareButton resource="customPage" action="delete">
          <DeleteSelectedItemsAction />
        </PermissionAwareButton>
      }
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={articlesSvg}
          title={<Trans message="No link pages have been created yet" />}
          filteringTitle={<Trans message="No matching link pages" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <PermissionAwareButton resource="customPage" action="create">
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="New page" />
      </DataTableAddItemButton>
    </PermissionAwareButton>
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      body={
        <Trans message="Show a transitional page with fully custom markup. Users who visit the short url will briefly see the page before being redirected to destination url." />
      }
    />
  );
}
