import { RoleEnum } from '@/enums/roleEnum'
import { Component } from 'vue'
import { EleButton, EleButtonType } from '@/components/ElementPlus'

export interface ActionItem extends EleButton {
  onClick?: Fn;
  label?: string;
  type?: EleButtonType;
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
