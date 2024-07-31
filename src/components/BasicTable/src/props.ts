import type { BasicColumn, ColumnSorterResult, FetchSetting, TableSetting } from './typing'
import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING } from './const'
import type { BasicFormProps } from '@/components/BasicForm'
import type { ElePagination } from '@/components/ElementPlus'

import { ElePaginationProps, EleTableProps } from '@/components/ElementPlus'

/**
 * 头部Props
 */
export const headerProps = {
  /**
   * 表格头部标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 标题右侧的帮助提示
   */
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 是否显示更多设置
   */
  showTableSetting: Boolean,
  /**
   * 设置的选项
   */
  tableSetting: {
    type: Object as PropType<TableSetting>,
    default: () => {},
  },
}

/**
 * 自定义Props
 */
export const customProps = {
  ...headerProps,
  /**
   * 表格数据源，当存在 api 函数时，可为空
   */
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  /**
   * 表格列配置
   */
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => [],
  },
  /**
   * api 函数，请求后台数据
   */
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  /**
   * 接口结果字段匹配
   */
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING
    },
  },
  /**
   * 是否自动创建key
   */
  autoCreateKey: {
    type: Boolean,
    default: true,
  },
  /**
   * 请求之前对参数进行处理
   */
  beforeFetch: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 请求之后对返回值进行处理
   */
  afterFetch: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 搜索时的参数过滤
   */
  searchFn: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 排序时的参数过滤
   */
  sortFn: {
    type: Function as PropType<(sortInfo: ColumnSorterResult) => any>,
    default: DEFAULT_SORT_FN,
  },
  /**
   * 筛选时的参数过滤
   */
  filterFn: {
    type: Function as PropType<(data: Recordable) => any>,
    default: DEFAULT_FILTER_FN,
  },
  /**
   * 是否立即请求
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 额外的搜索参数
   */
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 是否使用搜索表单
   */
  useSearchForm: { type: Boolean },
  /**
   * 搜索表单配置
   */
  formConfig: {
    type: Object as PropType<Partial<BasicFormProps>>,
    default: null,
  },
  /**
   * 是否显示序号列
   */
  showIndexColumn: Boolean,
  /**
   * 是否显示选择列
   */
  showCheckboxColumn: Boolean,
  /**
   * 是否自动调整表格大小
   */
  canResize: Boolean,
  /**
   * 是否显示盒子阴影
   */
  isShadow: Boolean,
  /**
   * 分页导航配置
   */
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  /**
   * 是否加载状态
   */
  loading: Boolean,
  /**
   * 子项的所在的字段名称，一般用在展开表格
   */
  childrenColumnName: {
    type: String,
    default: 'children',
  },
}

/**
 * 分页Props
 */
export const paginationProps = {
  ...ElePaginationProps,
  prefixCls: String,
}

/**
 * 组件Props
 */
export const basicProps = {
  ...EleTableProps,
  ...customProps,
}

/**
 * ElTable 自带的 emit
 */
export const ElTableBasicEmits = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
]
