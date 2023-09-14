import type { UploadFileParams } from '#/axios';

export interface UploadApiResult {
  message: string;
  code: number;
  url: string;
}

import { defHttp } from '@/utils/http/axios';
import { useGlobSetting } from '@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

export function ApiUpload(params: UploadFileParams, onUploadProgress?: (progressEvent: ProgressEvent) => void) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
