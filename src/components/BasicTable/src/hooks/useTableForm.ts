import type { ComputedRef, Slots } from 'vue'
import type { BasicTableProps, FetchParams } from '../typing'
import { unref, computed } from 'vue'
import type { FormProps } from '@/components/Form'
import { isFunction } from '@/utils/is'

/**
 * 处理表格表单
 *
 * Handle table form
 * @param propsRef
 * @param slots
 * @param fetch
 * @param getLoading
 */
export function useTableForm(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  fetch: (opt?: FetchParams | undefined) => Promise<void>,
  getLoading: ComputedRef<boolean | undefined>
) {
  const getFormProps = computed((): Partial<FormProps> => {
    const { formConfig } = unref(propsRef)
    const { submitButtonOptions } = formConfig || {}
    return {
      showAdvancedButton: true,
      ...formConfig,
      submitButtonOptions: { loading: unref(getLoading), ...submitButtonOptions },
    }
  })

  /**
   * 获取表单自定义插槽key
   *
   * Get form slot keys
   */
  const getFormSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots)
    const res = keys
      .map((item) => (item.startsWith('form-') ? item : null))
      .filter((item) => !!item) as string[]
    console.log('kkk', k)
    return res.map(k => replaceFormSlotKey(k))
  })

  /**
   * 替换成合法的表单key
   *
   * Replace with a valid form key
   * @param key
   */
  function replaceFormSlotKey(key: string) {
    if (!key) return ''
    console.log('key', key)

    return key?.replace?.(/form\-/, '') || ''
  }

  /**
   * 表单查询提交
   *
   * Search submit
   * @param info
   */
  function handleSearchSubmit(info: Recordable) {
    const { searchFn } = unref(propsRef)
    if (searchFn && isFunction(searchFn)) {
      info = searchFn(info) || info
    }
    fetch({ searchInfo: info, page: 1 })
  }

  return {
    getFormProps,
    getFormSlotKeys,
    replaceFormSlotKey,
    handleSearchSubmit,
  }
}
