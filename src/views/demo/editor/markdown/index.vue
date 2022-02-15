<template>
  <PageWrapper title="MarkDown组件示例">
    <div class="mb-6">
      <Button @click="toggleTheme">黑暗主题</Button>
      <Button @click="clearValue">清空内容</Button>
    </div>

    <MarkDown
      v-model:value="markdownValue"
      @change="handleChange"
      ref="markDownRef"
      placeholder="这是占位文本" />

    <div class="mt-4">
      <el-card header="Markdown Viewer 组件演示">
        <MarkdownViewer :value="markdownValue" />
      </el-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import type { MarkDownActionType } from '@/components/Markdown'

import { defineComponent, ref, unref } from 'vue'
import { ElCard } from 'element-plus'
import { MarkDown, MarkdownViewer } from '@/components/Markdown'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { ElCard, MarkDown, PageWrapper, MarkdownViewer },
  setup() {
    const markDownRef = ref<Nullable<MarkDownActionType>>(null)
    const markdownValue = ref(`
# title

# content
`)
    const themeName = ref<'classic'|'dark'>('dark')

    function toggleTheme() {
      const markDown = unref(markDownRef)
      if (!markDown) return

      const vditor = markDown.getVditor()
      themeName.value = themeName.value === 'dark' ? 'classic' : 'dark'

      vditor.setTheme(themeName.value)
    }

    function handleChange(v: string) {
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
