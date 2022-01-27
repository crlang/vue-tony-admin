import type { CSSProperties, VNodeChild, ComputedRef } from 'vue'
import type { ScrollContainerOptions } from '@/components/Container/index'
import type { EleButtonType, EleDrawer } from '@/components/ElementPlus'

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

export interface DrawerFooterProps{
  showConfirmBtn: boolean
  showCancelBtn: boolean
  /**
   * Text of the Cancel button
   * @default 'cancel'
   * @type string
   */
  cancelText: string
  cancelType: EleButtonType
  /**
   * Text of the OK button
   * @default 'OK'
   * @type string
   */
  confirmText: string

  /**
   * Button type of the OK button
   * @default 'primary'
   * @type string
   */
  confirmType: EleButtonType

  /**
   * Whether to apply loading visual effect for OK button or not
   * @default false
   * @type boolean
   */
  confirmLoading: boolean

  showFooter: boolean
  footerHeight: number
}
export interface DrawerProps extends DrawerFooterProps, EleDrawer {
  isDetail?: boolean
  loading?: boolean
  modelValue?: boolean
  showDetailBack?: boolean
  /**
   * Built-in ScrollContainer component configuration
   * @type ScrollContainerOptions
   */
  scrollOptions?: ScrollContainerOptions
  closeFunc?: () => Promise<any>
  triggerWindowResize?: boolean

  /**
   * Style for Drawer's mask element.
   * @default {}
   * @type object
   */
  maskStyle?: CSSProperties

  /**
   * The title for Drawer.
   * @type any (string | slot)
   */
  title?: VNodeChild | JSX.Element

  /**
   * Style of wrapper element which **contains mask** compare to `drawerStyle`
   * @type object
   */
  wrapStyle?: CSSProperties

  /**
   * Style of the popup layer element
   * @type object
   */
  drawerStyle?: CSSProperties

  headerStyle?: CSSProperties

  /**
   * The z-index of the Drawer.
   * @default 1000
   * @type number
   */
  zIndex?: number
  /**
   * Specify a callback that will be called when a user clicks mask, close button or Cancel button.
   */
  onClose?: (e?: Event) => void
  footerOptions?: DrawerFooterProps
}
export interface DrawerActionType {
  scrollBottom: () => void
  scrollTo: (to: number) => void
  getScrollWrap: () => Element | null
}
