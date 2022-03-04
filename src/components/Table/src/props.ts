import type {
  BasicColumn,
  FetchSetting,
  TableSetting,
  // SorterResult,
  // TableCustomRecord
} from './types/table'
import type { FormProps } from '@/components/Form'
import type { ElePagination } from '@/components/ElementPlus'

import { FETCH_SETTING } from './const'
import { propTypes } from '@/utils/propTypes'

export const basicProps = {
  clickToRowSelect: propTypes.bool.def(true),
  tableSetting: propTypes.shape<TableSetting>({}),
  inset: propTypes.bool,
  // sortFn: {
  //   type: Function as PropType<(sortInfo: SorterResult) => any>,
  //   default: DEFAULT_SORT_FN
  // },
  // filterFn: {
  //   type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
  //   default: DEFAULT_FILTER_FN
  // },
  showTableSetting: propTypes.bool,
  autoCreateKey: propTypes.bool.def(true),
  striped: propTypes.bool.def(true),
  showSummary: propTypes.bool,
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null,
  },
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  indentSize: propTypes.number.def(24),
  canColDrag: propTypes.bool.def(true),
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
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
  // 立即请求接口
  immediate: propTypes.bool.def(true),
  emptyDataIsShowTable: propTypes.bool.def(true),
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  // 使用搜索表单
  useSearchForm: propTypes.bool,
  // 表单配置
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null,
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
  showIndexColumn: propTypes.bool.def(false),
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  showCheckboxColumn: propTypes.bool.def(false),
  ellipsis: propTypes.bool.def(true),
  clearSelectOnPageChange: propTypes.bool,
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
  maxHeight: propTypes.number,
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: Recordable) => string)>,
    default: '',
  },
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  loading: propTypes.bool,
  beforeEditSubmit: {
    type: Function as PropType<
    (data: {
      record: Recordable;
      index: number;
      key: string;
      value: any;
    }) => Promise<any>
    >,
  },
  canResize: Boolean,
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
