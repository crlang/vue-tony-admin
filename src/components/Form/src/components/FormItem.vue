<script lang="tsx">
import type { PropType } from 'vue'
import type { FormActionType, FormProps } from '../types/form'
import type { FormSchema } from '../types/form'
import type { TableActionType } from '@/components/Table'
import { defineComponent, computed, unref } from 'vue'
import { componentMap } from '../componentMap'
import { BasicHelp } from '@/components/Basic'
import { isBoolean, isFunction, isNull } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
import { createPlaceholderMessage } from '../helper'
import { upperFirst, cloneDeep } from 'lodash-es'
import { useI18n } from '@/hooks/web/useI18n'
import { ElFormItem } from 'element-plus'
import type { FormItemRule } from 'element-plus/lib/components/form/src/form.type'
export declare type SyncErrorType = Error | string;
export declare type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[];

export default defineComponent({
  name: 'BasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      default: () => ({}),
    },
    formProps: {
      type: Object as PropType<FormProps>,
      default: () => ({}),
    },
    allDefaultValues: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    formModel: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null,
    },
    tableAction: {
      type: Object as PropType<TableActionType>,
    },
    formActionType: {
      type: Object as PropType<FormActionType>,
    },
  },
  setup(props, { slots }) {
    const { t } = useI18n()

    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props
      const { mergeDynamicData } = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel,
        } as Recordable,
        schema: schema,
      }
    })

    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formActionType } = props
      let { componentProps = {} } = schema
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {}
      }
      if (schema.component === 'ElDivider') {
        componentProps = Object.assign({ direction: 'horizontal' }, componentProps, {
          contentPosition: 'left',
        })
      }
      return componentProps as Recordable
    })

    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps
      const { dynamicDisabled } = props.schema
      const { disabled: itemDisabled = false } = unref(getComponentsProps)
      let disabled = !!globDisabled || itemDisabled
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues))
      }
      return disabled
    })

    function getShow(): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow } = props.schema
      const { showAdvancedButton } = props.formProps
      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(props.schema.isAdvanced)
          ? props.schema.isAdvanced
          : true
        : true

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) {
        isShow = show
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues))
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues))
      }
      isShow = isShow && itemIsAdvanced
      return { isShow, isIfShow }
    }

    function handleRules(): FormItemRule[] {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required,
      } = props.schema

      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues)) as FormItemRule[]
      }

      let rules: FormItemRule[] = cloneDeep(defRules) as FormItemRule[]
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel
      const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`

      function validator(rule: any, value: any, callback:any) {
        const msg = rule.message || defaultMsg
        if (value === undefined || isNull(value)) {
          // 空值
          callback(new Error(msg))
        } else if (Array.isArray(value) && value.length === 0) {
          // 数组类型
          callback(new Error(msg))
        } else if (typeof value === 'string' && value.trim() === '') {
          // 空字符串
          callback(new Error(msg))
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
          callback(new Error(msg))
        }
        return callback()
      }

      const getRequired = isFunction(required) ? required(unref(getValues)) : required

      if ((!rules || rules.length === 0) && getRequired) {
        // rules = [{ required: getRequired, trigger: 'blur', message: t('common.requiredTipText') }]
        rules = [{ required: getRequired, validator }]
      }

      const requiredRuleIndex: number = rules.findIndex(
        (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      )

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex]
        const { isShow } = getShow()
        if (!isShow) {
          rule.required = false
        }
        if (component) {
          if (!Reflect.has(rule, 'type')) {
            rule.type = component === 'InputNumber' ? 'number' : 'string'
          }

          rule.message = rule.message || defaultMsg

          if (component.includes('Input') || component.includes('Textarea')) {
            rule.whitespace = true
          }
          // const valueFormat = unref(getComponentsProps)?.valueFormat
          // setComponentRuleType(rule, component, valueFormat)
        }
      }

      // Maximum input length rule check
      const characterInx = rules.findIndex((val) => val.max)
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
            rules[characterInx].message ||
            t('component.form.maxTip', [rules[characterInx].max] as Recordable)
      }
      return rules
    }

    function renderComponent() {
      const {
        renderComponentContent,
        component,
        field,
        prepend,
        append,
        prefix,
        empty,
        suffix,
        changeEvent,
        valueField,
      } = props.schema

      // const isCheck = component && ['Switch', 'Checkbox'].includes(component)
      const bindInput = component && ['ElInput', 'ElSlider'].includes(component)
      const bindDefInput = () => {
        const isNum = component && ['ElInputNumber'].includes(component)
        if (isNum) {
          return 0
        }
        const isArr = component && ['ElCheckboxGroup'].includes(component)
        if (isArr) {
          return []
        }
        return false
      }

      const eventKey = `on${upperFirst(changeEvent ?? (bindInput ? 'input' : 'change'))}`
      const on = {
        [eventKey]: (...args: Nullable<Recordable>[]) => {
          const [e] = args
          if (propsData[eventKey]) {
            propsData[eventKey](...args)
          }
          const target = e ? e.target : null
          const value = target?.value ?? (target ?? e)
          props.setFormModel(field, value)
        },
      }
      let componentvs = component
      if (component === 'ElRadio' || component === 'ElRadioButton') {
        componentvs = 'ElRadioGroup'
      }
      const Comp = componentMap.get(componentvs) as ReturnType<typeof defineComponent>

      const { autoSetPlaceHolder, size } = props.formProps
      const propsData: Recordable = {
        clearable: true,
        // getPopupContainer: (trigger: Element) => trigger.parentNode,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      }
      // 移除空size
      !propsData.size && delete propsData.size

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      // RangePicker place is an array
      if (isCreatePlaceholder && component !== 'RangePicker' && component) {
        propsData.placeholder =
            unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component)
      }
      // propsData.codeField = field
      // propsData.formValues = unref(getValues)

      const bindValue: Recordable = {
        [valueField || 'modelValue']: props.formModel[field] ?? (bindDefInput() === false ? undefined : bindDefInput()),
      }

      const compAttr: Recordable = {
        ...propsData,
        ...on,
        ...bindValue,
      }
      // compAttr.modelValue = compAttr?.value

      const showAppend = !!append
      const showPrepend = !!prepend
      const showPrefix = !!prefix
      const showSuffix = !!suffix
      const showEmpty = !!empty

      if (!renderComponentContent) {
        // element input text
        const compSlot:any = {}
        // input slots [append,prepend,prefix,suffix]
        showAppend && (compSlot.append = () => isFunction(append) ? append(unref(getValues)) : append)
        showPrepend && (compSlot.prepend = () => isFunction(prepend) ? prepend(unref(getValues)) : prepend)
        showPrefix && (compSlot.prefix = () => isFunction(prefix) ? prefix(unref(getValues)) : prefix)
        showSuffix && (compSlot.suffix = () => isFunction(suffix) ? suffix(unref(getValues)) : suffix)

        // select slots [default,prefix,empty]
        showEmpty && (compSlot.empty = () => isFunction(empty) ? empty(unref(getValues)) : empty)
        if (component === 'ElSelect' && compAttr?.options) {
          compSlot.default = () => compAttr?.options.map(k => {
            return <el-option label={k.label} value={k.value} />
          })
        }

        if (component === 'ElCheckboxGroup' && compAttr?.options) {
          compSlot.default = () => compAttr?.options.map(k => {
            return <el-checkbox label={k.value}>{k.label}</el-checkbox>
          })
        }
        if (component === 'ElRadioGroup' && compAttr?.options) {
          compSlot.default = () => compAttr?.options.map(k => {
            return <el-radio label={k.value}>{k.label}</el-radio>
          })
        }
        if (component === 'ElRadio' && compAttr?.options) {
          compSlot.default = () => compAttr?.options.map(k => {
            return <el-radio label={k.value}>{k.label}</el-radio>
          })
        }
        if (component === 'ElRadioButton' && compAttr?.options) {
          compSlot.default = () => compAttr?.options.map(k => {
            return <el-radio-button label={k.value}>{k.label}</el-radio-button>
          })
        }
        return <Comp {...compAttr} >{compSlot}</Comp>
      }

      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : {
          default: () => renderComponentContent,
        }
      return <Comp {...compAttr}>{compSlot}</Comp>
    }

    function renderLabelHelpMessage() {
      // debugger
      const { label, helpMessage, helpComponentProps, subLabel } = props.schema
      const renderLabel = subLabel ? (
        <span>
          {label} <span class='text-secondary'>{subLabel}</span>
        </span>
      ) : (
        label
      )
      const getHelpMessage = isFunction(helpMessage)
        ? helpMessage(unref(getValues))
        : helpMessage
      if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
        return renderLabel
      }
      return (
        <span>
          {renderLabel}<BasicHelp placement='top' class='mx-1' text={getHelpMessage} {...helpComponentProps} />
        </span>
      )
    }

    function renderItem() {
      // debugger
      const { itemProps, slot, render, field, component } = props.schema

      if (component === 'ElDivider') {
        return (
          <el-divider {...unref(getComponentsProps)}>{renderLabelHelpMessage()}</el-divider>
        )
      } else {
        const getContent = () => {
          if (slot) {
            return getSlot(slots, slot, unref(getValues))
          } else if (render) {
            return render(unref(getValues))
          }
          return renderComponent()
        }

        return (
          <ElFormItem
            prop={field}
            {...(itemProps as Recordable)}
            rules={handleRules()} >
            {
              {
                label: () => renderLabelHelpMessage(),
                default: () => getContent(),
              }
            }
          </ElFormItem>
        )
      }
    }

    return () => {
      const { colProps = {}, colSlot, renderColContent, component } = props.schema
      if (!componentMap.has(component)) {
        return null
      }

      const { baseColProps = {} } = props.formProps
      const realColProps = { ...baseColProps, ...colProps }
      const { isIfShow, isShow } = getShow()
      const values = unref(getValues)

      const getContent = () => {
        if (colSlot) {
          return getSlot(slots, colSlot, values)
        } else if (renderColContent) {
          return renderColContent(values)
        }
        return renderItem()
      }

      return (
        isIfShow && (
          <el-col {...realColProps} v-show={isShow}>
            {getContent()}
          </el-col>
        )
      )
    }
  },
})
</script>
