<template>
  <ElCol v-bind="actionColOptions">
    <ElFormItem :class="`${prefixCls}-submit-btns`">
      <slot name="resetBefore"></slot>
      <ElButton
        v-if="showResetButton"
        type="default"
        v-bind="resetBtnOptions"
        @click="resetAction"
      >
        {{ resetBtnOptions.btnText || '重置' }}
      </ElButton>

      <slot name="submitBefore"></slot>
      <ElButton
        v-if="showSubmitButton"
        type="primary"
        v-bind="submitBtnOptions"
        @click="submitAction"
      >
        {{ submitBtnOptions.btnText || '查询' }}
      </ElButton>

      <slot name="advanceBefore"></slot>
      <ElButton
        v-if="showAdvancedButton && showAdvanced"
        text
        size="small"
        @click="toggleAdvanced"
      >
        {{ isAdvanced ? '收起 ' : '展开 ' }}
        <SvgIcon class="ml-1" :name="isAdvanced ? 'up' : 'down'" />
      </ElButton>
      <slot name="advanceAfter"></slot>
    </ElFormItem>
  </ElCol>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElButton, ElCol, ElFormItem } from 'element-plus'

import { useFormContext } from '../hooks/useFormContext'
import { formActionProps } from '../props'
import { BASIC_COL_LEN, BASIC_COL_SIZE } from '../const'
import { SvgIcon } from '@/components/SvgIcon'
import type { EleCol } from '@/components/ElementPlus'

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    ElFormItem,
    ElCol,
    ElButton,
    SvgIcon,
  },
  inheritAttrs: false,
  props: {
    ...formActionProps,
    prefixCls: String,
  },
  emits: ['toggleAdvanced'],
  setup(props, { emit }) {
    /**
     * 操作列配置
     */
    const actionColOptions = computed((): Partial<EleCol> => {
      const { showAdvancedButton, actionSpan, actionColProps } = props
      const actSpan = BASIC_COL_LEN - actionSpan
      const advancedSpanObj = showAdvancedButton ? { span: actSpan < BASIC_COL_SIZE ? BASIC_COL_LEN : actSpan } : {}

      return {
        ...advancedSpanObj,
        ...actionColProps,
      }
    })
    /**
     * 重置按钮配置
     */
    const resetBtnOptions = computed(() => {
      return {
        ...props.resetButtonOptions,
      }
    })
    /**
     * 提交按钮配置
     */
    const submitBtnOptions = computed(() => {
      return {
        ...props.submitButtonOptions,
      }
    })

    /**
     * 切换展开/收起
     */
    function toggleAdvanced() {
      emit('toggleAdvanced')
    }

    return {
      actionColOptions,
      resetBtnOptions,
      submitBtnOptions,
      toggleAdvanced,
      ...useFormContext(),
    }
  },
})
</script>
