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

import ElDatePicker from './components/DatePicker.vue'
import TimePicker from './components/TimePicker.vue'
import { BasicUpload } from '@/components/Upload'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Upload', BasicUpload)

// Element plus
componentMap.set('ElInput', ElInput)
componentMap.set('ElSelect', ElSelect)
componentMap.set('ElDivider', ElDivider)
componentMap.set('ElDatePicker', ElDatePicker)
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
componentMap.set('ElTimePicker', TimePicker)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
