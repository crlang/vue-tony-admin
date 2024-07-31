import type { ParamsLogin, ResponseGetUserInfo } from '@/api/types'
import type { ErrorTypeEnum } from '@/enums/exceptionEnum'
import type { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export interface LockInfo {
  pwd?: string | undefined
  isLock?: boolean
}

export interface ErrorLogInfo {
  type: ErrorTypeEnum
  file: string
  name?: string
  message: string
  stack?: string
  detail: string
  url: string
  time?: string
}

/**
 * 登录参数信息，建议继承接口回调的登录参数信息
 */
export interface LoginParams extends ParamsLogin {}

/**
 * 用户信息，建议继承接口回调的用户信息
 */
export interface UserInfo extends ResponseGetUserInfo {}

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}
