import type { ComputedRef } from 'vue'
import type { EleDialog, EleButton } from '@/components/ElementPlus'

export interface ModalCustomHeader {
  showClose?: boolean
  showFullscreen?: boolean
  draggable?: boolean
  helpMessage?: string | string[]
}

export interface ModalCustomContent {
  useWrapper?: boolean
  footerOffset?: number
  loading?: boolean
  scrollTop?: boolean
  loadingTip?: string
  modalHeaderHeight?: number
  modalFooterHeight?: number
  fullScreen?: boolean
}

export interface ModalCustomFooter {
  showFooter?: boolean
  showCancel?: boolean
  cancelText?: string
  cancelButton?: Partial<EleButton>,
  showConfirm?: boolean
  confirmText?: string
  confirmButton?: Partial<EleButton>,
}

export interface ModalProps extends EleDialog, ModalCustomHeader, ModalCustomContent, ModalCustomFooter {
  modelValue: Boolean

  closeFunc: () => Promise<boolean>
}

/**
 * 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void
  emitVisible?: (visible: boolean, uid: number) => void
  redoModalHeight?: () => void
}

export type RegisterFn = (modalMethods: ModalMethods, uuid?: string) => void

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  closeModal: () => void
  getVisible?: ComputedRef<boolean>
}

export type UseModalReturnType = [RegisterFn, ReturnMethods]

export interface ReturnInnerMethods extends ModalMethods {
  closeModal: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getVisible?: ComputedRef<boolean>
  redoModalHeight: () => void
}

export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods]
