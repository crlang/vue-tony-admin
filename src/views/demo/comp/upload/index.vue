<template>
  <PageWrapper title="上传组件示例">
    <el-alert
      title="基础示例"
      class="mb-4" />
    <BasicUpload
      @change="handleChange"
      :api="uploadApi"
      :value="uploadList"
      :maxSize="5"
      :maxNumber="3"
      @delete="handleDelete"
      :accept="['png','jpg','jpeg','webp','svg','xlsx']" />

    <el-alert
      type="error"
      class="mt-4"
      title="如果需要演示上传功能,需要在test/server中运行test服务器" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BasicUpload } from '@/components/Upload'
import { useMessage } from '@/hooks/web/useMessage'
import { PageWrapper } from '@/components/Page'
import { uploadApi } from '@/api/sys/upload'

export default defineComponent({
  components: { BasicUpload, PageWrapper },
  setup() {
    const { createMessage } = useMessage()
    const uploadList = ref<string[]>()
    function handleDelete(record: Recordable) {
      console.log('delete', record)
    }
    function handleChange(list: Recordable) {
      createMessage.info(`已上传文件${JSON.stringify(list)}`)
    }

    return {
      uploadList,
      handleChange,
      handleDelete,
      uploadApi,
    }
  },
})
</script>
