import componentSetting from '@/settings/componentSetting'

const { list } = componentSetting

/**
 * 默认 rowKey
 */
export const ROW_KEY = 'key'

/**
 * 内容对齐方式
 */
export const COLUMN_POSITION_ALIGN = list.defaultColumnAlign || 'left'

/**
 * 每页显示数量选项
 */
export const PAGE_SIZE_OPTIONS = list.pageSizeOptions

/**
 * 分页布局
 */
export const PAGE_LAYOUT_OPTIONS = list.pageLayoutOptions

/**
 * 分页页码
 */
export const PAGE_SIZE = list.defaultPageSize

/**
 * 分页对齐位置
 */
export const PAGE_POSITION_ALIGN = list.defaultPageAlign || 'left'

/**
 * 接口响应数据的字段
 */
export const FETCH_SETTING = list.fetchSetting

/**
 * 表格排序数据的过滤方法
 */
export const DEFAULT_SORT_FN = list.defaultSortFn
