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
import type { Ref } from 'vue'
import type dayjs from 'dayjs'

import { defineComponent, reactive, ref, computed, unref, onMounted, watch, nextTick } from 'vue'
import { ElForm, ElRow } from 'element-plus'
import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'

import { dateItemType } from './helper'
import { dateUtil } from '@/utils/dateUtil'

// import { cloneDeep } from 'lodash-es';
import { deepMerge } from '@/utils'

import { useFormValues } from './hooks/useFormValues'
import useAdvanced from './hooks/useAdvanced'
import { useFormEvents } from './hooks/useFormEvents'
import { createFormContext } from './hooks/useFormContext'
import { useAutoFocus } from './hooks/useAutoFocus'
import { useModalContext } from '@/components/BasicModal'

import { basicProps, customProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'BasicForm',
  components: { ElForm, FormItem, FormAction, ElRow },
  props: basicProps,
  emits: ['advanced-change', 'reset', 'submit', 'register'],
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
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 6,
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

    // Get uniform row style and Row configuration for the entire form
    const getRow = computed((): Recordable => {
      const { rowStyle = {}, rowProps } = unref(getProps)
      return {
        style: rowStyle,
        ...rowProps,
      }
    })
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
        ...unref(getProps),
      }

      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts)
    })

    const getSchema = computed((): BasicFormSchema[] => {
      const schemas = unref(schemaRef)?.length ? unref(schemaRef) : (unref(getProps).schemas || [])
      for (const schema of schemas) {
        const { defaultValue, component } = schema
        // handle date type
        if (defaultValue && dateItemType.includes(component)) {
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = dateUtil(defaultValue)
          } else {
            const def: dayjs.ConfigType[] = []
            defaultValue.forEach((item) => {
              def.push(dateUtil(item))
            })
            schema.defaultValue = def
          }
        }
      }
      if (unref(getProps).showAdvancedButton) {
        return schemas.filter((schema) => schema.component !== 'ElDivider') as BasicFormSchema[]
      } else {
        return schemas as BasicFormSchema[]
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
      isInitedDefaultRef,
      formElRef: formElRef as Ref<FormActionMethods>,
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
      formElRef: formElRef as Ref<FormActionMethods>,
      schemaRef,
      handleFormValues,
    })

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit,
    })

    async function setProps(formProps: Partial<BasicProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      // const { validateTrigger } = unref(getBindValues)
      // if (!validateTrigger || validateTrigger === 'change') {
      //   console.log('validateTrigger+++++', validateTrigger, key)
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

    const formActionType: Partial<FormActionMethods> = {
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
}
</style>
