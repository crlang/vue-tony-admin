/**
 * 请求结果配置
 */
export enum ResultEnum {
  /**
   * 成功
   */
  SUCCESS = 0,
  /**
   * 错误
   */
  ERROR = 1,
  /**
   * 超时
   */
  TIMEOUT = 401,
  /**
   * 回调类型
   */
  TYPE = 'success',
}

/**
 * 请求的方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * 请求上下文类型
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
