<template>
  <PageWrapper title="上传组件示例">
    <BasicUpload
      :api="ApiUpload"
      show-thumb
      :model-value="uploadList"
      upload-name="file"
      :max-size="5"
      :max-number="3"
      :accept="['png', 'jpg', 'jpeg', 'webp', 'svg']"
      @change="handleChange"
      @delete="handleDelete"
    />

    <ElAlert type="error" class="my-4" title="如果需要演示上传功能,需要在test/server中运行test服务器" />

    <BasicUpload
      :api="ApiUpload"
      :model-value="uploadList"
      upload-name="file"
      :max-size="5"
      :max-number="3"
      :accept="['png', 'jpg', 'jpeg', 'webp', 'svg']"
      @change="handleChange"
      @delete="handleDelete"
    />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElAlert } from 'element-plus'

import { BasicUpload } from '@/components/BasicUpload'
import { useMessage } from '@/hooks/web/useMessage'
import { ApiUpload } from '@/api/upload'

export default defineComponent({
  components: { ElAlert, BasicUpload },
  setup() {
    const { createMessage } = useMessage()
    const uploadList = ref<string[]>()

    function handleDelete(_record: Recordable) {
      createMessage.info(`移除文件`)
    }
    function handleChange(_list: Recordable) {
      createMessage.info(`已上传文件`)
    }

    return {
      uploadList,
      handleChange,
      handleDelete,
      ApiUpload,
    }
  },
})
</script>
