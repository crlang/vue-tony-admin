<template>
  <PageWrapper title="MarkDown组件示例">
    {{ markdownValue }}
    <div>
      <el-button
        @click="toggleTheme"
        class="mb-2"
        type="primary">黑暗主题</el-button>
      <el-button
        @click="clearValue"
        class="mb-2"
        type="default">清空内容</el-button>
      <MarkDown
        v-model:value="markdownValue"
        @change="handleChange"
        ref="markDownRef"
        placeholder="这是占位文本" />
    </div>
    <div class="mt-2">
      <el-card header="Markdown Viewer 组件演示">
        <MarkdownViewer :value="markdownValue" />
      </el-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { MarkDown, MarkDownActionType, MarkdownViewer } from '@/components/Markdown'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { MarkDown, PageWrapper, MarkdownViewer },
  setup() {
    const markDownRef = ref<Nullable<MarkDownActionType>>(null)
    const markdownValue = ref(`
# title

# content
`)

    function toggleTheme() {
      const markDown = unref(markDownRef)
      if (!markDown) return
      const vditor = markDown.getVditor()
      vditor.setTheme('dark')
    }

    function handleChange(v: string) {
      console.log('change', v)
      markdownValue.value = v
    }

    function clearValue() {
      markdownValue.value = ''
    }

    return {
      markdownValue,
      toggleTheme,
      markDownRef,
      handleChange,
      clearValue,
    }
  },
})
</script>
