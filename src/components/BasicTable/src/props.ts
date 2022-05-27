import type {
  BasicColumn,
  FetchSetting,
  TableSetting,
  // SorterResult,
  // TableCustomRecord
} from './typing'
import type { FormProps } from '@/components/Form'
import type { ElePagination } from '@/components/ElementPlus'

import { EleTableProps, ElePaginationProps } from '@/components/ElementPlus'
import { FETCH_SETTING } from './const'

export const headerProps = {
  /**
   * 表格头部标题
   *
   * Table header title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 标题右侧的帮助提示
   *
   * Title help message
   */
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 是否显示更多设置
   *
   * Whether to show more settings
   */
  showTableSetting: Boolean,
  /**
   * 设置的选项
   *
   * Setting item
   */
  tableSetting: {
    type: Object as PropType<TableSetting>,
    default: () => {},
  },
  /**
   * 设置中列的更改时触发回调
   *
   * Trigger callback when a column in settings changes
   */
  onColumnsChange: {
    type: Function as PropType<(data) => void>,
  },
}
export const customProps = {
  ...headerProps,
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  autoCreateKey: {
    type: Boolean,
    default: true,
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null,
  },
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING
    },
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  useSearchForm: { type: Boolean },
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null,
  },
  showIndexColumn: { type: Boolean },
  showCheckboxColumn: { type: Boolean },
  canResize: { type: Boolean },
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  loading: { type: Boolean },
  childrenColumnName: {
    type: String,
    default: 'children',
  },
}

export const paginationProps = {
  ...ElePaginationProps,
  prefixCls: String,
}

export const basicProps = {
  ...EleTableProps,
  ...customProps,
}

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
