import React, {Key, useContext} from 'react';
import {ResourcePaginationParams} from '../requests/paginated-resources';
import {MessageDescriptor} from '../../i18n/message-descriptor';
import {UseQueryResult} from '@tanstack/react-query';
import {PaginatedBackendResponse} from '../../http/backend-response/pagination-response';

export interface DataTableContextValue {
  selectedRows: Key[];
  setSelectedRows: (keys: Key[]) => void;
  endpoint: string;
  searchPlaceholder: MessageDescriptor;
  params: ResourcePaginationParams;
  setParams: (value: ResourcePaginationParams) => void;
  query: UseQueryResult<PaginatedBackendResponse<unknown>, unknown>;
}

export const DataTableContext = React.createContext<DataTableContextValue>(
  null!
);

export function useDataTable() {
  return useContext(DataTableContext);
}
