/**
 * 最小分页参数单位
 */
export interface BaseParamsList {
  page: string | number;
  pagesize: string | number;
  keyname?: string;
}

/**
 * 基础响应分页列表
 */
export interface BaseResponseList<T = Record> {
  current_page: number;
  per_page: number;
  last_page: number;
  data: T[];
  total: number;
}

/**
 * 基础响应数据格式
 */
export interface BaseResponseInfo<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 基础异常响应数据格式
 */
export interface BaseResponseCatchInfo<T = any> {
  code: string;
  message: string;
  data: T;
}
