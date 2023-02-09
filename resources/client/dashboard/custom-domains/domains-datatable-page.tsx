import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import React, {useMemo} from 'react';
import {DomainsEmptyStateMessage} from '@common/custom-domains/datatable/domains-empty-state-message';
import {domainsDatatableColumns} from '@common/custom-domains/datatable/domains-datatable-columns';
import {DomainsDatatableFilters} from '@common/custom-domains/datatable/domains-datatable-filters';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ConnectDomainDialog} from '@common/custom-domains/datatable/connect-domain-dialog/connect-domain-dialog';
import {useAuth} from '@common/auth/use-auth';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {DeleteDomainButton} from '@common/custom-domains/datatable/delete-domain-button';
import {CustomDomain} from '@common/custom-domains/custom-domain';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';

const datatableColumns = domainsDatatableColumns.map(col => {
  if (col.key === 'actions') {
    return {
      ...col,
      body: (domain: CustomDomain) => (
        <PermissionAwareButton resource={domain} action="delete">
          <DeleteDomainButton domain={domain} />
        </PermissionAwareButton>
      ),
    };
  }
  return col;
});

interface DomainsDatatablePageProps {
  forCurrentUser?: boolean;
}
export function DomainsDatatablePage({
  forCurrentUser,
}: DomainsDatatablePageProps) {
  const {user} = useAuth();
  const {workspaceId} = useActiveWorkspaceId();
  const {filters, columns} = useMemo(() => {
    const columns = !forCurrentUser
      ? datatableColumns
      : datatableColumns.filter(col => col.key !== 'user_id');

    const filters = !forCurrentUser
      ? DomainsDatatableFilters
      : DomainsDatatableFilters.filter(filter => filter.key !== 'user_id');

    return {filters, columns};
  }, [forCurrentUser]);

  const userId = forCurrentUser ? user?.id : '';

  return (
    <DataTablePage
      enableSelection={false}
      endpoint="custom-domain"
      queryParams={{userId, workspaceId, with: 'user'}}
      title={<Trans message="Branded domains" />}
      headerContent={<InfoTrigger />}
      filters={filters}
      columns={columns}
      actions={<Actions />}
      emptyStateMessage={<DomainsEmptyStateMessage />}
    />
  );
}

function Actions() {
  const {hasPermission} = useAuth();
  return (
    <PermissionAwareButton resource="customDomain" action="create">
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="Connect domain" />
        </DataTableAddItemButton>
        <ConnectDomainDialog showGlobalField={hasPermission('admin')} />
      </DialogTrigger>
    </PermissionAwareButton>
  );
}

function InfoTrigger() {
  return (
    <InfoDialogTrigger
      body={
        <Trans message="Create trusted links with your own branded domains. Once connected, you can set the domain as default or only use it for specific links." />
      }
    />
  );
}
