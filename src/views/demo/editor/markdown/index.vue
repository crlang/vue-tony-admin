<template>
  <MarkdownViewer :modelValue="markdownValue" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MarkdownViewer } from '@/components/Markdown'

export default defineComponent({
  components: { MarkdownViewer },
  setup() {
    const markdownValue = ref(`
# title

# content
`)

    return {
      markdownValue,
    }
  },
})
</script>
