/*
 * @Author: crlang
 * @Date: 2021-12-30 16:48:58
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-30 17:13:11
 */
import { EleDialog } from '../Dialog/types'

type dir = 'ltr' | 'rtl' | 'ttb' | 'btt'

export interface EleDrawer extends EleDialog {
  direction?: dir
  size?: string | number
  withHeader?: boolean
  modalFade?: boolean
}
