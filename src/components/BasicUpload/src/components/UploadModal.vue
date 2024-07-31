<template>
  <BasicModal
    title="上传"
    v-bind="$attrs"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="upload-modal"
    :close-fn="handleCloseFn"
    :confirm-options="getConfirmProps"
    :cancel-options="getCancelProps"
    @register="register"
    @confirm="handleConfirm"
  >
    <template #centerFooter>
      <ElButton
        type="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef"
        @click="handleStartUpload"
      >
        {{ getUploadBtnText }}
      </ElButton>
    </template>
    <div style="display: flex; align-items: center; margin-bottom: 8px">
      <ElAlert
        :title="getHelpText"
        style="

        --el-alert-padding: 8px 0

        "
        type="info"
        :closable="false"
      />
      <ElUpload
        action="emptyUrl"
        :accept="getStringAccept"
        :multiple="multiple"
        :limit="maxNumber"
        :disabled="getUploadState"
        :show-file-list="false"
        :before-upload="beforeUpload"
        style="margin-left: 8px"
      >
        <ElButton type="primary" :disabled="getUploadState">选择文件</ElButton>
      </ElUpload>
    </div>

    <FileList :data-source="fileListRef" :columns="columns" :action-column="actionColumn" />
  </BasicModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, unref } from 'vue'
import { ElAlert, ElButton, ElUpload } from 'element-plus'
import { get } from 'lodash-es'
import type { FileItem } from '../typing'

import { UploadResultStatus } from '../typing'
import { uploadProps } from '../props'
import { createActionColumn, createTableColumns } from '../data'
import { checkFileExtType, checkImgType, getBase64WithFile, useUploadType } from '../helper'
import FileList from './FileList.vue'
import type { EleButton } from '@/components/ElementPlus'
import { useMessage } from '@/hooks/web/useMessage'
import { buildUUID } from '@/utils/uuid'
import { error } from '@/utils/log'
import componentSetting from '@/settings/componentSetting'

import { BasicModal, useModalInner } from '@/components/BasicModal'

export default defineComponent({
  components: { ElButton, ElUpload, ElAlert, BasicModal, FileList },
  props: {
    ...uploadProps,
    prefixCls: String,
  },
  emits: ['change', 'register', 'delete'],
  setup(props, { emit }) {
    const isUploadingRef = ref(false)
    const fileListRef = ref<FileItem[]>([])
    const previewFileList = ref<string[]>([])
    const { accept, helpText, maxNumber, maxSize } = toRefs(props)

    const [register, { closeModal }] = useModalInner((data: string[]) => {
      // 接收 BasicUpload 页面传递过来的 data
      previewFileList.value = data || []
    })

    const { getAccept, getStringAccept, getHelpText } = useUploadType(
      {
        acceptRef: accept,
        helpTextRef: helpText,
        maxNumberRef: maxNumber,
        maxSizeRef: maxSize,
      },
      previewFileList,
    )

    const { createMessage } = useMessage()

    /**
     * 获取选择的文件是否已经全部上传完成
     */
    const getIsSelectFile = computed(() => {
      return fileListRef.value.length > 0 && !fileListRef.value.every(item => item.status === UploadResultStatus.SUCCESS)
    })
    /**
     * 获取确定按钮配置
     */
    const getConfirmProps = computed((): EleButton => {
      const someSuccess = fileListRef.value.some(item => item.status === UploadResultStatus.SUCCESS)
      return {
        btnText: '保存',
        type: 'primary',
        disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
      }
    })
    /**
     * 获取取消按钮配置
     */
    const getCancelProps = computed((): EleButton => {
      return {
        btnText: '关闭',
        disabled: isUploadingRef.value,
      }
    })
    /**
     * 获取是否在上传中或者上传数量超限制
     */
    const getUploadState = computed((): boolean => {
      return isUploadingRef.value || fileListRef.value.length + previewFileList.value.length >= maxNumber.value
    })
    /**
     * 获取上传按钮文字状态变化
     */
    const getUploadBtnText = computed(() => {
      const someError = fileListRef.value.some(item => item.status === UploadResultStatus.ERROR)
      return isUploadingRef.value ? '上传中' : someError ? '重新上传失败文件' : '开始上传'
    })
    /**
     * 检查文件数量
     */
    function checkFileLimit() {
      if (fileListRef.value.length + previewFileList.value.length > maxNumber.value) {
        createMessage.warning(`最多只能上传${maxNumber.value}个文件`)
        return false
      }
      return true
    }
    /**
     * 检查文件类型
     */
    function checkFileType(file) {
      const accept = unref(getAccept)

      if (accept.length > 0 && !checkFileExtType(file, accept)) {
        createMessage.error(`只能上传${accept.join(',')}格式文件`)
        return false
      }

      return true
    }
    /**
     * 检查文件大小
     */
    function checkFileSize(size = 0) {
      if (maxSize.value && size / 1024 / 1024 >= maxSize.value) {
        createMessage.error(`只能上传不超过${maxSize.value}MB的文件!`)
        return false
      }
      return true
    }

    /**
     * 上传前检查文件是否合法
     *
     * @param file File
     */
    function beforeUpload(file: File) {
      const { size, name } = file

      if (!checkFileLimit())
        return

      if (!checkFileSize(file.size || 0))
        return

      if (!checkFileType(file))
        return

      const commonItem = {
        uuid: buildUUID(),
        file,
        size,
        name,
        percent: 0,
        type: name.split('.').pop(),
      }
      // 把文件加入待上传区
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
      }
      else {
        fileListRef.value = [...unref(fileListRef), commonItem]
      }
      return false
    }
    /**
     * 移除上传列表项
     *
     * @param record FileItem
     */
    function handleRemove(record: FileItem) {
      const index = fileListRef.value.findIndex(item => item.uuid === record.uuid)
      if (index !== -1) {
        fileListRef.value.splice(index, 1)
      }
      emit('delete', record)
    }

    /**
     * 处理上传内容，然后上传
     *
     * @param item FileItem
     */
    async function uploadApiByItem(item: FileItem) {
      const { upload } = componentSetting
      const { api, uploadName, uploadParams } = props
      // 必须要存在 api 函数
      if (!api || typeof api !== 'function') {
        return error('upload api must exist and be a function')
      }

      try {
        item.status = UploadResultStatus.UPLOADING
        const onUploadProgress = function (progressEvent: ProgressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          item.percent = complete
        }

        const params = uploadParams || {}
        params.file = item.file
        params[uploadName] = item.file
        const { data } = await api(params, onUploadProgress)
        const result = get(data, upload.urlField)
        if (result) {
          item.status = UploadResultStatus.SUCCESS
          item.responseData = result
          return {
            success: true,
            error: null,
          }
        }
        else {
          item.status = UploadResultStatus.ERROR
          item.responseData = data
          return {
            success: false,
            error: data?.message || data,
          }
        }
      }
      catch (e) {
        item.status = UploadResultStatus.ERROR
        return {
          success: false,
          error: e,
        }
      }
    }
    /**
     * 开始上传
     */
    async function handleStartUpload() {
      if (!checkFileLimit())
        return

      try {
        isUploadingRef.value = true
        const uploadFileList = fileListRef.value.filter(item => item.status !== UploadResultStatus.SUCCESS) || []
        const data = await Promise.all(
          uploadFileList.map((item) => {
            return uploadApiByItem(item)
          }),
        )
        isUploadingRef.value = false
        // 筛选未上传成功文件
        const errorList = data.filter((item: any) => !item.success)
        if (errorList.length > 0)
          throw errorList
      }
      catch (e) {
        isUploadingRef.value = false
        throw e
      }
    }
    /**
     * 保存上传文件
     */
    function handleConfirm() {
      if (!checkFileLimit())
        return

      if (isUploadingRef.value) {
        return createMessage.warning('请等待文件上传后，保存!')
      }
      const fileList: string[] = []

      for (const item of fileListRef.value) {
        const { status, responseData } = item
        if (status === UploadResultStatus.SUCCESS && typeof responseData === 'string') {
          fileList.push(responseData)
        }
      }
      if (fileList.length <= 0) {
        return createMessage.warning('没有上传成功的文件，无法保存!')
      }
      fileListRef.value = []
      closeModal()
      emit('change', fileList)
    }
    /**
     * 关闭上传弹窗前执行的函数
     */
    async function handleCloseFn() {
      // 已全部上传完毕
      if (!isUploadingRef.value) {
        fileListRef.value = []
        return true
      }
      else {
        // 存在上传中的文件，不允许关闭
        createMessage.warning('请等待文件上传结束后操作')
        return false
      }
    }

    return {
      columns: createTableColumns(),
      actionColumn: createActionColumn(handleRemove),
      register,
      closeModal,
      getHelpText,
      getStringAccept,
      getConfirmProps,
      getCancelProps,
      beforeUpload,
      getUploadState,
      fileListRef,
      isUploadingRef,
      handleStartUpload,
      handleConfirm,
      handleCloseFn,
      getIsSelectFile,
      getUploadBtnText,
    }
  },
})
</script>
