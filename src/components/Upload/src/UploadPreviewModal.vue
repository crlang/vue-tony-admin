<template>
  <BasicModal
    width="800px"
    :visible="visibleRef"
    :title="t('component.upload.preview')"
    @close="visibleRef=false">
    <FileList
      :dataSource="fileListRef"
      :columns="columns"
      :actionColumn="actionColumn" />
    <template #footer>
      <ElButton
        type="default"
        @click="visibleRef=false">{{ t('common.closeText') }}</ElButton>
    </template>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, watchEffect } from 'vue'
//   import { BasicTable, useTable } from '@/components/Table';
import { ElButton } from 'element-plus'
import FileList from './FileList.vue'
import { BasicModal } from '@/components/Modal'
import { previewProps } from './props'
import { PreviewFileItem } from './typing'
import { downloadByUrl } from '@/utils/file/download'
import { createPreviewColumns, createPreviewActionColumn } from './data'
import { useI18n } from '@/hooks/web/useI18n'
import { isArray } from '@/utils/is'

export default defineComponent({
  components: { ElButton, BasicModal, FileList },
  props: previewProps,
  emits: ['list-change', 'update:visible', 'delete'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const visibleRef = ref(false)

    const fileListRef = ref<PreviewFileItem[]>([])
    watch(
      () => props.value,
      (value) => {
        if (!isArray(value)) value = []
        fileListRef.value = value
          .filter((item) => !!item)
          .map((item) => {
            return {
              url: item,
              type: item.split('.').pop() || '',
              name: item.split('/').pop() || '',
            }
          })
      },
      { immediate: true }
    )

    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    watch(
      () => visibleRef.value,
      (v) => {
        emit('update:visible', v)
      },
      {
        immediate: false,
      }
    )

    // 删除
    function handleRemove(record: PreviewFileItem) {
      const index = fileListRef.value.findIndex((item) => item.url === record.url)
      if (index !== -1) {
        const removed = fileListRef.value.splice(index, 1)
        emit('delete', removed[0].url)
        emit(
          'list-change',
          fileListRef.value.map((item) => item.url)
        )
      }
    }

    // // 预览
    // function handlePreview(record: PreviewFileItem) {
    //   const { url = '' } = record;
    //   createImgPreview({
    //     imageList: [url],
    //   });
    // }

    // 下载
    function handleDownload(record: PreviewFileItem) {
      const { url } = record
      downloadByUrl({ url })
    }

    return {
      t,
      visibleRef,
      fileListRef,
      columns: createPreviewColumns() as any[],
      actionColumn: createPreviewActionColumn({ handleRemove, handleDownload }) as any,
    }
  },
})
</script>

<style lang="scss">
.upload-preview-modal {
  position: relative;
}
</style>
