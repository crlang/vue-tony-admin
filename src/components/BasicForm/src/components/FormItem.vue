<script lang="tsx">
import { defineComponent, computed, unref, isProxy, toRaw } from 'vue'
import { ElOption, ElCheckbox, ElRadio, ElRadioButton, ElDivider, ElCol } from 'element-plus'
import { componentMap } from '../componentMap'
import { BasicHelp } from '@/components/Basic'
import { isBoolean, isFunction, isNull } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
import { createPlaceholderMessage } from '../helper'
import { upperFirst, cloneDeep } from 'lodash-es'
import { ElFormItem } from 'element-plus'
import { basicFormItemProps } from '../props'
import { EleFormItemRule } from '@/components/ElementPlus'
export declare type SyncErrorType = Error | string;
export declare type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[];

export default defineComponent({
  name: 'BasicFormItem',
  components: { ElOption, ElCheckbox, ElRadio, ElRadioButton, ElDivider, ElCol },
  inheritAttrs: false,
  props: basicFormItemProps,
  setup(props, { slots }) {
    const getValues = computed(() => {
      const { defaultValues, formModel, schema } = props
      const { mergeDynamicData } = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...defaultValues,
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

    function handleRules(): EleFormItemRule[] {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required,
      } = props.schema

      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues)) as EleFormItemRule[]
      }

      let rules: EleFormItemRule[] = cloneDeep(defRules) as EleFormItemRule[]
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel
      const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`

      function validator(rule: any, value: any, callback:any) {
        const msg = rule.message || defaultMsg
        if (value === undefined || isNull(value)) {
          // null
          callback(new Error(msg))
        } else if (Array.isArray(value) && value.length === 0) {
          // array
          callback(new Error(msg))
        } else if (typeof value === 'string' && value.trim() === '') {
          // empty string
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
          callback(new Error(msg))
        }
        return callback()
      }

      const getRequired = isFunction(required) ? required(unref(getValues)) : required

      if ((!rules || rules.length === 0) && getRequired) {
        // rules = [{ required: getRequired, trigger: 'blur', message: '此为必填项' }]
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
            if (component === 'ElInputNumber') {
              rule.type = 'number'
            } else if (
              component === 'ElSelect' ||
              component === 'ElCheckboxGroup' ||
              component === 'ElRadioGroup'
            ) {
              rule.type = 'array'
            } else {
              rule.type = 'string'
            }
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
        rules[characterInx].message = rules[characterInx].message || `字符数应小于${rules[characterInx].max}位`
      }
      return rules
    }

    function renderComponent() {
      const {
        renderComponentContent,
        component,
        field,
        // prepend,
        // append,
        // prefix,
        // empty,
        // suffix,
        changeEvent,
        valueField,
      } = props.schema

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

      const { autoSetPlaceHolder, size = 'default' } = props.formProps
      const propsData: Recordable = {
        clearable: true,
        // getPopupContainer: (trigger: Element) => trigger.parentNode,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      }

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      // RangePicker place is an array
      if (isCreatePlaceholder && component) {
        propsData.placeholder =
            unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component)
      }

      const componentVal = isProxy(props.formModel[field]) ? toRaw(props.formModel[field]) : props.formModel[field]

      const bindValue: Recordable = {
        [valueField || 'modelValue']: componentVal ?? (bindDefInput() === false ? undefined : bindDefInput()),
      }

      const compAttr: Recordable = {
        ...propsData,
        ...on,
        ...bindValue,
      }
      // compAttr.modelValue = compAttr?.value

      if (!renderComponentContent) {
        // element input text
        const compSlot:any = {}
        // input slots [append,prepend,prefix,suffix]
        // if (component === 'ElInput') {
        //   append && (compSlot.append = () => isFunction(append) ? append(unref(getValues)) : append)
        //   prepend && (compSlot.prepend = () => isFunction(prepend) ? prepend(unref(getValues)) : prepend)
        //   prefix && (compSlot.prefix = () => isFunction(prefix) ? prefix(unref(getValues)) : prefix)
        //   suffix && (compSlot.suffix = () => isFunction(suffix) ? suffix(unref(getValues)) : suffix)
        // }

        if (compAttr?.options) {
        // select slots [prefix,empty]
          if (component === 'ElSelect') {
            // prefix && (compSlot.prefix = () => isFunction(prefix) ? prefix(unref(getValues)) : prefix)
            // empty && (compSlot.empty = () => isFunction(empty) ? empty(unref(getValues)) : empty)
            compSlot.default = () => compAttr?.options.map(k => {
              return <ElOption label={k.label} value={k.value} />
            })
          }

          if (component === 'ElCheckboxGroup') {
            compSlot.default = () => compAttr?.options.map(k => {
              return <ElCheckbox label={k.value}>{k.label}</ElCheckbox>
            })
          }
          if (component === 'ElRadioGroup') {
            compSlot.default = () => compAttr?.options.map(k => {
              return <ElRadio label={k.value}>{k.label}</ElRadio>
            })
          }
          if (component === 'ElRadio') {
            compSlot.default = () => compAttr?.options.map(k => {
              return <ElRadio label={k.value}>{k.label}</ElRadio>
            })
          }
          if (component === 'ElRadioButton') {
            compSlot.default = () => compAttr?.options.map(k => {
              return <ElRadioButton label={k.value}>{k.label}</ElRadioButton>
            })
          }
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
      const { label, helpMessage, subLabel } = props.schema
      const renderLabel = subLabel ? (
        <span>
          {label} <span>{subLabel}</span>
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
          {renderLabel}<BasicHelp placement='top' class='mx-1' text={getHelpMessage} />
        </span>
      )
    }

    function renderItem() {
      const { itemProps, slot, render, field, component } = props.schema

      if (component === 'ElDivider') {
        return (
          <ElDivider {...unref(getComponentsProps)}>{renderLabelHelpMessage()}</ElDivider>
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
      const { colProps: itemColProps = {}, colSlot, renderColContent, component } = props.schema

      if (!componentMap.has(component)) {
        return null
      }

      const { colProps = {} } = props.formProps
      const realColProps = { ...colProps, ...itemColProps }
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
          <ElCol {...realColProps} v-show={isShow}>
            {getContent()}
          </ElCol>
        )
      )
    }
  },
})
</script>
