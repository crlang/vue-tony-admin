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
  /**
   * 表格数据
   */
  dataSource?: Recordable[];
  /**
   * 列配置
   */
  columns: BasicColumn[];
  /**
   * 接口请求对象
   */
  api?: (...arg: any) => Promise<any>;
  /**
   * 显示表格配置
   */
  showTableSetting?: boolean;
  /**
   * 表格配置内容
   */
  tableSetting?: TableSetting;
  /**
   * 是否自动生成key
   */
  autoCreateKey?: boolean;
  /**
   * 请求之前处理参数
   */
  beforeFetch?: Fn;
  /**
   * 自定义处理接口返回参数
   */
  afterFetch?: Fn;
  /**
   * 查询条件请求之前处理
   */
  handleSearchInfoFn?: Fn;
  /**
   * 请求接口配置
   */
  fetchSetting?: Partial<FetchSetting>;
  /**
   * 立即请求接口
   */
  immediate?: boolean;
  /**
   * 额外的请求参数
   */
  searchInfo?: Recordable;
  /**
   * 使用搜索表单
   */
  useSearchForm?: boolean;
  /**
   * 表单配置
   */
  formConfig?: Partial<FormProps>;
  /**
   * 是否显示序号列
   */
  showIndexColumn?: boolean;
  /**
   * 是否显示选择列
   */
  showCheckboxColumn?: boolean;
  /**
   * 是否自适应高度
   */
  canResize?: boolean;
  /**
   * 表格标题
   */
  title?: string | ((data: Recordable) => string);
  /**
   * 标题右侧提示
   */
  titleHelpMessage?: string | string[];
  /**
   * 分页配置，配置参考 ElPagination
   */
  pagination?: Partial<ElePagination> | boolean;
  /**
   * 是否loading状态
   */
  loading?: boolean;
  /**
   * 子类名称
   */
  childrenColumnName?: string;
  /**
   * 列改变时触发
   */
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
  /**
   * 子列
   */
  children?: BasicColumn[];
  /**
   * 是否 slot 模式，如果是将会以 prop 为键值返回内容
   */
  isSlot?: boolean;
  /**
   * 默认情况下是否隐藏列
   *
   * Whether to hide the column by default
   */
  defaultHidden?: boolean;
  /**
   * 自定义列
   */
  customRender?: (record: tableColumnRender) => Promise;
  /**
   * 操作列
   */
  actions?: ActionItem[];
  /**
   * 权限编码控制是否显示
   */
  auth?: RoleEnum | RoleEnum[] | string | string[];
  /**
   * 业务控制是否显示
   */
  ifShow?: boolean;
}

export type ColumnChangeParam = {
  prop: string;
  fixed: boolean | 'left' | 'right' | undefined;
  visible: boolean;
};
