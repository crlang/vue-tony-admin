<template>
  <div
    :class="customClass"
    v-if="showFooter">
    <slot name="insertFooter"></slot>
    <ElButton
      v-bind="cancelButton"
      @click="handleCancel"
      v-if="showCancel">{{ cancelText }}</ElButton>
    <slot name="centerFooter"></slot>
    <ElButton
      v-bind="confirmButton"
      @click="handleOk"
      v-if="showConfirm">{{ confirmText }}</ElButton>
    <slot name="appendFooter"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { footerProps } from '../props'

export default defineComponent({
  name: 'BasicModalFooter',
  components: { ElButton },
  inheritAttrs: false,
  props: {
    ...footerProps,
    customClass: { type: String },
  },
  emits: ['ok', 'cancel'],
  setup(_, { emit }) {
    function handleOk(e: Event) {
      emit('ok', e)
    }

    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    return { handleOk, handleCancel }
  },
})
</script>
