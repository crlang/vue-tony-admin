import type { ElePagination, EleTable, EleTableColumn, EleButton } from '@/components/ElementPlus'
import type { FormActionType, FormProps } from '@/components/Form'
import type { MessageBoxOptions } from '@/hooks/web/useMessage'

import { RoleEnum } from '@/enums/roleEnum'

export declare type SortOrder = 'ascend' | 'descend'

export interface TableCustomRecord<T = Recordable> {
  record?: T
  index?: number
}

export interface SorterResult {
  column: EleTableColumn
  order: SortOrder
  field: string
  columnKey: string
}

export interface FetchParams {
  searchInfo?: Recordable
  sortInfo?: Recordable
  filterInfo?: Recordable
}

export interface GetColumnsParams {
  ignoreIndex?: boolean
  ignoreAction?: boolean
  ignoreCheckbox?: boolean
  ignoreExpand?: boolean
  sort?: boolean
}

export interface TableActionType {
  // Element Plus
  clearSelection: () => void
  toggleRowSelection: (row: any, selected: boolean) => void
  toggleAllSelection: () => void
  toggleRowExpansion: (row: any, expanded: boolean) => void
  setCurrentRow: (row: any) => void
  clearSort: () => void
  clearFilter: (columnKeys: string[]) => void
  doLayout: () => void
  sort: (prop: string, order: string) => void
  // Advanced
  reload: (opt?: FetchParams) => Promise<void>
  setTableProps: (props: Partial<BasicTableProps>) => void
  getColumns: (opt?: GetColumnsParams) => BasicColumn[]
  setColumns: (columns: BasicColumn[] | string[]) => void
  setLoading: (loading: boolean) => void
  getDataSource: <T = Recordable>() => T[]
  getRawDataSource: <T = Recordable>() => T
  setTableData: <T = Recordable>(values: T[]) => void
  getCacheColumns: () => BasicColumn[]
  redoHeight: () => void
  setPagination: (info: Partial<ElePagination>) => void
  getPagination: () => Partial<ElePagination> | boolean
  getFormRef: () => FormActionType
  expandAll: () => void
  collapseAll: () => void
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void
  deleteTableDataRecord: (record: Recordable | Recordable[]) => Recordable | void
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void
  findTableDataRecord: (rowKey: string | number) => Recordable | void
  updateTableData: (index: number, key: string, value: any) => Recordable

  emit?: EmitType
}

export interface FetchSetting {
  // Request the current page number of the interface
  pageField: string
  // How many lines to display per page
  sizeField: string
  // Request result list fields support a.b.c
  listField: string
  // Request Results Total Field Support a.b.c
  totalField: string
}

export interface TableSetting {
  redo?: boolean
  size?: boolean
  setting?: boolean
  fullScreen?: boolean
}

export interface BasicTableProps extends EleTable {
  // header
  title?: string
  titleHelpMessage?: string | string[]
  showTableSetting?: boolean
  tableSetting?: TableSetting
  onColumnsChange?: (data) => void

  dataSource?: Recordable[]
  columns: BasicColumn[]
  api?: (...arg: any) => Promise<any>
  autoCreateKey?: boolean
  beforeFetch?: Fn
  afterFetch?: Fn
  handleSearchInfoFn?: Fn
  fetchSetting?: Partial<FetchSetting>
  immediate?: boolean
  searchInfo?: Recordable
  useSearchForm?: boolean
  formConfig?: Partial<FormProps>
  showIndexColumn?: boolean
  showCheckboxColumn?: boolean
  canResize?: boolean
  pagination?: Partial<ElePagination> | boolean
  loading?: boolean
  childrenColumnName?: string

  // element plus basic event
  onSelect?: (selection, row) => void
  onSelectAll?: (selection) => void
  onSelectionChange?: (selection) => void
  onCellMouseEnter?: (row, column, cell, event) => void
  onCellMouseLeave?: (row, column, cell, event) => void
  onCellClick?: (row, column, cell, event) => void
  onCellDblclick?: (row, column, cell, event) => void
  onCellContextmenu?: (row, column, cell, event) => void
  onRowClick?: (row, column, event) => void
  onRowContextmenu?: (row, column, event) => void
  onRowDblclick?: (row, column, event) => void
  onHeaderClick?: (column, event) => void
  onHeaderContextmenu?: (column, event) => void
  onSortChange?: ({ column, prop, order }) => void
  onFilterChange?: (filters) => void
  onCurrentChange?: (currentRow, oldCurrentRow) => void
  onHeaderDragend?: (newWidth, oldWidth, column, event) => void
  onExpandChange?: (row, expandedRows_or_expanded) => void
}

/**
 * 继承官方自带的数据
 *
 * Inherit official data
 */
export interface scopeInfo {
  /**
   * 所在行
   *
   * Current column
   */
  row: Record
  /**
   * 所在列
   *
   * Current column
   */
  column: EleTableColumn
  /**
   * 所在索引
   *
   * Current index
   */
  $index: number
}

/**
 * 自定义渲染函数的返回数据
 *
 * Return data of custom rendering function
 */
export interface tableColumnRender {
  /**
   * 当前的内容
   *
   * Current content
   */
  text: string
  /**
   * 当前所在索引
   *
   * Current index
   */
  index: number
  /**
   * 当前行的数据
   *
   * Data of the current row
   */
  record: Record
  /**
   * 继承官方内容，内容为当前行(row)，当前列(column)，当前索引($index)
   *
   * Inherit the official content, exist row/column/$index
   */
  scope: scopeInfo
  /**
   * 当前列的数据
   *
   * Current column data
   */
  column: BasicColumn
}

export interface ActionItem extends EleButton {
  text?: string
  svgName?: string
  callback?: (info: scopeInfo) => void
  popConfirm?: MessageBoxOptions
  buttonOptions?: EleButton
  // Whether the permission code control is displayed
  auth?: RoleEnum | RoleEnum[] | string | string[]
  // Whether the business control is displayed
  ifShow?: boolean | ((action: ActionItem) => boolean)
}

/**
 *
 */
export interface BasicColumn extends EleTableColumn {
  children?: BasicColumn[]
  isSlot?: boolean
  defaultHidden?: boolean
  customRender?: (info: tableColumnRender) => void
  actions?: ActionItem[]
  auth?: RoleEnum | RoleEnum[] | string | string[]
  ifShow?: boolean
}

export type ColumnChangeParam = {
  prop: string
  fixed: boolean | 'left' | 'right' | undefined
  visible: boolean
}
