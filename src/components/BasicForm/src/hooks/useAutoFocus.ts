import type { ComputedRef, Ref } from 'vue'
import type { BasicFormSchema, FormActionMethods, BasicProps } from '../types/form'

import { unref, nextTick, watchEffect } from 'vue'

interface UseAutoFocusContext {
  getSchema: ComputedRef<BasicFormSchema[]>
  getProps: ComputedRef<BasicProps>
  isInitedDefaultRef: Ref<boolean>
  formElRef: Ref<FormActionMethods>
}

export async function useAutoFocus({
  getSchema,
  getProps,
  formElRef,
  isInitedDefaultRef,
}: UseAutoFocusContext) {
  watchEffect(async () => {
    if (unref(isInitedDefaultRef) || !unref(getProps).autoFocusFirstItem) {
      return
    }
    await nextTick()
    const schemas = unref(getSchema)
    const formEl = unref(formElRef)
    const el = (formEl as any)?.$el as HTMLElement
    if (!formEl || !el || !schemas || schemas.length === 0) {
      return
    }

    const firstItem = schemas[0]
    // Only open when the first form item is input type
    if (!firstItem.component.includes('Input')) {
      return
    }

    const inputEl = el.querySelector('.el-form-item:first-child input') as Nullable<HTMLInputElement>
    if (!inputEl) return
    inputEl?.focus()
  })
}
