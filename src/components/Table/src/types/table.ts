import type { VNodeChild } from 'vue'
import type { FormActionType, FormProps } from '@/components/Form'
import type { ElePagination, EleTable, EleTableColumn } from '@/components/ElementPlus'
export type ElTableColumnType = InstanceType<typeof ElTableColumn>
import type { ComponentType } from './componentType'
import type { ComponentSize } from '@/utils/types'

import { RoleEnum } from '@/enums/roleEnum'

import { ElTableColumn } from 'element-plus'
import { ActionItem } from './tableAction'

export declare type SortOrder = 'ascend' | 'descend';

export interface TableCustomRecord<T = Recordable> {
  record?: T;
  index?: number;
}

export interface SorterResult {
  column: ElTableColumnType;
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
  // 拓展
  /**
   * 重载
   */
  reload: (opt?: FetchParams) => Promise<void>;
  /**
   * 设置 props
   */
  setProps: (props: Partial<BasicTableProps>) => void;
  /**
   * 获取列
   */
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  /**
   * 设置列
   */
  setColumns: (columns: BasicColumn[] | string[]) => void;
  /**
   * 设置loading状态
   */
  setLoading: (loading: boolean) => void;
  /**
   * 获取表格数据
   */
  getDataSource: <T = Recordable>() => T[];
  /**
   * 获取接口数据
   */
  getRawDataSource: <T = Recordable>() => T;
  /**
   * 设置表格数据
   */
  setTableData: <T = Recordable>(values: T[]) => void;
  /**
   * 获取缓存列
   */
  getCacheColumns: () => BasicColumn[];
  /**
   * 刷新表格高度
   */
  redoHeight: () => void;
  /**
   * 设置分页
   */
  setPagination: (info: Partial<ElePagination>) => void;
  /**
   * 获取分页
   */
  getPagination: () => Partial<ElePagination> | boolean;
  /**
   * 获取表单
   */
  getFormRef: () => FormActionType;
  /**
   * 展开所有Tree表格项
   */
  expandAll: () => void;
  /**
   * 收起所有Tree表格项
   */
  collapseAll: () => void;
  /**
   * 更新记录
   */
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
  /**
   * 删除记录
   */
  deleteTableDataRecord: (record: Recordable | Recordable[]) => Recordable | void;
  /**
   * 插入记录
   */
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void;
  /**
   * 查找记录
   */
  findTableDataRecord: (rowKey: string | number) => Recordable | void;
  /**
   * 更新表格数据
   */
  updateTableData: (index: number, key: string, value: any) => Recordable;

  emit?: EmitType;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}

export interface BasicTableProps extends EleTable {
  // 点击行选中
  clickToRowSelect?: boolean;
  // 自定义排序方法
  // sortFn?: (sortInfo: SorterResult) => any;
  // 排序方法
  // filterFn?: (data: Partial<Recordable<string[]>>) => any;
  // 取消表格的默认padding
  inset?: boolean;
  // 显示表格设置
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  // 斑马纹
  striped?: boolean;
  // 是否自动生成key
  autoCreateKey?: boolean;
  // 计算合计行的方法
  summaryFunc?: (...arg: any) => Recordable[];
  // 自定义合计表格内容
  summaryData?: Recordable[];
  // 是否显示合计行
  showSummary?: boolean;
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  // 请求之前处理参数
  beforeFetch?: Fn;
  // 自定义处理接口返回参数
  afterFetch?: Fn;
  // 查询条件请求之前处理
  handleSearchInfoFn?: Fn;
  // 请求接口配置
  fetchSetting?: Partial<FetchSetting>;
  // 立即请求接口
  immediate?: boolean;
  // 在开起搜索表单的时候，如果没有数据是否显示表格
  emptyDataIsShowTable?: boolean;
  // 额外的请求参数
  searchInfo?: Recordable;
  // 使用搜索表单
  useSearchForm?: boolean;
  // 表单配置
  formConfig?: Partial<FormProps>;
  // 列配置
  columns: BasicColumn[];
  // 是否显示序号列
  showIndexColumn?: boolean;
  actionColumn?: BasicColumn;
  // 是否显示序号列
  showCheckboxColumn?: boolean;
  // 文本超过宽度是否显示。。。
  ellipsis?: boolean;
  // 是否可以自适应高度
  canResize?: boolean;
  // 自适应高度偏移， 计算结果-偏移量
  resizeHeightOffset?: number;
  //
  rowKey?: string | ((record: Recordable) => string);
  // 数据
  dataSource?: Recordable[];
  // data?: Recordable[];
  // 标题右侧提示
  titleHelpMessage?: string | string[];
  // 表格滚动最大高度
  maxHeight?: number;
  // 分页配置
  pagination?: Partial<ElePagination> | boolean;
  // loading加载
  loading?: boolean;
  scroll?: { x?: number | true; y?: number };
  /**
   * The column contains children to display
   * @default 'children'
   * @type string | string[]
   */
  childrenColumnName?: string;

  /**
   * Override default table elements
   * @type object
   */
  components?: object;

  /**
   * Expand all rows initially
   * @default false
   * @type boolean
   */
  defaultExpandAllRows?: boolean;

  /**
   * Initial expanded row keys
   * @type string[]
   */
  defaultExpandedRowKeys?: string[];

  /**
   * Current expanded row keys
   * @type string[]
   */
  expandedRowKeys?: string[];

  /**
   * Whether to expand row by clicking anywhere in the whole row
   * @default false
   * @type boolean
   */
  expandRowByClick?: boolean;

  /**
   * i18n text including filter, sort, empty text, etc
   * @default { filterConfirm: 'Ok', filterReset: 'Reset', emptyText: 'No Data' }
   * @type object
   */
  locale?: object;

  /**
   * Whether to show table header
   * @default true
   * @type boolean
   */
  showHeader?: boolean;

  /**
   * Size of table
   * @default ''
   * @type string
   */
  size?: ComponentSize;

  /**
   * Table title renderer
   * @type Function | ScopedSlot
   */
  title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string);

  /**
   * Callback executed before editable cell submit value, not for row-editor
   *
   * The cell will not submit data while callback return false
   */
  beforeEditSubmit?: (data: {
    record: Recordable;
    index: number;
    key: string;
    value: any;
  }) => Promise<any>;

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

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

export type tableColumnRender = {
  row:object
  column: object
  $index:number
}

export interface BasicColumn extends EleTableColumn {
  children?: BasicColumn[];

  isSlot?: boolean;

  // Whether to hide the column by default, it can be displayed in the column configuration
  defaultHidden?: boolean;

  // Help text for table column header
  helpMessage?: string | string[];

  format?: CellFormat;

  customRender?: (record: tableColumnRender) => Promise;

  actions?: ActionItem[];

  // Editable
  edit?: boolean;
  editRow?: boolean;
  editable?: boolean;
  editComponent?: ComponentType;
  editComponentProps?: Recordable;
  editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  editValueMap?: (value: any) => string;
  onEditRow?: () => void;
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean;
}

export type ColumnChangeParam = {
  prop: string;
  fixed: boolean | 'left' | 'right' | undefined;
  visible: boolean;
};
