import type { UploadFileParams } from '#/axios'

import { defHttp } from '@/utils/http/axios'
import { useGlobSetting } from '@/hooks/setting'

export interface UploadApiResult {
  message: string
  code: number
  url: string
}

const { uploadUrl = '' } = useGlobSetting()

export function ApiUpload(params: UploadFileParams, onUploadProgress?: (progressEvent: ProgressEvent) => void) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  )
}
