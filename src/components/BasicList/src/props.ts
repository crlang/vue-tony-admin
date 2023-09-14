import { ElePaginationProps } from '@/components/ElementPlus';
import { FETCH_SETTING } from './const';
import { FetchConfigs } from './typing';

/**
 * 组件Props
 *
 * Component props
 */
export const listProps = {
  /**
   * 表格数据源，当存在 api 函数时，可为空
   *
   * Table data source, nullable when there is an api function
   */
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  /**
   * 分页导航配置
   *
   * Pagination Configuration
   */
  pagination: {
    type: [Object, Boolean] as PropType<Partial<ElePagination> | boolean>,
    default: null,
  },
  /**
   * api 函数，请求后台数据
   *
   * api function, requesting data from the server
   */
  api: {
    type: Function as PropType<AnyFunction>,
    default: null,
  },
  /**
   * 接口结果字段匹配
   *
   * Interface result field match
   */
  fetchSetting: {
    type: Object as PropType<FetchConfigs>,
    default: () => {
      return FETCH_SETTING;
    },
  },
  /**
   * 是否自动创建key
   *
   * Whether to automatically create a key
   */
  autoCreateKey: {
    type: Boolean,
    default: true,
  },
  /**
   * 请求之前对参数进行处理
   *
   * Handle parameters before requesting
   */
  beforeFetch: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 请求之后对返回值进行处理
   *
   * Process the return value after the request
   */
  afterFetch: {
    type: Function as PropType<(data: Recordable) => any>,
    default: null,
  },
  /**
   * 是否立即请求
   *
   * whether to request now
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 搜索时的参数过滤
   *
   * Parameter filtering when searching
   */
  // searchFn: {
  //   type: Function as PropType<(data: Recordable) => any>,
  //   default: null,
  // },
  /**
   * 额外的搜索参数
   *
   * Additional search parameters
   */
  // searchInfo: {
  //   type: Object as PropType<Recordable>,
  //   default: null,
  // },
  /**
   * 是否使用搜索表单
   *
   * Whether to use a search form
   */
  // useSearchForm: { type: Boolean },
  /**
   * 搜索表单配置
   *
   * Search form configuration
   */
  // formConfig: {
  //   type: Object as PropType<Partial<BasicFormProps>>,
  //   default: null,
  // },
  /**
   * 是否显示盒子阴影
   *
   * Whether to show box shadow
   */
  isShadow: Boolean,
  /**
   * 是否加载状态
   *
   * Whether the status is being loaded
   */
  loading: Boolean,
};

export const itemProps = {
  /**
   * 缩略图
   *
   * Thumbnail url
   */
  thumb: {
    type: String,
    default: '',
  },
  /**
   * 标题
   *
   * Title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 描述
   *
   * Description
   */
  description: {
    type: String,
    default: '',
  },
};

/**
 * 分页Props
 *
 * Pagination props
 */
export const paginationProps = {
  ...ElePaginationProps,
  prefixCls: String,
};
