import type { Component } from 'vue'

import { tryOnUnmounted } from '@vueuse/core'

import { add, del } from '../componentMap'
import type { ComponentType } from '../types'

/**
 * 注册自定义表单项组件
 */
export function useComponentRegister(compName: ComponentType, comp: Component) {
  add(compName, comp)
  tryOnUnmounted(() => {
    del(compName)
  })
}
