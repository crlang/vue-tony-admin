<template>
  <div>
    <slot name="insertFooter"></slot>
    <ElButton
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn">
      {{ cancelText }}
    </ElButton>
    <slot name="centerFooter"></slot>
    <ElButton
      :type="confirmType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="confirmButtonProps"
      v-if="showConfirmBtn">
      {{ confirmText }}
    </ElButton>
    <slot name="appendFooter"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { basicProps } from '../props'

export default defineComponent({
  name: 'BasicModalFooter',
  components: { ElButton },
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
