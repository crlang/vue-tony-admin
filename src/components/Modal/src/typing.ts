import type { ComputedRef } from 'vue'
import type { EleButtonType, EleButtonProps } from '@/components/ElementPlus'
/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
  redoModalHeight?: () => void;
}

export type RegisterFn = (modalMethods: ModalMethods, uuid?: string) => void;

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  closeModal: () => void;
  getVisible?: ComputedRef<boolean>;
}

export type UseModalReturnType = [RegisterFn, ReturnMethods];

export interface ReturnInnerMethods extends ModalMethods {
  closeModal: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
  redoModalHeight: () => void;
}

export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods];

export interface ModalProps {
  // 启用wrapper后 底部可以适当增加高度
  wrapperFooterOffset?: number;
  draggable?: boolean;
  scrollTop?: boolean;

  // 是否可以进行全屏
  canFullscreen?: boolean;
  defaultFullscreen?: boolean;
  modelValue?: boolean;
  // 温馨提醒信息
  helpMessage: string | string[];

  // 是否使用modalWrapper
  useWrapper: boolean;

  loading: boolean;
  loadingTip?: string;

  wrapperProps: Omit<ModalWrapperProps, 'loading'>;

  showConfirmBtn: boolean;
  showCancelBtn: boolean;
  showClose: boolean;
  closeFunc: () => Promise<any>;

  /**
   * Text of the Cancel button
   * @default 'cancel'
   * @type string
   */
  cancelText?: string;

  /**
   * Whether to apply loading visual effect for OK button or not
   * @default false
   * @type boolean
   */
  confirmLoading?: boolean;

  /**
   * Text of the OK button
   * @default 'OK'
   * @type string
   */
  confirmText?: string;

  /**
   * Button type of the OK button
   * @default 'primary'
   * @type string
   */
  confirmType?: EleButtonType;

  /**
   * The ok button props, follow jsx rules
   * @type object
   */
  confirmButtonProps?: EleButtonProps;

  /**
   * The cancel button props, follow jsx rules
   * @type object
   */
  cancelButtonProps?: EleButtonProps;
}

export interface ModalWrapperProps {
  footerOffset?: number;
  loading: boolean;
  modalHeaderHeight: number;
  modalFooterHeight: number;
  modelValue: boolean;
  fullScreen: boolean;
  useWrapper: boolean;
}
