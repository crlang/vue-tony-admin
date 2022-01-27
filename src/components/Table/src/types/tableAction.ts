import type { EleButton } from '@/components/ElementPlus'

import { RoleEnum } from '@/enums/roleEnum'
import { Component } from 'vue'
import { ComponentSize } from '@/utils/types'

export interface ActionItem extends EleButton {
  onClick?: Fn;
  label?: string;
  type?: ComponentSize;
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  enable?: boolean;
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
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
