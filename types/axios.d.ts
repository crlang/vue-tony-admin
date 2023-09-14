/** 错误消息提示类型 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
/** 成功消息提示类型 */
export type SuccessMessageMode = ErrorMessageMode;

export interface RequestOptions {
  /** 拼接请求参数到URL */
  joinParamsToUrl?: boolean;
  /** 格式化请求参数的时间 */
  formatDate?: boolean;
  /** 是否处理请求结果 */
  isTransformResponse?: boolean;
  /** 是否返回原生的响应头 */
  isReturnNativeResponse?: boolean;
  /** URL前缀是否加入URL */
  joinPrefix?: boolean;
  /** 接口地址，如果保留为空，将使用默认的url */
  apiUrl?: string;
  /** URL前缀 */
  urlPrefix?: string;
  /** 错误消息提示类型 */
  errorMessageMode?: ErrorMessageMode;
  /** 成功消息提示类型 */
  successMessageMode?: SuccessMessageMode;
  /** 是否添加时间戳 */
  joinTime?: boolean;
  /** 是否忽略重复请求 */
  ignoreCancelToken?: boolean;
  /** 请求头是否携带token */
  withToken?: boolean;
  /** 请求重试机制 */
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  /** 是否开启重试 */
  isOpenRetry: boolean;
  /** 重试次数 */
  count: number;
  /** 重试间隔时间 */
  waitTime: number;
}

export interface Result<T = any> {
  /** 业务代码 */
  code: number;
  /** 业务消息 */
  message: string;
  /** 业务数据 */
  data: T;
}

export interface UploadFileParams {
  /** 携带的参数 */
  data?: Recordable;
  /** 服务器接收文件的字段名称 */
  name?: string;
  /** 文件 */
  file: File | Blob;
  /** 文件名称 */
  filename?: string;
  /** 其它 */
  [key: string]: any;
}
