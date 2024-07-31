<template>
  <BasicModal title="Modal Title" :help-message="['提示1', '提示2']" @register="register">
    <ElButton type="primary" class="mr-2" @click="closeModal()">从内部关闭弹窗</ElButton>
    <ElButton type="primary" @click="setModalProps">从内部修改title</ElButton>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicModal, useModalInner } from '@/components/BasicModal'

export default defineComponent({
  components: { ElButton, BasicModal },
  setup() {
    const [register, { closeModal, setModalProps }] = useModalInner()

    return {
      register,
      closeModal,
      setModalProps: () => {
        setModalProps({ title: 'Modal New Title' })
      },
    }
  },
})
</script>
