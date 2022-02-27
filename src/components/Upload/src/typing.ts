import { UploadApiResult } from '@/api/sys/model/uploadModel'

export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading'
}

export interface FileItem {
  thumbUrl?: string
  name: string
  size: string | number
  type?: string
  percent: number
  file: File
  status?: UploadResultStatus
  responseData?: UploadApiResult
  uuid: string
}

export interface PreviewFileItem {
  url: string
  name: string
  type: string
}

export interface FileBasicColumn {
  customRender?: Function
  title: string
  width?: number
  dataIndex: string
  align?: 'left' | 'right' | 'center'
}
