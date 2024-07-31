import type { ElePagination } from '@/components/ElementPlus'

export type ListTypes = 'card' | 'list'

export interface BasicListProps {
  /**
   * 表格数据源，当存在 api 函数时，可为空
   */
  dataSource?: Recordable[]
  /**
   * api 函数，请求后台数据
   */
  api?: AnyFunction
  /**
   * 接口结果字段匹配
   */
  fetchSetting?: Partial<FetchConfigs>
  /**
   * 是否自动创建key
   */
  autoCreateKey?: boolean
  /**
   * 分页导航配置
   */
  pagination?: Partial<ElePagination> | boolean
  /**
   * 是否加载状态
   */
  loading?: boolean
}

/**
 * 请求响应字段匹配设置，支持多重嵌套，如 a.b.c
 */
export interface FetchConfigs {
  /**
   * 请求结果的页码字段
   */
  pageField: string
  /**
   * 请求结果的页码大小字段
   */
  sizeField: string
  /**
   * 请求结果的列表字段
   */
  listField: string
  /**
   * 请求结果的总数字段
   */
  totalField: string
}
