import React, {ComponentPropsWithoutRef, ReactNode} from 'react';
import {BackendFilter} from './filters/backend-filter';
import {useTrans} from '../i18n/use-trans';
import {useDataTable} from './page/data-table-context';
import {TextField} from '../ui/forms/input-field/text-field/text-field';
import {SearchIcon} from '../icons/material/Search';
import {AddFilterButton} from './filters/add-filter-button';
import {Trans} from '../i18n/trans';

interface PageHeaderProps {
  actions?: ReactNode;
  filters?: BackendFilter[];
}
export function DataTableHeader({actions, filters}: PageHeaderProps) {
  const {trans} = useTrans();
  const {params, setParams, searchPlaceholder} = useDataTable();
  return (
    <HeaderLayout>
      <TextField
        inputTestId="datatable-search"
        className="flex-auto max-w-440 mr-auto"
        inputWrapperClassName="mr-24 md:mr-0"
        placeholder={trans(searchPlaceholder)}
        startAdornment={<SearchIcon />}
        value={params.query || ''}
        onChange={e => {
          setParams({...params, query: e.target.value});
        }}
      />
      {filters && <AddFilterButton filters={filters} />}
      {actions}
    </HeaderLayout>
  );
}

interface SelectedPageHeaderProps {
  actions?: ReactNode;
}
export function SelectedStateDataTableHeader({
  actions,
}: SelectedPageHeaderProps) {
  const {selectedRows} = useDataTable();
  return (
    <HeaderLayout data-testid="datatable-selected-header">
      <div className="mr-auto">
        <Trans
          message="[one 1 item|other :count items] selected"
          values={{count: selectedRows.length}}
        />
      </div>
      {actions}
    </HeaderLayout>
  );
}

interface AnimatedHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}
function HeaderLayout({children, ...domProps}: AnimatedHeaderProps) {
  return (
    <div
      className="mb-24 flex items-center gap-8 md:gap-12 text-muted relative h-42"
      {...domProps}
    >
      {children}
    </div>
  );
}
