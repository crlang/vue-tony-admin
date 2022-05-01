import type { Component } from 'vue'
import type { ComponentType } from './types'

/**
 * Component list, register here to setting it in the form
 */
import {
  ElInput,
  ElSelect,
  ElDivider,
  // ElRadio,
  ElRadioGroup,
  ElRadioButton,
  // ElCheckbox,
  ElCheckboxGroup,
  ElSwitch,
  ElCascader,
  ElRate,
  ElSlider,
  ElInputNumber
} from 'element-plus'

import DatePicker from './components/DatePicker.vue'
import TimePicker from './components/TimePicker.vue'

const componentMap = new Map<ComponentType, Component>()

// Element plus
componentMap.set('ElInput', ElInput)
componentMap.set('ElSelect', ElSelect)
componentMap.set('ElDivider', ElDivider)
// componentMap.set('ElRadio', ElRadio)
componentMap.set('ElRadioGroup', ElRadioGroup)
componentMap.set('ElRadioButton', ElRadioButton)
// componentMap.set('ElCheckbox', ElCheckbox)
componentMap.set('ElCheckboxGroup', ElCheckboxGroup)
componentMap.set('ElSwitch', ElSwitch)
componentMap.set('ElCascader', ElCascader)
componentMap.set('ElRate', ElRate)
componentMap.set('ElSlider', ElSlider)
componentMap.set('ElInputNumber', ElInputNumber)
// Custom
componentMap.set('ElTimePicker', TimePicker)
componentMap.set('ElDatePicker', DatePicker)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
