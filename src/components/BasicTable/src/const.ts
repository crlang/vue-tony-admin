import componentSetting from '@/settings/componentSetting'

const { table } = componentSetting

/**
 * 默认 rowKey
 */
export const ROW_KEY = 'key'

/**
 * 内容对齐方式
 */
export const COLUMN_POSITION_ALIGN = table.defaultColumnAlign || 'left'

/**
 * 每页显示数量选项
 */
export const PAGE_SIZE_OPTIONS = table.pageSizeOptions

/**
 * 分页布局
 */
export const PAGE_LAYOUT_OPTIONS = table.pageLayoutOptions

/**
 * 分页页码
 */
export const PAGE_SIZE = table.defaultPageSize

/**
 * 分页对齐位置
 */
export const PAGE_POSITION_ALIGN = table.defaultPageAlign || 'left'

/**
 * 接口响应数据的字段
 */
export const FETCH_SETTING = table.fetchSetting

/**
 * 表格排序数据的过滤方法
 */
export const DEFAULT_SORT_FN = table.defaultSortFn

/**
 * 表格筛选数据的过滤方法
 */
export const DEFAULT_FILTER_FN = table.defaultFilterFn
