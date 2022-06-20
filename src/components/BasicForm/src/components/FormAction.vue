<template>
  <ElCol v-bind="actionColOpt">
    <div
      style="width: 100%"
      :style="{ textAlign: actionColOpt?.style?.textAlign }">
      <ElFormItem>
        <slot name="resetBefore"></slot>
        <ElButton
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
          v-if="showResetButton">
          {{ getResetBtnOptions.text }}
        </ElButton>
        <slot name="submitBefore"></slot>

        <ElButton
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
          v-if="showSubmitButton">
          {{ getSubmitBtnOptions.text }}
        </ElButton>

        <slot name="advanceBefore"></slot>
        <ElButton
          type="text"
          size="small"
          @click="toggleAdvanced"
          v-if="showAdvancedButton && !hideAdvanceBtn">
          {{ isAdvanced ? '收起 ' : '展开 ' }}
          <SvgIcon
            :rotate="isAdvanced ? '-90deg' : '90deg'"
            name="arrow-right-bold" />
        </ElButton>
        <slot name="advanceAfter"></slot>
      </ElFormItem>
    </div>
  </ElCol>
</template>

<script lang="ts">
import type { EleCol } from '@/components/ElementPlus'

import { defineComponent, computed } from 'vue'
import { ElFormItem, ElCol, ElButton } from 'element-plus'

import SvgIcon from '@/components/SvgIcon'

import { useFormContext } from '../hooks/useFormContext'
import { formActionProps } from '../props'

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    ElFormItem,
    ElCol,
    ElButton,
    SvgIcon,
  },
  inheritAttrs: false,
  props: formActionProps,
  emits: ['toggle-advanced'],
  setup(props, { emit }) {
    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColProps } = props
      const actionSpan = 24 - span
      const advancedSpanObj = showAdvancedButton
        ? { span: actionSpan < 6 ? 24 : actionSpan }
        : {}
      const actionColOpt: Partial<EleCol> = {
        style: { textAlign: 'right' },
        span: showAdvancedButton ? 6 : 24,
        ...advancedSpanObj,
        ...actionColProps,
      }
      return actionColOpt
    })

    const getResetBtnOptions = computed(() => {
      return Object.assign(
        {
          text: '重置',
        },
        props.resetButtonOptions
      )
    })

    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          text: '查询',
        },
        props.submitButtonOptions
      )
    })

    function toggleAdvanced() {
      emit('toggle-advanced')
    }

    return {
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      toggleAdvanced,
      ...useFormContext(),
    }
  },
})
</script>
