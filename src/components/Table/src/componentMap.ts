import type { Component } from 'vue'
import {
  ElInput,
  ElSelect,
  ElCheckbox,
  ElInputNumber,
  ElSwitch,
  ElDatePicker,
  ElTimePicker
} from 'element-plus'
import type { ComponentType } from './types/componentType'
import { ApiSelect } from '@/components/Form'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('ElInput', ElInput)
componentMap.set('ElInputNumber', ElInputNumber)
componentMap.set('ElSelect', ElSelect)
componentMap.set('ApiSelect', ApiSelect)
componentMap.set('ElSwitch', ElSwitch)
componentMap.set('ElCheckbox', ElCheckbox)
componentMap.set('ElDatePicker', ElDatePicker)
componentMap.set('ElTimePicker', ElTimePicker)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
