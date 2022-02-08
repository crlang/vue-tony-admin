<template>
  <div
    :class="`${prefixCls}-footer`"
    :style="{'height':height}"
    v-if="showFooter">
    <template v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>

    <template v-else>
      <slot name="insertFooter"></slot>
      <ElButton
        @click="handleClose"
        v-if="showCancelBtn">
        {{ cancelText }}
      </ElButton>
      <slot name="centerFooter"></slot>
      <ElButton
        :type="confirmType"
        @click="handleOk"
        :loading="confirmLoading"
        v-if="showConfirmBtn">
        {{ confirmText }}
      </ElButton>
      <slot name="appendFooter"></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { footerProps } from '../props'

export default defineComponent({
  name: 'BasicDrawerFooter',
  components: { ElButton },
  inheritAttrs: false,
  props: {
    ...footerProps,
    prefixCls: { type: String },
    height: {
      type: String,
      default: '60px',
    },
  },
  emits: ['ok', 'close'],
  setup(_, { emit }) {
    function handleOk() {
      emit('ok')
    }

    function handleClose() {
      emit('close')
    }
    return { handleOk, handleClose }
  },
})
</script>
