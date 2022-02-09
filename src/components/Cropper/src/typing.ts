import type Cropper from 'cropperjs'

export interface CropendResult {
  imgBase64: string
  imgInfo: Cropper.Data
}

export type { Cropper }

export type successReturnType = { source: string; data: object;}
