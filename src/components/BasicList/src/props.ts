import { FETCH_SETTING } from './const'
import type { FetchConfigs } from './typing'
import { ElePaginationProps } from '@/components/ElementPlus'

/**
 * 组件Props
 */
export const listProps = {
  /**
   * 表格数据源，当存在 api 函数时，可为空
   */
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  /**
   * 分页导航配置
   */
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  /**
   * api 函数，请求后台数据
   */
  api: {
    type: Function as PropType<AnyFunction>,
    default: null,
  },
  /**
   * 接口结果字段匹配
   */
  fetchSetting: {
    type: Object as PropType<FetchConfigs>,
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
   * 是否立即请求
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 搜索时的参数过滤
   */
  // searchFn: {
  //   type: Function as PropType<(data: Recordable) => any>,
  //   default: null,
  // },
  /**
   * 额外的搜索参数
   */
  // searchInfo: {
  //   type: Object as PropType<Recordable>,
  //   default: null,
  // },
  /**
   * 是否使用搜索表单
   */
  // useSearchForm: { type: Boolean },
  /**
   * 搜索表单配置
   */
  // formConfig: {
  //   type: Object as PropType<Partial<BasicFormProps>>,
  //   default: null,
  // },
  /**
   * 是否显示盒子阴影
   */
  isShadow: Boolean,
  /**
   * 是否加载状态
   */
  loading: Boolean,
}

export const itemProps = {
  /**
   * 缩略图
   */
  thumb: {
    type: String,
    default: '',
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 描述
   */
  description: {
    type: String,
    default: '',
  },
}

/**
 * 分页Props
 */
export const paginationProps = {
  ...ElePaginationProps,
  prefixCls: String,
}
