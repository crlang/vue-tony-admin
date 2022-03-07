import type { EleButton } from '@/components/ElementPlus'
import type { RenderRowData } from 'element-plus/es/components/table/src/table/defaults'

import { RoleEnum } from '@/enums/roleEnum'
import { Component } from 'vue'

export type ScopeInfo = RenderRowData<Object>

export interface ActionItem extends Partial<EleButton> {
  callback?: (rowInfo:ScopeInfo)=>void
  popConfirm?: PopConfirm
  preIcon?: string
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[]
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean)
}

export interface PopConfirm {
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: string;
  cancelButtonType?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string | Component;
  iconColor?: string;
  hideIcon?: boolean;

}
