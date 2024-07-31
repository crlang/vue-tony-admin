<template>
  <ElForm
    v-bind="getBindValues"
    ref="formElRef"
    :class="prefixCls"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <slot name="formHeader"></slot>
    <ElRow v-bind="getRow">
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem
          :table-action="tableAction"
          :form-action="formActionType"
          :schema="schema"
          :default-values="defaultValueRef"
          :form-props="getProps"
          :form-model="formModel"
          :set-form-model="setFormModel"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>

      <FormAction
        v-if="getProps.showActionButtonGroup"
        v-bind="getActionProps"
        :prefix-cls="prefixCls"
        @toggle-advanced="handleToggleAdvanced"
      >
        <template v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']" #[item]="data">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
    </ElRow>
    <slot name="formFooter"></slot>
  </ElForm>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, unref, watch } from 'vue'
import { ElForm, ElRow } from 'element-plus'
import { omit } from 'lodash-es'

import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'
import { useFormValues } from './hooks/useFormValues'
import { useAdvanced } from './hooks/useAdvanced'
import { useBasicFormFn } from './hooks/useBasic'
import { useFormEvents } from './hooks/useFormEvents'
import { createFormContext } from './hooks/useFormContext'
import { basicProps, customProps } from './props'
import { BASIC_COL_SIZE, BASIC_ROW_GUTTER } from './const'
import type { FormActionMethods } from './types/formItem'
import type { BasicFormProps, BasicFormSchema } from './types/form'
import type { AdvanceState } from './types/hooks'
import { useModalContext } from '@/components/BasicModal'
import { useDesign } from '@/hooks/web/useDesign'
import type { EleForm } from '@/components/ElementPlus'

export default defineComponent({
  name: 'BasicForm',
  components: { ElForm, FormItem, FormAction, ElRow },
  props: basicProps,
  emits: ['advanced-change', 'reset', 'submit', 'register', 'validate'],
  setup(props, { emit, attrs, expose }) {
    const formElRef = ref<Nullable<FormActionMethods>>(null)
    const formModel = reactive<Recordable>({})
    const propsRef = ref<Partial<BasicFormProps>>({})
    const schemaRef = ref<BasicFormSchema[]>([])
    const modalFn = useModalContext()
    const isInitedDefaultRef = ref(false)
    const defaultValueRef = ref<Recordable>({})

    const { prefixCls } = useDesign('basic-form')
    const advanceState = reactive<AdvanceState>({
      isAdvanced: false,
      showAdvanced: true,
      actionSpan: BASIC_COL_SIZE,
    })

    const { validate, validateField, resetFields, scrollToField, clearValidate, getBasicEmits } = useBasicFormFn({
      formElRef,
      emit,
    })

    /**
     * 获取更新 Props
     */
    const getProps = computed(() => {
      const opts = {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicFormProps
      return opts
    })
    /**
     * 表单全局的行的配置
     */
    const getRow = computed((): Recordable => {
      const { rowStyle = {}, rowProps = {} } = unref(getProps)
      const opts = {
        gutter: BASIC_ROW_GUTTER,
        style: rowStyle,
        ...rowProps,
      }
      return opts
    })
    /**
     * 绑定表单操作项Props
     */
    const getActionProps = computed((): Recordable => {
      return {
        ...unref(getProps),
        ...advanceState,
      }
    })
    /**
     * 绑定表单Props
     */
    const getBindValues = computed(() => {
      const opts = {
        ...attrs,
        ...getBasicEmits,
        ...unref(getProps),
      }

      // 绑定组件Porps前，移除自定义附加项
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleForm
    })
    /**
     * 获取并处理表单数据结构
     */
    const getSchema = computed((): BasicFormSchema[] => {
      const schemas = unref(schemaRef)?.length ? unref(schemaRef) : unref(getProps).schemas || []

      if (unref(getProps).showAdvancedButton) {
        return schemas.filter(schema => schema.component !== 'CustomDivider')
      }
      else {
        return schemas
      }
    })

    const { handleToggleAdvanced } = useAdvanced({
      advanceState,
      emit,
      getProps,
      getSchema,
      formModel,
      defaultValueRef,
    })

    const { handleFormValues, initDefault } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel,
    })

    const { handleSubmit, handleReset, setFieldsValue, getFieldsValue, updateSchema, resetSchema, appendSchemaByField, removeSchemaByField } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      validate,
      resetFields,
      validateField,
      handleFormValues,
    })

    createFormContext({
      resetAction: handleReset,
      submitAction: handleSubmit,
    })

    /**
     * 通过实例设置 Props
     */
    function setFormProps(formProps: Partial<BasicFormProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...formProps } as Recordable
    }

    /**
     * 更新表单数据，并尝试验证
     */
    function setFormModel(field: string, value: any) {
      formModel[field] = value

      // 尝试验证该字段
      validateField([field]).catch(() => {})
    }

    /**
     * 按回车是否提交表单
     */
    function handleEnterPress(e: KeyboardEvent) {
      const { autoSubmitOnEnter } = unref(getProps)
      if (!autoSubmitOnEnter)
        return
      const { target, key } = e

      if (key === 'Enter' && target instanceof HTMLElement) {
        if (target?.tagName?.toUpperCase() === 'INPUT') {
          handleSubmit()
        }
      }
    }

    const formActionType: FormActionMethods = {
      submit: handleSubmit,
      reset: handleReset,
      setFormProps,
      getFieldsValue,
      setFieldsValue,
      updateSchema,
      resetSchema,
      removeSchemaByField,
      appendSchemaByField,
      // Element Plus
      validate,
      validateField,
      resetFields,
      scrollToField,
      clearValidate,
    }

    onMounted(() => {
      // initDefault()
      expose(formActionType)
      emit('register', formActionType)
    })

    watch(
      () => unref(getSchema),
      (schema) => {
        if (!unref(isInitedDefaultRef) && schema?.length) {
          initDefault()
          isInitedDefaultRef.value = true

          nextTick(() => {
            modalFn?.redoModalHeight?.()
          })
        }
      },
      { immediate: true },
    )

    return {
      handleToggleAdvanced,
      handleEnterPress,
      setFormModel,
      getBindValues,
      formModel,
      defaultValueRef,
      getRow,
      getProps,
      formElRef,
      getSchema,
      formActionType,
      prefixCls,
      getActionProps,
      ...formActionType,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-form';

.#{$prefix-cls} {
  position: relative;

  .el-select,
  .el-cascader,
  .el-input {
    width: 100%;
  }
}
</style>
