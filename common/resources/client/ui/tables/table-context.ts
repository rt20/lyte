import {createContext} from 'react';
import type {SortDescriptor} from './types/sort-descriptor';
import type {TableProps} from './table';
import type {ColumnConfig} from '../../datatable/column-config';
import type {TableDataItem} from './types/table-data-item';

export type TableSelectionStyle = 'checkbox' | 'highlight';

export interface TableContextValue<T extends TableDataItem = TableDataItem> {
  selectedRows: (string | number)[];
  onSelectionChange: (keys: (string | number)[]) => void;
  sortDescriptor?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => any;
  enableSelection?: boolean;
  selectionStyle: TableSelectionStyle;
  data: T[];
  meta?: any;
  columns: ColumnConfig<T>[];
  toggleRow: (item: T) => void;
  selectRow: (item: T | null, merge?: boolean) => void;
  onAction: TableProps<T>['onAction'];
  onRowContextMenu: TableProps<T>['onRowContextMenu'];
}
export const TableContext = createContext<TableContextValue>(null!);
