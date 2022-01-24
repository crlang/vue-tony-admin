<template>
  <BasicModal
    :visible="visibleRef"
    :title="t('component.upload.upload')"
    :width="800"
    @close="handleCloseFunc">

    <template #footer>
      <ElButton
        @click="handleStartUpload"
        type="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef">
        {{ getUploadBtnText }}
      </ElButton>

      <ElButton
        type="default"
        @click="handleCloseFunc">{{ t('common.closeText') }}</ElButton>
      <ElButton v-bind="getConfirmButtonProps">{{ t('component.upload.save') }}</ElButton>
    </template>

    <div class="upload-modal-toolbar">
      <ElAlert
        :title="getHelpText"
        type="info"
        :closable="false"
        class="upload-modal-toolbar__text" />

      <ElUpload
        action="NotUrl"
        :accept="getStringAccept"
        :multiple="multiple"
        :limit="maxNumber"
        :disabled="disabled || getChooseButtonProps.disabled"
        :show-file-list="false"
        :before-upload="beforeUpload"
        class="upload-modal-toolbar__btn"><ElButton v-bind="getChooseButtonProps">{{ t('component.upload.choose') }}</ElButton></ElUpload>

    </div>

    <FileList
      :dataSource="fileListRef"
      :columns="columns"
      :actionColumn="actionColumn" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, unref, computed, PropType, watchEffect, watch } from 'vue'
import { ElButton, ElUpload, ElAlert } from 'element-plus'
import { BasicModal } from '@/components/Modal'
// hooks
import { useUploadType } from './useUpload'
import { useMessage } from '@/hooks/web/useMessage'
//   types
import { FileItem, UploadResultStatus } from './typing'
import { basicProps } from './props'
import { createTableColumns, createActionColumn } from './data'
// utils
import { checkFileType, checkImgType, getBase64WithFile } from './helper'
import { buildUUID } from '@/utils/uuid'
import { isFunction } from '@/utils/is'
import { warn } from '@/utils/log'
import FileList from './FileList.vue'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  components: { ElButton, ElUpload, ElAlert, BasicModal, FileList },
  props: {
    ...basicProps,
    previewFileList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['change', 'delete', 'update:visible'],
  setup(props, { emit }) {
    const visibleRef = ref(false)

    const state = reactive<{ fileList: FileItem[] }>({
      fileList: [],
    })

    //   是否正在上传
    const isUploadingRef = ref(false)
    const fileListRef = ref<FileItem[]>([])
    const { accept, helpText, maxNumber, maxSize } = toRefs(props)

    const { t } = useI18n()

    const { getAccept, getStringAccept, getHelpText } = useUploadType({
      acceptRef: accept,
      helpTextRef: helpText,
      maxNumberRef: maxNumber,
      maxSizeRef: maxSize,
    })

    const { createMessage, createConfirm } = useMessage()

    const getIsSelectFile = computed(() => {
      return (
        fileListRef.value.length > 0 && !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
      )
    })

    const getConfirmButtonProps = computed(() => {
      const someSuccess = fileListRef.value.some((item) => item.status === UploadResultStatus.SUCCESS)
      return {
        type: 'primary',
        disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
        onClick: handleOk,
      }
    })

    const getChooseButtonProps = computed(() => {
      const { maxNumber, previewFileList } = props
      return {
        type: 'primary',
        disabled: (fileListRef.value.length + previewFileList?.length ?? 0) >= maxNumber,
      }
    })

    const getUploadBtnText = computed(() => {
      const someError = fileListRef.value.some((item) => item.status === UploadResultStatus.ERROR)
      return isUploadingRef.value
        ? t('component.upload.uploading')
        : someError
          ? t('component.upload.reUploadFailed')
          : t('component.upload.startUpload')
    })

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

    // 上传前校验
    function beforeUpload(file: File) {
      const { size, name } = file
      const { maxSize, maxNumber, previewFileList } = props
      const accept = unref(getAccept)
      // 设置最大值，则判断
      if (maxSize && file.size / 1024 / 1024 >= maxSize) {
        createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]))
        return false
      }

      // 设置类型,则判断
      if (accept.length > 0 && !checkFileType(file, accept)) {
        createMessage.error!(t('component.upload.acceptUpload', [accept.join(',')]))
        return false
      }

      if ((fileListRef.value.length + previewFileList?.length ?? 0) >= maxNumber) {
        createMessage.error(t('component.upload.maxNumber', [maxNumber]))
        return false
      }

      const commonItem = {
        uuid: buildUUID(),
        file,
        size,
        name,
        percent: 0,
        type: name.split('.').pop(),
      }
      // 生成图片缩略图
      if (checkImgType(file)) {
        // beforeUpload，如果异步会调用自带上传方法
        // file.thumbUrl = await getBase64(file);
        getBase64WithFile(file).then(({ result: thumbUrl }) => {
          fileListRef.value = [
            ...unref(fileListRef),
            {
              thumbUrl,
              ...commonItem,
            },
          ]
        })
      } else {
        fileListRef.value = [...unref(fileListRef), commonItem]
      }
      return false
    }

    // 删除
    function handleRemove(record: FileItem) {
      const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid)
      index !== -1 && fileListRef.value.splice(index, 1)
      emit('delete', record)
    }

    async function uploadApiByItem(item: FileItem) {
      const { api } = props
      if (!api || !isFunction(api)) {
        return warn('upload api must exist and be a function')
      }
      try {
        item.status = UploadResultStatus.UPLOADING
        const { data } = await props.api({
          ...(props.uploadParams || {}),
          file: item.file,
        },
        function onUploadProgress(progressEvent: ProgressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          item.percent = complete
        })
        item.status = UploadResultStatus.SUCCESS
        item.responseData = data
        return {
          success: true,
          error: null,
        }
      } catch (e) {
        console.log(e)
        item.status = UploadResultStatus.ERROR
        return {
          success: false,
          error: e,
        }
      }
    }

    // 点击开始上传
    async function handleStartUpload() {
      const { maxNumber } = props
      if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
        return createMessage.warning(t('component.upload.maxNumber', [maxNumber]))
      }
      try {
        isUploadingRef.value = true
        // 只上传不是成功状态的
        const uploadFileList = fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || []
        const data = await Promise.all(
          uploadFileList.map((item) => {
            return uploadApiByItem(item)
          })
        )
        isUploadingRef.value = false
        // 生产环境:抛出错误
        const errorList = data.filter((item: any) => !item.success)
        if (errorList.length > 0) throw errorList
      } catch (e) {
        isUploadingRef.value = false
        throw e
      }
    }

    //   点击保存
    function handleOk() {
      const { maxNumber } = props

      if (fileListRef.value.length > maxNumber) {
        return createMessage.warning(t('component.upload.maxNumber', [maxNumber]))
      }
      if (isUploadingRef.value) {
        return createMessage.warning(t('component.upload.saveWarn'))
      }
      const fileList: string[] = []

      for (const item of fileListRef.value) {
        const { status, responseData } = item
        if (status === UploadResultStatus.SUCCESS && responseData) {
          fileList.push(responseData.url)
        }
      }
      // 存在一个上传成功的即可保存
      if (fileList.length <= 0) {
        return createMessage.warning(t('component.upload.saveError'))
      }
      fileListRef.value = []
      visibleRef.value = false
      emit('change', fileList)
    }

    // 点击关闭：则所有操作不保存，包括上传的
    function handleCloseFunc() {
      console.log('isUploadingRef', isUploadingRef.value)
      if (!isUploadingRef.value) {
        if (fileListRef.value?.length) {
          createConfirm({
            title: t('common.operationTipText'),
            content: t('component.upload.closeUploadList'),
          }).then(() => {
            fileListRef.value = []
            visibleRef.value = false
          }).catch(() => {})
        } else {
          fileListRef.value = []
          visibleRef.value = false
        }
      } else {
        createMessage.warning(t('component.upload.uploadWait'))
      }
    }

    return {
      visibleRef,
      columns: createTableColumns() as any[],
      actionColumn: createActionColumn(handleRemove) as any,
      getHelpText,
      getStringAccept,
      getConfirmButtonProps,
      getChooseButtonProps,
      beforeUpload,
      fileListRef,
      state,
      isUploadingRef,
      handleStartUpload,
      handleOk,
      handleCloseFunc,
      getIsSelectFile,
      getUploadBtnText,
      t,
    }
  },
})
</script>

<style lang="scss">
.upload-modal {

  &-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &__btn {
      margin-left: 8px;
      text-align: right;
      flex: 1;
    }
  }
}
</style>
