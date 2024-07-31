<template>
  <BasicModal
    title="预览"
    v-bind="$attrs"
    :width="800"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :class="prefixCls"
    :show-cancel-btn="false"
    :show-confirm-btn="false"
    @register="register"
  >
    <FileList :data-source="fileListRef" :columns="columns" :action-column="actionColumn" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { FileBasicColumn, PreviewFileItem } from '../typing'

import { createPreviewActionColumn, createPreviewColumns } from '../data'
import FileList from './FileList.vue'
import { BasicModal, useModalInner } from '@/components/BasicModal'
import { downloadByOnlineUrl } from '@/utils/file/download'

export default defineComponent({
  components: { BasicModal, FileList },
  props: {
    prefixCls: String,
  },
  emits: ['listChange', 'register', 'delete'],
  setup(_, { emit }) {
    const fileListRef = ref<PreviewFileItem[]>([])

    const [register, { closeModal }] = useModalInner((data: string[]) => {
      // 接收 BasicUpload 页面传递过来的 data
      fileListRef.value = data
        .filter(item => !!item)
        .map((item) => {
          return {
            url: item,
            type: item.split('.').pop() || '',
            name: item.split('/').pop() || '-',
          }
        })
    })

    /**
     * 点击移除
     */
    function handleRemove(record: PreviewFileItem) {
      const index = fileListRef.value.findIndex(item => item.url === record.url)
      if (index !== -1) {
        const removed = fileListRef.value.splice(index, 1)
        // 返回移除项
        emit('delete', removed[0].url)
        // 返回剩余未移除项
        emit(
          'listChange',
          fileListRef.value.map(item => item.url),
        )
      }
    }
    /**
     * 点击下载
     *
     * @param record
     */
    function handleDownload(record: PreviewFileItem) {
      const { url, name } = record
      downloadByOnlineUrl(url, name)
    }

    return {
      register,
      closeModal,
      fileListRef,
      columns: createPreviewColumns() as FileBasicColumn[],
      actionColumn: createPreviewActionColumn({ handleRemove, handleDownload }) as FileBasicColumn,
    }
  },
})
</script>
