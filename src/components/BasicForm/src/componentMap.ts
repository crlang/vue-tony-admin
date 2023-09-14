import type { Component } from 'vue';
import type { ComponentType } from './typing';

/**
 * 导入支持的官方表单项组件
 *
 * Import supported official form item components
 */
import { ElInput, ElSwitch, ElRate, ElSlider, ElInputNumber } from 'element-plus';

/**
 * 导入自定义的表单项组件
 *
 * Import custom form item components
 */
import CustomCascader from './components/CustomCascader.vue';
import CustomCheckbox from './components/CustomCheckbox.vue';
import CustomDatePicker from './components/CustomDatePicker.vue';
import CustomColorPicker from './components/CustomColorPicker.vue';
import CustomDivider from './components/CustomDivider.vue';
import CustomRadio from './components/CustomRadio.vue';
import CustomSelect from './components/CustomSelect.vue';
import CustomTimePicker from './components/CustomTimePicker.vue';
import CustomTree from './components/CustomTree.vue';
import CustomTreeSelect from './components/CustomTreeSelect.vue';
import CustomAutocomplete from './components/CustomAutocomplete.vue';
/**
 * 注册导入的组件
 *
 * Register imported components
 */
const componentMap = new Map<ComponentType, Component>();

// Element plus
componentMap.set('ElInput', ElInput);
componentMap.set('ElSwitch', ElSwitch);
componentMap.set('ElRate', ElRate);
componentMap.set('ElSlider', ElSlider);
componentMap.set('ElInputNumber', ElInputNumber);
// Custom
componentMap.set('CustomCascader', CustomCascader);
componentMap.set('CustomCheckbox', CustomCheckbox);
componentMap.set('CustomDatePicker', CustomDatePicker);
componentMap.set('CustomColorPicker', CustomColorPicker);
componentMap.set('CustomDivider', CustomDivider);
componentMap.set('CustomRadio', CustomRadio);
componentMap.set('CustomSelect', CustomSelect);
componentMap.set('CustomTimePicker', CustomTimePicker);
componentMap.set('CustomTree', CustomTree);
componentMap.set('CustomTreeSelect', CustomTreeSelect);
componentMap.set('CustomAutocomplete', CustomAutocomplete);
/**
 * 注册新的表单项组件
 *
 * Register a new form item component
 * @param compName ComponentType
 * @param component Component
 */
export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

/**
 * 移除表单项组件
 *
 * Remove form item component
 * @param compName ComponentType
 */
export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
