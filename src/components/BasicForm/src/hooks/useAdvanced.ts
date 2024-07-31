import type { ComputedRef, Ref } from 'vue'

import { unref, watch } from 'vue'

import { BASIC_COL_LEN, BASIC_COL_SIZE } from '../const'
import type { BasicFormProps, BasicFormSchema } from '../types/form'
import type { AdvanceState } from '../types/hooks'
import { useBreakpoint } from '@/hooks/event/useBreakpoint'
import type { EleCol } from '@/components/ElementPlus'

interface UseAdvancedContext {
  advanceState: AdvanceState
  emit: EmitType
  getProps: ComputedRef<BasicFormProps>
  getSchema: ComputedRef<BasicFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
}

/**
 * 处理展开/收起
 */
export function useAdvanced({ advanceState, emit, getProps, getSchema, formModel, defaultValueRef }: UseAdvancedContext) {
  const { realWidthRef, screenEnum } = useBreakpoint()
  let firstLoad = false

  /**
   * 获取展开/收起信息
   */
  function getAdvanced(itemCol: Partial<EleCol>, itemColSum = 0) {
    const width = unref(realWidthRef)

    // 默认列宽
    const mdWidth = Number.parseInt(itemCol.md) || Number.parseInt(itemCol.xs) || Number.parseInt(itemCol.sm) || Number.parseInt(itemCol.span) || BASIC_COL_SIZE

    // 尝试查找是否存在自定义列宽
    const lgWidth = Number.parseInt(itemCol.lg) || mdWidth
    const xlWidth = Number.parseInt(itemCol.xl) || lgWidth
    const xxlWidth = Number.parseInt(itemCol.xxl) || xlWidth

    if (width <= screenEnum.LG) {
      itemColSum += mdWidth
    }
    else if (width < screenEnum.XL) {
      itemColSum += lgWidth
    }
    else if (width < screenEnum.XXL) {
      itemColSum += xlWidth
    }
    else {
      itemColSum += xxlWidth
    }

    const { alwaysShowLines = 1 } = unref(getProps)
    if (itemColSum >= BASIC_COL_LEN * alwaysShowLines) {
      let alwayShow = false

      // 恰好第一行是满行时候的处理
      if (!firstLoad) {
        firstLoad = true
        alwayShow = itemColSum === BASIC_COL_LEN
      }

      return { isAdvanced: alwayShow || advanceState.isAdvanced, itemColSum }
    }
    else {
      // 始终显示第一行
      firstLoad = true
      return { isAdvanced: true, itemColSum }
    }
  }

  /**
   * 更新展开/收起信息
   */
  function updateAdvanced() {
    let itemColSum = 0
    let realItemColSum = 0
    const { colProps = {}, actionColProps = {} } = unref(getProps)
    const baseColProps = colProps
    let isAdvancedRes = false

    for (const schema of unref(getSchema)) {
      const { show, colProps } = schema
      let isShow = true

      if (typeof show === 'boolean') {
        isShow = show
      }

      if (typeof show === 'function') {
        isShow = show({
          schema,
          model: formModel,
          field: schema.field,
          values: {
            ...unref(defaultValueRef),
            ...formModel,
          },
        })
      }

      if (isShow && (colProps || baseColProps)) {
        const { itemColSum: sum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum)

        itemColSum = sum || 0
        if (isAdvanced) {
          realItemColSum = itemColSum
        }
        schema.isAdvanced = isAdvanced
        isAdvancedRes = isAdvanced
        const actSpan = actionColProps?.span || BASIC_COL_SIZE

        advanceState.showAdvanced = itemColSum + actSpan > BASIC_COL_LEN
      }
    }

    advanceState.actionSpan = realItemColSum % BASIC_COL_LEN

    emit('advanced-change', isAdvancedRes)
  }

  /**
   * 切换展开/收起
   */
  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
  }

  watch(
    [() => unref(getSchema), () => advanceState.isAdvanced, () => unref(realWidthRef)],
    () => {
      const { showAdvancedButton } = unref(getProps)
      if (showAdvancedButton) {
        updateAdvanced()
      }
    },
    { immediate: true },
  )

  return { handleToggleAdvanced }
}
