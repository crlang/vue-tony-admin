<template>
  <PageWrapper
    title="密码强度校验组件"
    content-background>
    <ElAlert
      title="默认"
      class="my-6" />
    <StrengthMeter />
    <ElAlert
      class="my-6"
      title="隐藏 input" />
    <StrengthMeter
      placeholder=""
      :show-input="false"
      value="!@#qwe12345" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert } from 'element-plus'
import { StrengthMeter } from '@/components/StrengthMeter'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: {
    ElAlert,
    StrengthMeter,
    PageWrapper,
  },
})
</script>
