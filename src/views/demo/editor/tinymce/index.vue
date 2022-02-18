<template>
  <PageWrapper title="富文本组件示例">
    <Tinymce
      v-model:modelValue="value"
      @change="handleChange"
      width="100%" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tinymce } from '@/components/Tinymce'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { Tinymce, PageWrapper },
  setup() {
    const value = ref('hello world!')

    function handleChange(value: string) {
      console.table(value)
    }
    return { handleChange, value }
  },
})
</script>
