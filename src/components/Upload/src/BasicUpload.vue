<template>
  <div>
    <ElButtonGroup>
      <ElButton
        type="primary"
        @click="uploadVisible=true"
        :icon="UploadFilled">
        {{ t('component.upload.upload') }}
      </ElButton>
      <ElTooltip
        placement="bottom"
        v-if="showPreview">
        <template #content>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <ElButton @click="previewVisible=true">
          <Icon
            icon="bi:eye"
            size="12" /> <template v-if="fileList.length && showPreviewNumber"> {{ fileList.length }}</template>
        </ElButton>
      </ElTooltip>
    </ElButtonGroup>

    <UploadModal
      v-bind="bindValue"
      v-model:visible="uploadVisible"
      :previewFileList="fileList"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      v-model:visible="previewVisible"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref, computed } from 'vue'
import { ElButton, ElButtonGroup, ElTooltip } from 'element-plus'
import UploadModal from './UploadModal.vue'
import UploadPreviewModal from './UploadPreviewModal.vue'
import { Icon } from '@/components/Icon'
import { uploadContainerProps } from './props'
import { omit } from 'lodash-es'
import { useI18n } from '@/hooks/web/useI18n'
import { isArray } from '@/utils/is'
import { UploadFilled } from '@element-plus/icons'

export default defineComponent({
  name: 'BasicUpload',
  components: { ElButton, ElButtonGroup, ElTooltip, UploadModal, UploadPreviewModal, Icon },
  props: uploadContainerProps,
  emits: ['change', 'delete', 'preview-delete', 'update:value'],

  setup(props, { emit, attrs }) {
    const { t } = useI18n()

    const uploadVisible = ref(false)
    const previewVisible = ref(false)

    const fileList = ref<string[]>([])

    const showPreview = computed(() => {
      const { emptyHidePreview } = props
      if (!emptyHidePreview) return true
      return emptyHidePreview ? fileList.value.length > 0 : true
    })

    const bindValue = computed(() => {
      const value = { ...attrs, ...props }
      return omit(value, 'onChange', 'visible', 'value', 'showPreviewNumber', 'emptyHidePreview')
    })

    watch(
      () => props.value,
      (value = []) => {
        fileList.value = isArray(value) ? value : []
      },
      { immediate: true }
    )

    // 上传modal保存操作
    function handleChange(urls: string[]) {
      fileList.value = [...unref(fileList), ...(urls || [])]
      emit('update:value', fileList.value)
      emit('change', fileList.value)
    }

    // 预览modal保存操作
    function handlePreviewChange(urls: string[]) {
      fileList.value = [...(urls || [])]
      emit('update:value', fileList.value)
      emit('change', fileList.value)
    }

    function handleDelete(record: Recordable) {
      emit('delete', record)
    }

    function handlePreviewDelete(url: string) {
      emit('preview-delete', url)
    }

    return {
      uploadVisible,
      previewVisible,
      UploadFilled,
      handleChange,
      handlePreviewChange,
      fileList,
      showPreview,
      bindValue,
      handleDelete,
      handlePreviewDelete,
      t,
    }
  },
})
</script>
