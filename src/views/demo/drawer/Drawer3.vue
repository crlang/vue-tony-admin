<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Modal Title"
    width="50%"
    show-footer
    @register="register"
    @confirm="handleConfirm"
  >
    <template #toolbar>
      <ElButton>btn</ElButton>
      <ElButton>btn2</ElButton>
    </template>
    <p v-for="index in 10" :key="index" class="p-20">
      根据屏幕高度自适应
    </p>
    <template #prependFooter>
      <ElButton>left info</ElButton>
    </template>
    <template #centerFooter>
      <ElButton>center info</ElButton>
    </template>
    <template #appendFooter>
      <ElButton>right info</ElButton>
    </template>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const { createMessage } = useMessage()
    const [register, { changeConfirmLoading }] = useDrawerInner()

    function handleConfirm() {
      changeConfirmLoading(true)
      setTimeout(() => {
        changeConfirmLoading(false)
        createMessage.success('点击了提交')
      }, 3e3)
    }

    return { register, handleConfirm }
  },
})
</script>
