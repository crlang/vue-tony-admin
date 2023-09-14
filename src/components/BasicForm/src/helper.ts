// import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import type { ComponentType } from './types/index';
import type { EleFormItemRule } from '@/components/ElementPlus';
import type { InternalRuleItem } from 'async-validator';

import dayjs from 'dayjs';

import { isFunction, isNull, isNullOrUnDef, isNumber, isObject } from '@/utils/is';

/**
 * 生成 placeholder
 *
 * Create placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  const inputComponents = ['ElInput', 'ElInputNumber', 'CustomAutocomplete'];
  if (inputComponents.includes(component)) {
    return '请输入';
  }

  const selectComponents = [
    'ElSelect',
    'ElCascader',
    'ElTimeSelect',
    'ElSelectV2',
    'ElTreeSelect',
    'CustomTreeSelect',
    'CustomSelect',
    'CustomDatePicker',
    'CustomColorPicker',
    'CustomTimePicker',
  ];
  if (selectComponents.includes(component)) {
    return '请选择';
  }

  const dropComponents = ['ElSlider'];
  if (dropComponents.includes(component)) {
    return '请拖动';
  }

  const clickComponents = ['ElSwitch', 'ElRate'];
  if (clickComponents.includes(component)) {
    return '请点击';
  }

  const checkedComponents = ['ElCheckbox', 'ElCheckboxGroup', 'ElCheckboxButton', 'ElRadioGroup', 'CustomRadio', 'CustomCheckbox'];
  if (checkedComponents.includes(component)) {
    return '请勾选';
  }

  return '';
}

export function setComponentRuleType(rule: EleFormItemRule, component: ComponentType, valueFormat: string) {
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

/**
 * 处理必填的时的校验规则
 *
 * Validation rules when processing required fields
 */
export function handleBasicValidator(rule: InternalRuleItem, value: any, callback: (error?: string | Error | undefined) => void, defaultMsg: string = '') {
  const msg = rule.message || defaultMsg;
  if (value === undefined || isNull(value)) {
    // 空值
    return callback(new Error(msg));
  } else if (Array.isArray(value) && value.length === 0) {
    // 数组类型
    return callback(new Error(msg));
  } else if (typeof value === 'string' && value.trim() === '') {
    // 空字符串
    return callback(new Error(msg));
  } else if (
    typeof value === 'object' &&
    Reflect.has(value, 'checked') &&
    Reflect.has(value, 'halfChecked') &&
    Array.isArray(value.checked) &&
    Array.isArray(value.halfChecked) &&
    value.checked.length === 0 &&
    value.halfChecked.length === 0
  ) {
    // 非关联选择的tree组件
    return callback(new Error(msg));
  }
  return callback();
}

/**
 * 自定义一些校验规则信息
 * @param rule
 * @param component
 * @param componentType
 */
export function handleCustomValidator(rule: InternalRuleItem, component: ComponentType, componentType: HTMLInputElement['type']): EleFormItemRule {
  if (isFunction(rule.validator)) return;

  function createRuleMessage(crm, typ: 'minmax' | 'min' | 'max' | 'len') {
    const msgs = {
      minmax: {
        text: `内容长度限制 ${crm.min} - ${crm.max} 位`,
        number: `内容大小限制 ${crm.min} - ${crm.max} 之间`,
        array: `选择个数限制 ${crm.min} - ${crm.max} 个`,
      },
      min: {
        text: `内容长度至少要 ${crm.min} 位`,
        number: `内容最小限制 ${crm.min}`,
        array: `至少选择 ${crm.min} 个`,
      },
      max: {
        text: `内容长度至多只能 ${crm.max} 位`,
        number: `内容最大限制 ${crm.max}`,
        array: `至多选择 ${crm.max} 个`,
      },
      len: {
        text: `内容长度固定为 ${crm.len} 位`,
        number: `内容固定为 ${crm.len}`,
        array: `固定选择 ${crm.len} 个`,
      },
    };
    return msgs[typ];
  }

  if (component === 'ElInput') {
    rule.type = componentType === 'number' ? 'number' : 'string';
  }

  if (component === 'ElInputNumber') {
    rule.type = 'number';
  }

  if (component === 'ElCheckboxGroup' || component === 'CustomCheckbox') {
    rule.type = 'array';
  }

  // 处理 min ~ max 规则的内容
  if (Reflect.has(rule, 'min') && Reflect.has(rule, 'max')) {
    rule.required = true;
    rule.validator = (rule, value, callback) => {
      let msg = null;
      if (component === 'ElInput') {
        if (componentType === 'number') {
          if (isNullOrUnDef(value) || value < rule.min || value > rule.max) {
            msg = createRuleMessage(rule, 'minmax')['number'];
          }
        } else {
          if (isNullOrUnDef(value) || value.length < rule.min || value.length > rule.max) {
            msg = createRuleMessage(rule, 'minmax')['text'];
          }
        }
      }
      if (component === 'ElInputNumber') {
        if (isNullOrUnDef(value) || value < rule.min || value > rule.max) {
          msg = createRuleMessage(rule, 'minmax')['number'];
        }
      }

      if (component === 'ElCheckboxGroup' || component === 'CustomCheckbox') {
        if (isNullOrUnDef(value) || value.length < rule.min || value.length > rule.max) {
          msg = createRuleMessage(rule, 'minmax')['array'];
        }
      }

      if (msg) {
        return callback(new Error(msg));
      } else {
        return callback();
      }
    };
  } else {
    // 处理 min 规则的内容
    if (Reflect.has(rule, 'min')) {
      rule.required = true;
      rule.validator = (rule, value, callback) => {
        let msg = null;
        if (component === 'ElInput') {
          if (componentType === 'number') {
            if (isNullOrUnDef(value) || value < rule.min) {
              msg = createRuleMessage(rule, 'min')['number'];
            }
          } else {
            if (isNullOrUnDef(value) || value.length < rule.min) {
              msg = createRuleMessage(rule, 'min')['text'];
            }
          }
        }
        if (component === 'ElInputNumber') {
          if (isNullOrUnDef(value) || value < rule.min) {
            msg = createRuleMessage(rule, 'min')['number'];
          }
        }

        if (component === 'ElCheckboxGroup' || component === 'CustomCheckbox') {
          if (isNullOrUnDef(value) || value.length < rule.min) {
            msg = createRuleMessage(rule, 'min')['array'];
          }
        }

        if (msg) {
          return callback(new Error(msg));
        } else {
          return callback();
        }
      };
    }
    // 处理 max 规则的内容
    if (Reflect.has(rule, 'max')) {
      rule.required = true;
      rule.validator = (rule, value, callback) => {
        let msg = null;
        if (component === 'ElInput') {
          if (componentType === 'number') {
            if (isNullOrUnDef(value) || value > rule.max) {
              msg = createRuleMessage(rule, 'max')['number'];
            }
          } else {
            if (isNullOrUnDef(value) || value.length > rule.max) {
              msg = createRuleMessage(rule, 'max')['text'];
            }
          }
        }
        if (component === 'ElInputNumber') {
          if (isNullOrUnDef(value) || value > rule.max) {
            msg = createRuleMessage(rule, 'max')['number'];
          }
        }

        if (component === 'ElCheckboxGroup' || component === 'CustomCheckbox') {
          if (isNullOrUnDef(value) || value.length > rule.max) {
            msg = createRuleMessage(rule, 'max')['array'];
          }
        }

        if (msg) {
          return callback(new Error(msg));
        } else {
          return callback();
        }
      };
    }
  }
  // 处理 len 规则的内容
  if (Reflect.has(rule, 'len')) {
    rule.validator = (rule, value, callback) => {
      let msg = null;
      if (component === 'ElInput') {
        if (componentType === 'number') {
          if (isNullOrUnDef(value) || value !== rule.len) {
            msg = createRuleMessage(rule, 'len')['number'];
          }
        } else {
          if (isNullOrUnDef(value) || value.length !== rule.len) {
            msg = createRuleMessage(rule, 'len')['text'];
          }
        }
      }
      if (component === 'ElInputNumber') {
        if (isNullOrUnDef(value) || value !== rule.len) {
          msg = createRuleMessage(rule, 'len')['number'];
        }
      }

      if (component === 'ElCheckboxGroup' || component === 'CustomCheckbox') {
        if (isNullOrUnDef(value) || value.length !== rule.len) {
          msg = createRuleMessage(rule, 'len')['array'];
        }
      }

      if (msg) {
        return callback(new Error(msg));
      } else {
        return callback();
      }
    };
  }

  // return rule;
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    attr.value = isObject(value) ? dayjs(value).format(valueFormat) : value;
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dayjs(attr.value);
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();

export const defaultValueComponents = ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'];

// TODO 自定义组件封装会出现验证问题，因此这里目前改成手动触发验证
export const NO_AUTO_LINK_COMPONENTS: ComponentType[] = [
  'Upload',
  'ApiTransfer',
  'ApiTree',
  'ApiSelect',
  'ApiTreeSelect',
  'ApiRadioGroup',
  'ApiCascader',
  'AutoComplete',
  'RadioButtonGroup',
];
