import type {
  UseDrawerReturnType,
  DrawerInstance,
  ReturnMethods,
  BasicProps,
  UseDrawerInnerReturnType
} from './typing'

import {
  ref,
  getCurrentInstance,
  unref,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
  computed
} from 'vue'
import { tryOnUnmounted } from '@vueuse/core'
import { isEqual } from 'lodash-es'

import { isProdMode } from '@/utils/env'
import { isFunction } from '@/utils/is'
import { error } from '@/utils/log'
import { ReturnInnerMethods } from '@/components/Modal'

const dataTransferRef = reactive<any>({})

const visibleData = reactive<{ [key: number]: boolean }>({})

/**
 * 定义使用实例
 *
 * Define use instance
 */
export function useDrawer(): UseDrawerReturnType {
  if (!getCurrentInstance()) {
    error('useDrawer() can only be used inside setup() or functional components!')
  }
  const drawer = ref<DrawerInstance | null>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')
  /**
   * 注册实例
   *
   * Register instance
   * @param drawerInstance Drawer instance
   * @param uuid Drawer instance uuid
   */
  function register(drawerInstance: DrawerInstance, uuid: string) {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawer.value = null
        loaded.value = null
        dataTransferRef[unref(uid)] = null
      })

    if (unref(loaded) && isProdMode() && drawerInstance === unref(drawer)) {
      return
    }
    uid.value = uuid
    drawer.value = drawerInstance
    loaded.value = true
    // 载入实例方法
    // Load instance func
    drawerInstance.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }
  }
  /**
   * 获取实例
   *
   * Get instance
   */
  const getInstance = () => {
    const instance = unref(drawer)
    if (!instance) {
      error('useDrawer instance is undefined!')
    }
    return instance
  }

  const methods: ReturnMethods = {
    /**
     * 设置抽屉props
     *
     * Set drawer props
     * @param props DrawerProps
     */
    setDrawerProps: (props: Partial<BasicProps>): void => {
      getInstance()?.setDrawerProps(props)
    },
    /**
     * 获取抽屉状态
     *
     * Get drawer visible status
     */
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),
    /**
     * 打开抽屉
     *
     * Open drawer
     */
    openDrawer: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDrawerProps({
        modelValue: visible,
      })
      if (!data) return

      // 打开时更新数据
      if (openOnSet) {
        dataTransferRef[unref(uid)] = null
        dataTransferRef[unref(uid)] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data))
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data)
      }
    },
    /**
     * 关闭抽屉
     *
     * Close drawer
     */
    closeDrawer: () => {
      getInstance()?.setDrawerProps({ modelValue: false })
    },
  }

  return [register, methods]
}

/**
 * 定义内部实例
 *
 * Define inner use instance
 * @param callbackFn 回调方法，回调实例传递的数据
 */
export const useDrawerInner = (callbackFn?: Fn): UseDrawerInnerReturnType => {
  const drawerInstanceRef = ref<Nullable<DrawerInstance>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')

  if (!currentInstance) {
    error('useDrawerInner() can only be used inside setup() or functional components!')
  }
  /**
   * 获取实例
   *
   * Get instance
   */
  const getInstance = () => {
    const instance = unref(drawerInstanceRef)
    if (!instance) {
      error('useDrawerInner instance is undefined!')
      return
    }
    return instance
  }
  /**
   * 注册内部实例
   *
   * Register inner instance
   * @param modalInstance Drawer inner instance
   * @param uuid Drawer instance uuid
   */
  const register = (modalInstance: DrawerInstance, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawerInstanceRef.value = null
      })

    uidRef.value = uuid
    drawerInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }

  const methods: ReturnInnerMethods = {
    /**
     * 获取可见状态
     *
     * Get visible state
     */
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uidRef)]
    }),
    /**
     * 修改Loading状态
     *
     * Change loading
     * @param loading
     */
    changeLoading: (loading = true) => {
      getInstance()?.setDrawerProps({ loading })
    },
    /**
     * 修改提交按钮loading状态
     *
     * Change confirm loading
     * @param loading
     */
    changeConfirmLoading: (loading = true) => {
      getInstance()?.setDrawerProps({ confirmOptions: { loading } })
    },
    /**
     * 关闭抽屉
     *
     * Close drawer
     */
    closeDrawer: () => {
      getInstance()?.setDrawerProps({ modelValue: false })
    },
    /**
     * 设置抽屉props
     *
     * Set drawer props
     * @param props DrawerProps
     */
    setDrawerProps: (props: Partial<BasicProps>) => {
      getInstance()?.setDrawerProps(props)
    },
  }

  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)]
    if (!data) return
    // Callback method, the data passed by the callback instance
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [register, methods]
}
