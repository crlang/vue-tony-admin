import type { EleButton } from '@/components/ElementPlus'
import type { RenderRowData } from 'element-plus/es/components/table/src/table/defaults'

import { RoleEnum } from '@/enums/roleEnum'
import { Component } from 'vue'

export type ScopeInfo = RenderRowData<Object>

export interface ActionItem extends EleButton {
  callback?: (rowInfo:ScopeInfo)=>void
  popConfirm?: PopConfirm
  preIcon?: string
  // Whether the permission code control is displayed
  auth?: RoleEnum | RoleEnum[] | string | string[]
  // Whether the business control is displayed
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
