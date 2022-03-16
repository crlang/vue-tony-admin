import type {
  BasicColumn,
  FetchSetting,
  TableSetting,
  // SorterResult,
  // TableCustomRecord
} from './types/table'
import type { FormProps } from '@/components/Form'
import type { ElePagination } from '@/components/ElementPlus'

import { EleTableProps } from '@/components/ElementPlus'
import { FETCH_SETTING } from './const'

export const basicProps = {
  ...EleTableProps,
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  showTableSetting: { type: Boolean },
  tableSetting: {
    type: Object as PropType<Partial<TableSetting>>,
    default: () => {},
  },
  autoCreateKey: {
    type: Boolean,
    default: true,
  },
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
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  loading: { type: Boolean },
  childrenColumnName: {
    type: String,
    default: 'children',
  },
  onColumnsChange: {
    type: Function as PropType<(data) => void>,
  },
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
