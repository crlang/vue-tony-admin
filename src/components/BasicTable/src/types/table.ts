import type { FormActionType, FormProps } from '@/components/Form'
import type { ElePagination, EleTable, EleTableColumn } from '@/components/ElementPlus'

import { RoleEnum } from '@/enums/roleEnum'
import { ActionItem } from './tableAction'

export declare type SortOrder = 'ascend' | 'descend';

export interface TableCustomRecord<T = Recordable> {
  record?: T;
  index?: number;
}

export interface SorterResult {
  column: EleTableColumn;
  order: SortOrder;
  field: string;
  columnKey: string;
}

export interface FetchParams {
  searchInfo?: Recordable;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  ignoreCheckbox?: boolean;
  ignoreExpand?: boolean;
  sort?: boolean;
}

export interface TableActionType {
  // Element Plus
  clearSelection: () => void;
  toggleRowSelection: (row:any, selected:boolean) => void;
  toggleAllSelection: () => void;
  toggleRowExpansion: (row:any, expanded:boolean) => void;
  setCurrentRow: (row:any) => void;
  clearSort: () => void;
  clearFilter: (columnKeys:string[]) => void;
  doLayout: () => void;
  sort: (prop: string, order: string) => void;
  // Advanced
  reload: (opt?: FetchParams) => Promise<void>;
  setProps: (props: Partial<BasicTableProps>) => void;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | string[]) => void;
  setLoading: (loading: boolean) => void;
  getDataSource: <T = Recordable>() => T[];
  getRawDataSource: <T = Recordable>() => T;
  setTableData: <T = Recordable>(values: T[]) => void;
  getCacheColumns: () => BasicColumn[];
  redoHeight: () => void;
  setPagination: (info: Partial<ElePagination>) => void;
  getPagination: () => Partial<ElePagination> | boolean;
  getFormRef: () => FormActionType;
  expandAll: () => void;
  collapseAll: () => void;
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
  deleteTableDataRecord: (record: Recordable | Recordable[]) => Recordable | void;
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void;
  findTableDataRecord: (rowKey: string | number) => Recordable | void;
  updateTableData: (index: number, key: string, value: any) => Recordable;

  emit?: EmitType;
}

export interface FetchSetting {
  // Request the current page number of the interface
  pageField: string;
  // How many lines to display per page
  sizeField: string;
  // Request result list fields support a.b.c
  listField: string;
  // Request Results Total Field Support a.b.c
  totalField: string;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}

export interface BasicTableProps extends EleTable {
  dataSource?: Recordable[];
  columns: BasicColumn[];
  api?: (...arg: any) => Promise<any>;
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  autoCreateKey?: boolean;
  beforeFetch?: Fn;
  afterFetch?: Fn;
  handleSearchInfoFn?: Fn;
  fetchSetting?: Partial<FetchSetting>;
  immediate?: boolean;
  searchInfo?: Recordable;
  useSearchForm?: boolean;
  formConfig?: Partial<FormProps>;
  showIndexColumn?: boolean;
  showCheckboxColumn?: boolean;
  canResize?: boolean;
  title?: string | ((data: Recordable) => string);
  titleHelpMessage?: string | string[];
  pagination?: Partial<ElePagination> | boolean;
  loading?: boolean;
  childrenColumnName?: string;
  onColumnsChange?: (data) => void;

  // element plus basic event
  onSelect?: (selection, row) => void;
  onSelectAll?: (selection) => void;
  onSelectionChange?: (selection) => void;
  onCellMouseEnter?: (row, column, cell, event) => void;
  onCellMouseLeave?: (row, column, cell, event) => void;
  onCellClick?: (row, column, cell, event) => void;
  onCellDblclick?: (row, column, cell, event) => void;
  onCellContextmenu?: (row, column, cell, event) => void;
  onRowClick?: (row, column, event) => void;
  onRowContextmenu?: (row, column, event) => void;
  onRowDblclick?: (row, column, event) => void;
  onHeaderClick?: (column, event) => void;
  onHeaderContextmenu?: (column, event) => void;
  onSortChange?: ({ column, prop, order }) => void;
  onFilterChange?: (filters) => void;
  onCurrentChange?: (currentRow, oldCurrentRow) => void;
  onHeaderDragend?: (newWidth, oldWidth, column, event) => void;
  onExpandChange?: (row, expandedRows_or_expanded) => void;
}

interface tableColumnRenderInfo {
  text: string
  index: number
  record: Record
}

export type tableColumnRender = {
  info: tableColumnRenderInfo
  scope:object
  column: object
}

export interface BasicColumn extends EleTableColumn {
  children?: BasicColumn[];
  isSlot?: boolean;
  defaultHidden?: boolean;
  customRender?: (record: tableColumnRender) => Promise;
  actions?: ActionItem[];
  auth?: RoleEnum | RoleEnum[] | string | string[];
  ifShow?: boolean;
}

export type ColumnChangeParam = {
  prop: string;
  fixed: boolean | 'left' | 'right' | undefined;
  visible: boolean;
};
