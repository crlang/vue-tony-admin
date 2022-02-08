import type { ComputedRef } from 'vue'
import type { EleButtonType, EleDrawer } from '@/components/ElementPlus'

export interface DrawerFooterProps{
  showConfirmBtn: boolean
  showCancelBtn: boolean

  cancelText: string
  cancelType: EleButtonType

  confirmText: string
  confirmType: EleButtonType
  confirmLoading: boolean

  showFooter: boolean
  footerHeight: number
}

export interface DrawerProps extends EleDrawer, DrawerFooterProps {
  title?: string
  modelValue?: boolean
  // 拓展
  isDetail?: boolean
  showDetailBack?: boolean
  loading?: boolean
  loadingText?: string,
  closeFunc?: () => Promise<any>
}

export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps> | boolean) => void
  emitVisible?: (visible: boolean, uid: number) => void
}

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void
  closeDrawer: () => void
  getVisible?: ComputedRef<boolean>
}

export type RegisterFn = (drawerInstance: DrawerInstance, uuid?: string) => void

export interface ReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getVisible?: ComputedRef<boolean>
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods]

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods]
