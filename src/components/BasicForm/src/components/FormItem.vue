<script lang="tsx">
import type { EleFormItemRule } from '@/components/ElementPlus';

import { defineComponent, computed, unref, toRaw } from 'vue';
import { ElOption, ElCheckbox, ElFormItem, ElRadio, ElRadioButton, ElCol } from 'element-plus';

import { getSlot } from '@/utils/helper/tsxHelper';
import { BasicHelp } from '@/components/Basic';

import { basicFormItemProps } from '../props';
import { BASIC_COL_SIZE } from '../const';
import { componentMap } from '../componentMap';
import CustomDivider from './CustomDivider.vue';
import { createPlaceholderMessage, setComponentRuleType, handleBasicValidator, handleCustomValidator } from '../helper';
import { isFunction } from '@/utils/is';

export default defineComponent({
  name: 'BasicFormItem',
  components: { ElOption, ElCheckbox, ElRadio, ElRadioButton, CustomDivider, ElCol },
  inheritAttrs: false,
  props: basicFormItemProps,
  setup(props, { slots }) {
    /**
     * 获取表单项绑定值
     *
     * Get the value bound to the form item
     */
    const getValues = computed(() => {
      const { formModel, schema, defaultValues } = props;
      const { mergeDynamicData } = props.formProps;
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...defaultValues,
          ...formModel,
        } as Recordable,
        schema,
      };
    });
    /**
     * 获取表单项组件绑定值
     *
     * Get the value bound by the form item component
     */
    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formAction } = props;
      let { componentProps = {} } = schema;
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, tableAction, formModel, formAction }) ?? {};
      }
      if (schema.component === 'CustomDivider') {
        componentProps = {
          direction: 'horizontal',
          contentPosition: 'left',
          ...componentProps,
        } as Recordable;
      }
      return componentProps as Recordable;
    });

    /**
     * 转换事件名称首字母大写
     *
     * Convert event names to uppercase
     */
    function upperEventFirstStr(str: string) {
      if (!str) {
        return 'Change';
      }
      return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
    }

    /**
     * 获取表单项组件禁用状态
     *
     * Get the disabled state of the form item component
     */
    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps;
      const { dynamicDisabled } = props.schema;
      const { disabled: itemDisabled } = unref(getComponentsProps);
      const disabled = !!globDisabled || !!itemDisabled;

      if (typeof dynamicDisabled === 'boolean') {
        return dynamicDisabled;
      }

      if (typeof dynamicDisabled === 'function') {
        return dynamicDisabled(unref(getValues));
      }

      return disabled;
    });

    /**
     * 获取表单项组件展示状态
     *
     * Get the display state of the form item component
     */
    function getShow(): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow, isAdvanced } = props.schema;
      const { showAdvancedButton } = props.formProps;
      let itemIsAdvanced = true;
      if (showAdvancedButton && typeof isAdvanced === 'boolean') {
        itemIsAdvanced = isAdvanced;
      }

      let isShow = true;
      let isIfShow = true;

      if (typeof show === 'boolean') {
        isShow = show;
      }
      if (typeof ifShow === 'boolean') {
        isIfShow = ifShow;
      }
      if (typeof show === 'function') {
        isShow = show(unref(getValues));
      }
      if (typeof ifShow === 'function') {
        isIfShow = ifShow(unref(getValues));
      }
      isShow = isShow && itemIsAdvanced;
      return { isShow, isIfShow };
    }

    /**
     * 获取表单项校验规则
     *
     * Get form item validation rules
     */
    function handleRules(): EleFormItemRule[] | undefined {
      const { schema, formProps } = props;
      const { component, rulesMessageJoinLabel, label, dynamicRules, required } = schema;
      const { valueFormat, type } = unref(getComponentsProps);

      if (typeof dynamicRules === 'function') {
        return dynamicRules(unref(getValues));
      }

      let rules = [...(schema.rules || [])];
      const joinLabel = rulesMessageJoinLabel || formProps.rulesMessageJoinLabel || false;
      const defaultMsg = `${createPlaceholderMessage(component)}${joinLabel ? label : ''}`;

      const getRequired = isFunction(required) ? required(unref(getValues)) : required;

      if (rules?.length === 0) {
        rules = getRequired ? [{ required: getRequired, validator: (rule, value, callback) => handleBasicValidator(rule, value, callback, defaultMsg), trigger: 'blur' }] : [];
      } else {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];

          handleCustomValidator(rule, component, type);

          // 处理 required 规则的内容
          if (Reflect.has(rule, 'required') && !rule.validator) {
            const { isShow } = getShow();
            // 不显示的组件，强制非必填
            // Components not displayed, mandatory non-required
            if (!isShow) {
              rule.required = false;
            }
            if (component) {
              if (!Reflect.has(rule, 'type')) {
                rule.type = component === 'InputNumber' || type === 'number' ? 'number' : 'string';
              }

              rule.message = rule.message || defaultMsg;

              if (component === 'ElInput') {
                rule.whitespace = true;
              }

              setComponentRuleType(rule, component, valueFormat);
            }
          }
        }
      }

      return rules.length === 0 ? undefined : rules;
    }

    /**
     * 渲染表单项组件
     *
     * Render the form item component
     */
    function renderComponent() {
      const { renderComponentContent, component, field, changeEvent, valueField } = props.schema;

      if (!component) {
        return null;
      }
      // input mode
      const bindInput = ['ElInput', 'ElSlider'].includes(component);

      // input event
      const eventKey = `on${upperEventFirstStr(changeEvent || (bindInput ? 'input' : 'change'))}`;
      const on = {
        [eventKey]: (...args: Nullable<Recordable>[]) => {
          const [e] = args;
          if (propsData[eventKey]) {
            propsData[eventKey](...args);
          }
          const target = e ? e.target : null;
          const value = target?.value ?? target ?? e;
          props.setFormModel(field, value);
        },
      };

      // input component
      const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;

      // input props
      const { autoSetPlaceHolder, size = 'default' } = props.formProps;
      const propsData: Recordable = {
        clearable: true,
        filterable: true,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      };

      // input placeholder
      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
      if (isCreatePlaceholder) {
        propsData.placeholder = unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component);
      }

      // input value
      const bindValue: Recordable = {
        [valueField || 'modelValue']: toRaw(props.formModel[field]) ?? undefined,
      };

      // input attr
      const compAttr: Recordable = {
        ...propsData,
        ...on,
        ...bindValue,
      };

      // input component set
      if (!renderComponentContent) {
        const compSlot = {
          default: () => {},
        };

        // Trying to set a form item component with options
        if (compAttr?.items?.length) {
          if (component === 'ElSelect') {
            compSlot.default = () =>
              compAttr.items.map((k: any) => {
                return <ElOption {...k} />;
              });
            // compAttr.items = null;
          } else if (component === 'ElCheckboxGroup') {
            compSlot.default = () =>
              compAttr.items.map((k: any) => {
                return (
                  <ElCheckbox {...k} label={k.value}>
                    {k.label}
                  </ElCheckbox>
                );
              });
            // compAttr.items = null;
          } else if (component === 'ElRadioGroup') {
            compSlot.default = () =>
              compAttr.items.map((k: any) => {
                return (
                  <ElRadio {...k} label={k.value}>
                    {k.label}
                  </ElRadio>
                );
              });
            // compAttr.items = null;
          }
        }

        return <Comp {...compAttr}>{compSlot}</Comp>;
      }

      // input component custom set
      const compSlot =
        typeof renderComponentContent === 'function'
          ? {
            ...renderComponentContent(unref(getValues)),
          }
          : {
            default: () => renderComponentContent,
          };
      return <Comp {...compAttr}>{compSlot}</Comp>;
    }

    /**
     * 渲染表单项标签
     *
     * Render the form item label
     */
    function renderLabelHelpMessage() {
      const { label, helpMessage, subLabel } = props.schema;
      const renderLabel = subLabel ? (
        <span>
          {label} <span>{subLabel}</span>
        </span>
      ) : (
        label
      );
      // no help message
      const getHelpMessage = typeof helpMessage === 'function' ? helpMessage(unref(getValues)) : helpMessage;
      if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
        return renderLabel;
      }

      // has help message
      return (
        <span style='display:inline-flex;align-items:center;'>
          <span>{renderLabel}</span>
          <BasicHelp placement='top' class='mx-1' text={getHelpMessage} />
        </span>
      );
    }

    /**
     * 渲染表单项
     *
     * Render the form item
     */
    function renderItem() {
      const { itemProps, slot, render, field, component } = props.schema;

      // render CustomDivider
      if (component === 'CustomDivider') {
        return <CustomDivider {...unref(getComponentsProps)}>{renderLabelHelpMessage()}</CustomDivider>;
      } else {
        /**
         * 获取表单项内容
         *
         * Get form item content
         */
        const getContent = () => {
          // 插槽
          // slot
          if (slot) {
            return getSlot(slots, slot, unref(getValues));
            // 自定义渲染
            // custom render
          } else if (render) {
            return render(unref(getValues));
          }
          return renderComponent();
        };

        return (
          <ElFormItem prop={field} {...(itemProps as Recordable)} rules={handleRules()}>
            {{
              label: () => renderLabelHelpMessage(),
              default: () => getContent(),
            }}
          </ElFormItem>
        );
      }
    }

    return () => {
      const { colProps: itemColProps = {}, colSlot, renderColContent, component } = props.schema;

      if (!componentMap.has(component)) {
        return null;
      }

      const { colProps = {} } = props.formProps;
      const realColProps = {
        span: BASIC_COL_SIZE,
        ...colProps,
        ...itemColProps,
      };
      const { isIfShow, isShow } = getShow();
      const values = unref(getValues);

      const getContent = () => {
        // 插槽
        // slot
        if (colSlot) {
          return getSlot(slots, colSlot, values);
          // 自定义渲染表单项及其组件
          // custom render form item and input components
        } else if (renderColContent) {
          return renderColContent(values);
        }
        return renderItem();
      };

      return (
        isIfShow && (
          <ElCol {...realColProps} v-show={isShow}>
            {getContent()}
          </ElCol>
        )
      );
    };
  },
});
</script>
