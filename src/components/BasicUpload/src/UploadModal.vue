<template>
  <BasicModal
    title="'上传'"
    okText="保存"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    wrapClassName="upload-modal"
    :confirmButton="getOkButtonProps"
    :cancelButton="{ disabled: isUploadingRef }">

    <template #centerFooter>
      <el-button
        @click="handleStartUpload"
        type="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef">
        {{ getUploadBtnText }}
      </el-button>
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
        :disabled="isUploadingRef || (fileListRef.length+
          previewFileList.length) >= maxNumber"
        :show-file-list="false"
        :before-upload="beforeUpload"
        class="upload-modal-toolbar__btn"><ElButton
          type="primary"
          :disabled="isUploadingRef || (fileListRef.length+
            previewFileList.length) >= maxNumber">选择文件</ElButton></ElUpload>
    </div>

    <FileList
      :dataSource="fileListRef"
      :columns="columns"
      :actionColumn="actionColumn" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, unref, computed, PropType } from 'vue'
import { ElButton, ElUpload, ElAlert } from 'element-plus'
import { BasicModal, useModalInner } from '@/components/BasicModal'
// hooks
import { useUploadType } from './useUpload'
import { useMessage } from '@/hooks/web/useMessage'
//   types
import { FileItem, UploadResultStatus } from './typing'
import { basicProps } from './props'
import { createTableColumns, createActionColumn } from './data'
// utils
import { checkFileType, checkImgType, getBase64WithFile } from './helper'
import { buildUUID } from '@/utils'
import { isFunction } from '@/utils/is'
import { warn } from '@/utils/log'
import FileList from './FileList.vue'

export default defineComponent({
  components: { ElButton, ElUpload, ElAlert, BasicModal, FileList },
  props: {
    ...basicProps,
    previewFileList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['change', 'register', 'delete'],
  setup(props, { emit }) {
    const state = reactive<{ fileList: FileItem[] }>({
      fileList: [],
    })

    const isUploadingRef = ref(false)
    const fileListRef = ref<FileItem[]>([])
    const { accept, helpText, maxNumber, maxSize } = toRefs(props)

    const [register, { closeModal }] = useModalInner()

    const { getAccept, getStringAccept, getHelpText } = useUploadType({
      acceptRef: accept,
      helpTextRef: helpText,
      maxNumberRef: maxNumber,
      maxSizeRef: maxSize,
    })

    const { createMessage } = useMessage()

    const getIsSelectFile = computed(() => {
      return (
        fileListRef.value.length > 0 &&
          !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
      )
    })

    const getOkButtonProps = computed(() => {
      const someSuccess = fileListRef.value.some(
        (item) => item.status === UploadResultStatus.SUCCESS,
      )
      return {
        disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
      }
    })

    const getUploadBtnText = computed(() => {
      const someError = fileListRef.value.some(
        (item) => item.status === UploadResultStatus.ERROR,
      )
      return isUploadingRef.value
        ? '上传中'
        : someError
          ? '重新上传失败文件'
          : '开始上传'
    })

    function beforeUpload(file: File) {
      const { size, name } = file
      const { maxSize, maxNumber, previewFileList } = props
      const accept = unref(getAccept)

      // number of checks
      if ((fileListRef.value.length + previewFileList?.length ?? 0) >= maxNumber) {
        return createMessage.warning(`最多只能上传${maxNumber}个文件`)
      }

      // size of checks
      if (maxSize && file.size / 1024 / 1024 >= maxSize) {
        createMessage.error(`只能上传不超过${maxSize}MB的文件!`)
        return false
      }

      // type of checks
      if (accept.length > 0 && !checkFileType(file, accept)) {
        createMessage.error!(`只能上传${accept.join(',')}格式文件`)
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
      if (checkImgType(file)) {
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

    function handleRemove(record: FileItem) {
      const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid)
      index !== -1 && fileListRef.value.splice(index, 1)
      emit('delete', record)
    }

    // function handlePreview(record: FileItem) {
    //   const { thumbUrl = '' } = record;
    //   createImgPreview({
    //     imageList: [thumbUrl],
    //   });
    // }

    async function uploadApiByItem(item: FileItem) {
      const { api } = props
      if (!api || !isFunction(api)) {
        return warn('upload api must exist and be a function')
      }
      try {
        item.status = UploadResultStatus.UPLOADING
        const onUploadProgress = function (progressEvent: ProgressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          item.percent = complete
        }

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { data } = await props.api?.({ ...(props.uploadParams || {}), file: item.file }, onUploadProgress)
        item.status = UploadResultStatus.SUCCESS
        item.responseData = data
        return {
          success: true,
          error: null,
        }
      } catch (e) {
        item.status = UploadResultStatus.ERROR
        return {
          success: false,
          error: e,
        }
      }
    }

    async function handleStartUpload() {
      const { maxNumber } = props
      if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
        return createMessage.warning(`最多只能上传${maxNumber}个文件`)
      }
      try {
        isUploadingRef.value = true
        const uploadFileList =
            fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || []
        const data = await Promise.all(
          uploadFileList.map((item) => {
            return uploadApiByItem(item)
          }),
        )
        isUploadingRef.value = false
        const errorList = data.filter((item: any) => !item.success)
        if (errorList.length > 0) throw errorList
      } catch (e) {
        isUploadingRef.value = false
        throw e
      }
    }

    function handleOk() {
      const { maxNumber } = props

      if (fileListRef.value.length > maxNumber) {
        return createMessage.warning(`最多只能上传${maxNumber}个文件`)
      }
      if (isUploadingRef.value) {
        return createMessage.warning('请等待文件上传后，保存!')
      }
      const fileList: string[] = []

      for (const item of fileListRef.value) {
        const { status, responseData } = item
        if (status === UploadResultStatus.SUCCESS && responseData) {
          fileList.push(responseData.url)
        }
      }
      if (fileList.length <= 0) {
        return createMessage.warning('没有上传成功的文件，无法保存!')
      }
      fileListRef.value = []
      closeModal()
      emit('change', fileList)
    }

    async function handleCloseFunc() {
      if (!isUploadingRef.value) {
        fileListRef.value = []
        return true
      } else {
        createMessage.warning('请等待文件上传结束后操作')
        return false
      }
    }

    return {
      columns: createTableColumns() as any[],
      actionColumn: createActionColumn(handleRemove) as any,
      register,
      closeModal,
      getHelpText,
      getStringAccept,
      getOkButtonProps,
      beforeUpload: beforeUpload as any,
      // registerTable,
      fileListRef,
      state,
      isUploadingRef,
      handleStartUpload,
      handleOk,
      handleCloseFunc,
      getIsSelectFile,
      getUploadBtnText,
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
