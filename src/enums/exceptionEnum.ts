/**
 * 常用异常错误代码
 */
export enum ExceptionEnum {
  /**
   * 页面未授权
   */
  PAGE_NOT_ACCESS = 403,

  /**
   * 页面不存在
   */
  PAGE_NOT_FOUND = 404,

  /**
   * 服务器繁忙
   */
  ERROR = 500,

  /**
   * 网络繁忙
   */
  NET_WORK_ERROR = 10000,

  /**
   * 页面上没有数据。事实上，这不是一个异常页面
   */
  PAGE_NOT_DATA = 10100,
}

/**
 * 日志错误类型
 */
export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
