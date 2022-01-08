/*
 * @Author: crlang
 * @Date: 2022-01-01 19:04:52
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2022-01-01 19:37:13
 */

export interface EleDropdown {
  trigger?: string
  type?: string
  size?: string
  splitButton?: boolean
  hideOnClick?: boolean
  placement?: string
  showTimeout?: number
  hideTimeout?: number
  tabindex?: string | number
  effect?: string
  maxHeight?: string | number
}

export interface EleDropdownItem {
  command?: object | string | number
  disabled?: boolean
  divided?: boolean
  icon?: string | object
  text?: string | number
}
