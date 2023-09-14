import { ElePagination } from '@/components/ElementPlus';

export type ListTypes = 'card' | 'list';

export interface BasicListProps {
  /**
   * 表格数据源，当存在 api 函数时，可为空
   *
   * Table data source, nullable when there is an api function
   */
  dataSource?: Recordable[];
  /**
   * api 函数，请求后台数据
   *
   * api function, requesting data from the server
   */
  api?: AnyFunction;
  /**
   * 接口结果字段匹配
   *
   * Interface result field match
   */
  fetchSetting?: Partial<FetchConfigs>;
  /**
   * 是否自动创建key
   *
   * Whether to automatically create a key
   */
  autoCreateKey?: boolean;
  /**
   * 分页导航配置
   *
   * Pagination Configuration
   */
  pagination?: Partial<ElePagination> | boolean;
  /**
   * 是否加载状态
   *
   * Whether the status is being loaded
   */
  loading?: boolean;
}

/**
 * 请求响应字段匹配设置，支持多重嵌套，如 a.b.c
 *
 * Request response field matching configs, support multiple nesting, such as a.b.c
 */
export interface FetchConfigs {
  /**
   * 请求结果的页码字段
   *
   * Page field for request result
   */
  pageField: string;
  /**
   * 请求结果的页码大小字段
   *
   * Size field for request result
   */
  sizeField: string;
  /**
   * 请求结果的列表字段
   *
   * List field for request result
   */
  listField: string;
  /**
   * 请求结果的总数字段
   *
   * Total field for request result
   */
  totalField: string;
}
