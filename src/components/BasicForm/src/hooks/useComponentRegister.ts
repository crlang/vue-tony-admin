import type { Component } from 'vue';

import { tryOnUnmounted } from '@vueuse/core';

import { add, del } from '../componentMap';
import { ComponentType } from '../types';

/**
 * 注册自定义表单项组件
 *
 * Register a custom form item component
 * @param compName ComponentType
 * @param comp Component
 */
export function useComponentRegister(compName: ComponentType, comp: Component) {
  add(compName, comp);
  tryOnUnmounted(() => {
    del(compName);
  });
}
