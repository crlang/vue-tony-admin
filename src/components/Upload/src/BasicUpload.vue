<template>
  <div>
    <ElButtonGroup>
      <ElButton
        type="primary"
        @click="openUploadModal()"
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
        <ElButton @click="openPreviewModal()">
          <Icon
            icon="bi:eye"
            size="12" /> <template v-if="fileList.length && showPreviewNumber"> {{ fileList.length }}</template>
        </ElButton>
      </ElTooltip>
    </ElButtonGroup>

    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete" />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete" />
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
import { useModal } from '@/components/Modal'

export default defineComponent({
  name: 'BasicUpload',
  components: { ElTooltip, ElButton, ElButtonGroup, UploadModal, UploadPreviewModal, Icon },
  props: uploadContainerProps,
  emits: ['change', 'delete', 'preview-delete', 'update:value'],

  setup(props, { emit, attrs }) {
    const { t } = useI18n()
    const [registerUploadModal, { openModal: openUploadModal }] = useModal()

    const [registerPreviewModal, { openModal: openPreviewModal }] = useModal()

    const fileList = ref<string[]>([])

    const showPreview = computed(() => {
      const { emptyHidePreview } = props
      if (!emptyHidePreview) return true
      return emptyHidePreview ? fileList.value.length > 0 : true
    })

    const bindValue = computed(() => {
      const value = { ...attrs, ...props }
      return omit(value, 'onChange', 'modelValue')
    })

    watch(
      () => props.modelValue,
      (value = []) => {
        fileList.value = isArray(value) ? value : []
      },
      { immediate: true },
    )

    function handleChange(urls: string[]) {
      fileList.value = [...unref(fileList), ...(urls || [])]
      emit('update:value', fileList.value)
      emit('change', fileList.value)
    }

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
      registerUploadModal,
      openUploadModal,
      handleChange,
      handlePreviewChange,
      registerPreviewModal,
      openPreviewModal,
      UploadFilled,
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
