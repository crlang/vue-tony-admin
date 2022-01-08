/*
 * @Author: crlang
 * @Date: 2021-12-26 16:45:24
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-02 22:02:24
 */

import { EleImageFit } from './types'

export const EleImageProps = {
  appendToBody: {
    type: Boolean,
    default: false,
  },
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: '',
  },
  fit: {
    type: String as PropType<EleImageFit>,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement | undefined>,
  },
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
}
