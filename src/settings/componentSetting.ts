import type { ColumnSorterResult } from '../components/BasicTable'

/**
 * 用于在不修改组件的情况下配置部分组件的通用配置
 */
export default {
  /**
   * 表格组件的配置
   */
  table: {
    /**
     * 内容区的对齐方式，可选 'left/center/right'
     */
    defaultColumnAlign: 'left',
    /**
     * 请求接口的相关字段，支持嵌套格式 xxx.xxx.xxx
     */
    fetchSetting: {
      /**
       * 服务端接收的页码参数字段
       */
      currentPageField: 'page',
      /**
       * 服务端接收的分页大小参数字段
       */
      currentSizeField: 'pageSize',
      /**
       * 服务端返回的页码字段，可能存在嵌套模式，如 'data.page'
       */
      pageField: 'current_page',
      /**
       * 服务端返回的分页大小字段，可能存在嵌套模式，如 'data.pageSize'
       */
      sizeField: 'page_size',
      /**
       * 服务端返回的列表字段，可能存在嵌套模式，如 'data.list'
       */
      listField: 'data',
      /**
       * 服务端返回的数据总数字段，可能存在嵌套模式，如 'data.totalRow'
       */
      totalField: 'total',
    },
    /**
     * 分页导航的对齐方式，可选 'left/center/right'
     */
    defaultPageAlign: 'center',
    /**
     * 分页的页码大小
     */
    defaultPageSize: 20,
    /**
     * 分页导航的分页切换大小的数组
     */
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    /**
     * 根据字段显示哪些分页内容
     */
    pageLayoutOptions: 'total, prev, pager, next, jumper',
    /**
     * 默认的排序方法
     *
     * @param sortInfo ColumnSorterResult
     */
    defaultSortFn: (sortInfo: ColumnSorterResult) => {
      const { prop, order } = sortInfo
      return {
        order,
        prop,
      }
    },
    /**
     * 默认的筛选方法
     *
     * @param data
     */
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data
    },
  },
  form: {
    /**
     * 每行显示的表单项数量
     */
    defaultItemSize: 4,
    /**
     * 表单项的间隔(px)
     */
    defaultItemGutter: 16,
    /**
     * 行的列数，一般不需要修改
     */
    fullColumnSize: 24,
  },
  /**
   * 分页组件的配置
   */
  list: {
    /**
     * 内容区的对齐方式，可选 'left/center/right'
     */
    defaultColumnAlign: 'left',
    /**
     * 请求接口的相关字段，支持嵌套格式 xxx.xxx.xxx
     */
    fetchSetting: {
      /**
       * 服务端接收的页码字段
       */
      pageField: 'page',
      /**
       * 服务端接收的页码大小字段
       */
      sizeField: 'pageSize',
      /**
       * 服务端返回的列表字段，可能存在嵌套模式，如 'data.list'
       */
      listField: 'items',
      /**
       * 服务端返回的数据总数字段，可能存在嵌套模式，如 'data.totalRow'
       */
      totalField: 'total',
    },
    /**
     * 分页导航的对齐方式，可选 'left/center/right'
     */
    defaultPageAlign: 'center',
    /**
     * 分页的页码大小
     */
    defaultPageSize: 20,
    /**
     * 分页导航的分页切换大小的数组
     */
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    /**
     * 根据字段显示哪些分页内容
     */
    pageLayoutOptions: 'total, prev, pager, next, jumper',
    /**
     * 默认的排序方法
     *
     * @param sortInfo ColumnSorterResult
     */
    defaultSortFn: (sortInfo: ColumnSorterResult) => {
      const { prop, order } = sortInfo
      return {
        order,
        prop,
      }
    },
  },
  upload: {
    /**
     * 服务端返回的上传字段，可能存在嵌套模式，如 'data.url'
     */
    urlField: 'url',
  },
  /**
   * 滚动组件的配置
   */
  scrollbar: {
    /**
     * 是否使用原生滚动条
     */
    native: false,
  },
}
