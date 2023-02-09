import {TableDataItem} from '../ui/tables/types/table-data-item';
import {UseQueryResult} from '@tanstack/react-query';
import {PaginatedBackendResponse} from '../http/backend-response/pagination-response';
import {useNumberFormatter} from '../i18n/use-number-formatter';
import {useDataTable} from './page/data-table-context';
import {Select} from '../ui/forms/select/select';
import {Trans} from '../i18n/trans';
import {Item} from '../ui/forms/listbox/item';
import {IconButton} from '../ui/buttons/icon-button';
import {KeyboardArrowLeftIcon} from '../icons/material/KeyboardArrowLeft';
import {KeyboardArrowRightIcon} from '../icons/material/KeyboardArrowRight';
import React from 'react';
import {useIsMobileMediaQuery} from '../utils/hooks/is-mobile-media-query';

const defaultPerPage = 15;
const perPageOptions = [{key: 10}, {key: 15}, {key: 20}, {key: 50}, {key: 100}];

type DataTablePaginationFooterProps<T extends TableDataItem> = {
  query: UseQueryResult<PaginatedBackendResponse<T>>;
};
export function DataTablePaginationFooter<T extends TableDataItem>({
  query,
}: DataTablePaginationFooterProps<T>) {
  const isMobile = useIsMobileMediaQuery();
  const numberFormatter = useNumberFormatter();
  const {params, setParams} = useDataTable();
  const pagination = query.data?.pagination;

  if (!pagination) return null;

  const perPageSelect = (
    <Select
      data-testid="paginate-per-page"
      minWidth="min-w-auto"
      selectionMode="single"
      disabled={query.isLoading}
      labelPosition="side"
      size="xs"
      label={<Trans message="Items per page" />}
      selectedValue={params.perPage || defaultPerPage}
      onSelectionChange={value => {
        setParams({
          ...params,
          perPage: value as number,
        });
      }}
    >
      {perPageOptions.map(option => (
        <Item key={option.key} value={option.key}>
          {option.key}
        </Item>
      ))}
    </Select>
  );

  return (
    <div className="flex items-center justify-end gap-20 px-20 h-54 select-none">
      {!isMobile && perPageSelect}
      {pagination.from && pagination.to && (
        <div
          className="text-sm"
          data-testid="pagination-info"
          data-total={pagination.total}
        >
          <Trans
            message=":from - :to of :total"
            values={{
              from: pagination.from,
              to: pagination.to,
              total: numberFormatter.format(pagination.total),
            }}
          />
        </div>
      )}
      <div className="text-muted">
        <IconButton
          data-testid="paginate-prev"
          disabled={query.isLoading || !pagination.prev_page}
          onClick={() => {
            setParams({
              ...params,
              page: pagination.prev_page!,
            });
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          data-testid="paginate-next"
          disabled={query.isLoading || !pagination.next_page}
          onClick={() => {
            setParams({
              ...params,
              page: pagination.next_page!,
            });
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
}
