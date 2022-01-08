<template>
  <ElForm
    v-bind="getBindValue"
    :class="getFormClass"
    ref="formElRef"
    :model="formModel"
    @keypress.enter="handleEnterPress">
    <ElRow v-bind="getRow">
      <slot name="formHeader"></slot>
      <template
        v-for="schema in getSchema"
        :key="schema.field">
        <FormItem
          :tableAction="tableAction"
          :formActionType="formActionType"
          :schema="schema"
          :formProps="getProps"
          :allDefaultValues="defaultValueRef"
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
        v-bind="getFormActionBindProps"
        @toggle-advanced="handleToggleAdvanced">
        <template
          #[item]="data"
          v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
          <slot
            :name="item"
            v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </ElRow>
  </ElForm>
</template>

<script lang="ts">
import type { FormActionType, FormProps, FormSchema } from './types/form'
import type { AdvanceState } from './types/hooks'
import type { Ref } from 'vue'

import { defineComponent, reactive, ref, computed, unref, onMounted, watch, nextTick } from 'vue'

import { ElForm, ElRow } from 'element-plus'
import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'

// import { dateItemType } from './helper'
// import { dateUtil } from '@/utils/dateUtil'

// import { cloneDeep } from 'lodash-es';
import { deepMerge } from '@/utils'

import { useFormValues } from './hooks/useFormValues'
import useAdvanced from './hooks/useAdvanced'
import { useFormEvents } from './hooks/useFormEvents'
import { createFormContext } from './hooks/useFormContext'
import { useAutoFocus } from './hooks/useAutoFocus'
import { useModalContext } from '@/components/Modal'

import { basicProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicForm',
  components: { ElForm, FormItem, FormAction, ElRow },
  props: basicProps,
  emits: ['advanced-change', 'reset', 'submit', 'register'],
  setup(props, { emit, attrs }) {
    const formModel = reactive<Recordable>({})
    const modalFn = useModalContext()

    const advanceState = reactive<AdvanceState>({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 6,
    })

    const defaultValueRef = ref<Recordable>({})
    const isInitedDefaultRef = ref(false)
    const propsRef = ref<Partial<FormProps>>({})
    const schemaRef = ref<Nullable<FormSchema[]>>(null)
    const formElRef = ref<Nullable<FormActionType>>(null)

    const { prefixCls } = useDesign('basic-form')

    // Get the basic configuration of the form
    const getProps = computed((): FormProps => {
      return { ...props, ...unref(propsRef) } as FormProps
    })

    const getFormClass = computed(() => {
      return [
        prefixCls,
      ]
    })

    // Get uniform row style and Row configuration for the entire form
    const getRow = computed((): Recordable => {
      const { baseRowStyle = {}, rowProps } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps,
      }
    })

    const getBindValue = computed(
      () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable)
    )

    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any)
      // for (const schema of schemas) {
      // const { defaultValue, component } = schema
      // handle date type
      // if (defaultValue && dateItemType.includes(component)) {
      //   if (!Array.isArray(defaultValue)) {
      //     schema.defaultValue = dateUtil(defaultValue)
      //   } else {
      //     const def: moment.Moment[] = []
      //     defaultValue.forEach((item) => {
      //       def.push(dateUtil(item))
      //     })
      //     schema.defaultValue = def
      //   }
      // }
      // }
      if (unref(getProps).showAdvancedButton) {
        return schemas.filter((schema) => schema.component !== 'ElDivider') as FormSchema[]
      } else {
        return schemas as FormSchema[]
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

    useAutoFocus({
      getSchema,
      getProps,
      isInitedDefault: isInitedDefaultRef,
      formElRef: formElRef as Ref<FormActionType>,
    })

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateField,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByField,
      resetFields,
      scrollToField,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formElRef as Ref<FormActionType>,
      schemaRef: schemaRef as Ref<FormSchema[]>,
      handleFormValues,
    })

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit,
    })

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps)
        if (!model) return
        setFieldsValue(model)
      },
      {
        immediate: true,
      }
    )

    watch(
      () => unref(getProps).schemas,
      (schemas) => {
        resetSchema(schemas ?? [])
      }
    )

    watch(
      () => getSchema.value,
      (schema) => {
        nextTick(() => {
          //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
          modalFn?.redoModalHeight?.()
        })
        if (unref(isInitedDefaultRef)) {
          return
        }
        if (schema?.length) {
          initDefault()
          isInitedDefaultRef.value = true
        }
      }
    )

    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      const { validateTrigger } = unref(getBindValue)
      if (!validateTrigger || validateTrigger === 'change') {
        validateField([key]).catch((_) => {})
      }
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

    const formActionType: Partial<FormActionType> = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      updateSchema,
      resetSchema,
      setProps,
      removeSchemaByField,
      appendSchemaByField,
      clearValidate,
      validateField,
      validate,
      submit: handleSubmit,
      scrollToField: scrollToField,
    }

    onMounted(() => {
      initDefault()
      emit('register', formActionType)
    })

    return {
      getBindValue,
      handleToggleAdvanced,
      handleEnterPress,
      formModel,
      defaultValueRef,
      advanceState,
      getRow,
      getProps,
      formElRef,
      getSchema,
      formActionType: formActionType as any,
      setFormModel,
      getFormClass,
      getFormActionBindProps: computed(
        (): Recordable => ({ ...getProps.value, ...advanceState })
      ),
      ...formActionType,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-basic-form';

.#{$prefix-cls} {
  position: relative;
}
</style>
