import type { BasicProps, FormActionMethods, UseFormReturnType, BasicFormSchema } from '../types/form'
import type { DynamicProps } from '#/utils'

import { ref, onUnmounted, unref, nextTick, watch } from 'vue'
import { isProdMode } from '@/utils/env'
import { error } from '@/utils/log'
import { getDynamicProps } from '@/utils'

type Props = Partial<DynamicProps<BasicProps>>

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionMethods>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)

  async function getForm() {
    const form = unref(formRef)
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    await nextTick()
    return form as FormActionMethods
  }

  function register(instance: FormActionMethods) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null
        loadedRef.value = null
      })
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return

    formRef.value = instance
    loadedRef.value = true

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true,
      }
    )
  }

  const methods: FormActionMethods = {
    // Element Plus
    submit: async (): Promise<any> => {
      const form = await getForm()
      return form.submit()
    },
    validate: async (): Promise<Recordable> => {
      const form = await getForm()
      return form.validate()
    },
    validateField: async (name?: string | string[]): Promise<Recordable> => {
      const form = await getForm()
      return form.validateField(name)
    },
    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields()
      })
    },
    clearValidate: async (name?: string | string[]) => {
      const form = await getForm()
      form.clearValidate(name)
    },
    scrollToField: async (name: string) => {
      const form = await getForm()
      form.scrollToField(name)
    },
    // Advanced
    setProps: async (formProps: Partial<BasicProps>) => {
      const form = await getForm()
      form.setProps(formProps)
    },

    updateSchema: async (data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) => {
      const form = await getForm()
      form.updateSchema(data)
    },

    resetSchema: async (data: Partial<BasicFormSchema> | Partial<BasicFormSchema>[]) => {
      const form = await getForm()
      form.resetSchema(data)
    },

    removeSchemaByField: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByField(field)
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm()
      form.setFieldsValue<T>(values)
    },

    appendSchemaByField: async (
      schema: BasicFormSchema,
      prefixField: string | undefined,
      first: boolean
    ) => {
      const form = await getForm()
      form.appendSchemaByField(schema, prefixField, first)
    },
  }

  return [register, methods]
}
