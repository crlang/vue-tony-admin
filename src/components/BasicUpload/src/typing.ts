export interface UploadApiResult {
  message: string
  code: number
  url: string
}

/**
 * 上传结果状态
 */
export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
}

export interface FileItem {
  /**
   * 缩略图(Base64)
   */
  thumbUrl?: string
  /**
   * 文件名称
   */
  name: string
  /**
   * 文件类型
   */
  type?: string
  /**
   * 文件大小
   */
  size: string | number
  /**
   * 文件上传进度
   */
  percent: number
  /**
   * 文件
   */
  file: File
  /**
   * 上传状态
   */
  status?: UploadResultStatus
  /**
   * 上传结果
   */
  responseData?: UploadApiResult | string
  /**
   * 唯一ID
   */
  uuid: string
}

export interface PreviewFileItem {
  /**
   * 缩略图(URL)
   */
  url: string
  /**
   * 文件名称
   */
  name: string
  /**
   * 文件类型
   */
  type: string
}

export interface FileBasicColumn {
  /**
   * 表格字段
   */
  prop: string
  /**
   * 表格宽度
   */
  width?: number
  /**
   * 表格标题
   */
  label: string
  /**
   * 对齐方式
   */
  align?: 'left' | 'right' | 'center'
  /**
   * 自定义渲染函数
   */
  customRender?: Fn
}
