<template>
  <div>
    <slot name="insertFooter"></slot>
    <el-button
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn">
      {{ cancelText }}
    </el-button>
    <slot name="centerFooter"></slot>
    <el-button
      :type="confirmType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="confirmButtonProps"
      v-if="showConfirmBtn">
      {{ confirmText }}
    </el-button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { basicProps } from '../props'
export default defineComponent({
  name: 'BasicModalFooter',
  props: basicProps,
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
