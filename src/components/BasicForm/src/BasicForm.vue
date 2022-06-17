<template>
  <ElForm
    v-bind="getBindValues"
    :class="prefixCls"
    ref="formElRef"
    :model="formModel"
    @keypress.enter="handleEnterPress">
    <slot name="formHeader"></slot>
    <ElRow v-bind="getRow">
      <template
        v-for="schema in getSchema"
        :key="schema.field">
        <FormItem
          :tableAction="tableAction"
          :formActionType="formActionType"
          :schema="schema"
          :formProps="getProps"
          :defaultValues="defaultValueRef"
          :formModel="formModel"
          :setFormModel="setFormModel">
          <template
            #[item]="data"
            v-for="item in Object.keys($slots)">
            <slot
              :name="item"
              v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>

      <FormAction
        v-bind="getActionProps"
        @toggle-advanced="handleToggleAdvanced">
        <template
          #[item]="data"
          v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
          <slot
            :name="item"
            v-bind="data || {}"></slot>
        </template>
      </FormAction>
    </ElRow>
    <slot name="formFooter"></slot>
  </ElForm>
</template>

<script lang="ts">
import type { FormActionMethods, BasicProps, BasicFormSchema } from './types/form'
import type { AdvanceState } from './types/hooks'

import { defineComponent, reactive, ref, computed, unref, onMounted, watch, nextTick } from 'vue'
import { ElForm, ElRow } from 'element-plus'
import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'

import { useFormValues } from './hooks/useFormValues'
import { useAdvanced } from './hooks/useAdvanced'
import { useBasicFormFn } from './hooks/useBasic'
import { useFormEvents } from './hooks/useFormEvents'
import { createFormContext } from './hooks/useFormContext'
import { useModalContext } from '@/components/BasicModal'

import { basicProps, customProps } from './props'
import { BASIC_ROW_GUTTER } from './const'
import { useDesign } from '@/hooks/web/useDesign'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'BasicForm',
  components: { ElForm, FormItem, FormAction, ElRow },
  props: basicProps,
  emits: ['advanced-change', 'reset', 'submit', 'register', 'validate'],
  setup(props, { emit, attrs }) {
    const formElRef = ref<Nullable<FormActionMethods>>(null)
    const formModel = reactive<Recordable>({})
    const propsRef = ref<Partial<BasicProps>>({})
    const schemaRef = ref<BasicFormSchema[]>([])
    const modalFn = useModalContext()
    const isInitedDefaultRef = ref(false)
    const defaultValueRef = ref<Recordable>({})

    const { prefixCls } = useDesign('basic-form')
    const advanceState = reactive<AdvanceState>({
      isAdvanced: false,
      hideAdvanceBtn: false,
      actionSpan: 6,
    })

    const {
      validate,
      validateField,
      resetFields,
      scrollToField,
      clearValidate,
      getBasicEmits,
    } = useBasicFormFn({
      formElRef,
      emit,
    })

    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      const opts = {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicProps

      return opts
    })
    /**
     * 表单全局的行的配置
     *
     * Form global row configuration
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
     *
     * Bind form action props
     */
    const getActionProps = computed((): Recordable => {
      return {
        ...unref(getProps),
        ...advanceState,
      }
    })
    /**
     * 绑定表单Props
     *
     * Bind form props
     */
    const getBindValues = computed(() => {
      const opts = {
        ...attrs,
        ...getBasicEmits,
        ...unref(getProps),
      }

      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts)
    })
    /**
     * 获取并处理表单数据结构
     *
     * Get and process the form data structure
     */
    const getSchema = computed((): BasicFormSchema[] => {
      const schemas = unref(schemaRef)?.length ? unref(schemaRef) : (unref(getProps).schemas || [])

      if (unref(getProps).showAdvancedButton) {
        return schemas.filter((schema) => schema.component !== 'ElDivider')
      } else {
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

    const {
      handleSubmit,
      handleReset,
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByField,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      validate,
      clearValidate,
      handleFormValues,
    })

    createFormContext({
      resetAction: handleReset,
      submitAction: handleSubmit,
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param formProps Form Props
     */
    function setFormProps(formProps: Partial<BasicProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...formProps } as Recordable
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      // const { validateTrigger } = unref(getBindValues)
      // if (!validateTrigger || validateTrigger === 'change') {
      //   validateField([key]).catch((_) => {})
      // }
    }

    function handleEnterPress(e: KeyboardEvent) {
      const { autoSubmitOnEnter } = unref(getProps)
      if (!autoSubmitOnEnter) return

      if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        const target: HTMLElement = e.target as HTMLElement
        if (target && target.tagName && target.tagName.toUpperCase() === 'INPUT') {
          handleSubmit()
        }
      }
    }

    const formActionType: FormActionMethods | undefined = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      reset: handleReset,
      updateSchema,
      resetSchema,
      setFormProps,
      removeSchemaByField,
      appendSchemaByField,
      clearValidate,
      validateField,
      validate,
      submit: handleSubmit,
      scrollToField,
    }

    onMounted(() => {
      initDefault()
      emit('register', formActionType)
    })

    // watch(
    //   () => unref(getProps).model,
    //   (v) => {
    //     v && setFieldsValue(v)
    //   }
    // )

    // watch(
    //   () => unref(getProps).schemas,
    //   (schemas) => {
    //     resetSchema(schemas ?? [])
    //   }
    // )

    watch(
      () => getSchema.value,
      (schema) => {
        if (!unref(isInitedDefaultRef) && schema?.length) {
          initDefault()
          isInitedDefaultRef.value = true
        }

        nextTick(() => {
          try {
            modalFn?.redoModalHeight()
          } catch (error) {
            // try redo modal height
          }
        })
      }
    )

    return {
      getBindValues,
      handleToggleAdvanced,
      handleEnterPress,
      formModel,
      defaultValueRef,
      getRow,
      getProps,
      formElRef,
      getSchema,
      formActionType,
      setFormModel,
      prefixCls,
      getActionProps,
      getFormActionBindProps: computed(
        (): Recordable => ({ ...getProps.value, ...advanceState })
      ),
      ...formActionType,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-form';

.#{$prefix-cls} {
  position: relative;

  .el-col {
    .el-input {
      width: 100%;
    }
  }
}
</style>
