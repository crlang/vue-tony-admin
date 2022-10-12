import type { FileBasicColumn, FileItem, PreviewFileItem } from './typing'

import { UploadResultStatus } from './typing'

import { ElButton, ElButtonGroup, ElProgress, ElTag } from 'element-plus'

import { isImgTypeByName } from './helper'
import UploadThumb from './components/UploadThumb.vue'

/**
 * 创建上传列
 *
 * Create an upload column
 */
export function createTableColumns(): FileBasicColumn[] {
  return [
    {
      prop: 'thumbUrl',
      label: '略缩图',
      width: 100,
      customRender: ({ record }) => {
        const { thumbUrl } = (record as FileItem) || {}
        return thumbUrl && <UploadThumb url={thumbUrl} />
      },
    },
    {
      prop: 'name',
      label: '文件名',
      align: 'left',
      customRender: ({ text, record }) => {
        const { percent, status: uploadStatus } = (record as FileItem) || {}
        let status: '' | 'success' | 'exception' | 'warning'
        if (uploadStatus === UploadResultStatus.ERROR) {
          status = 'exception'
        } else if (uploadStatus === UploadResultStatus.UPLOADING) {
          status = ''
        } else if (uploadStatus === UploadResultStatus.SUCCESS) {
          status = 'success'
        }
        return (
          <span>
            <p
              class='truncate mb-1'
              title={text}>
              {text}
            </p>
            <ElProgress
              percentage={percent}
              text-inside={true}
              stroke-width={24}
              status={status}
            />
          </span>
        )
      },
    },
    {
      prop: 'size',
      label: '文件大小',
      width: 100,
      customRender: ({ text = 0 }) => {
        return text && `${(text / 1024).toFixed(2)}KB`
      },
    },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      customRender: ({ text }) => {
        if (text === UploadResultStatus.SUCCESS) {
          return <ElTag type='success'>{() => '上传成功'}</ElTag>
        } else if (text === UploadResultStatus.ERROR) {
          return <ElTag type='danger'>{() => '上传失败'}</ElTag>
        } else if (text === UploadResultStatus.UPLOADING) {
          return <ElTag>{() => '上传中'}</ElTag>
        }

        return <ElTag type='info'>{() => '待上传'}</ElTag>
      },
    },
  ]
}

/**
 * 创建上传操作列
 *
 * Create an upload action column
 */
export function createActionColumn(handleRemove: Fn): FileBasicColumn {
  return {
    width: 120,
    label: '操作',
    prop: 'action',
    fixed: false,
    customRender: ({ record }) => {
      return (
        <ElButton
          type='danger'
          onClick={handleRemove.bind(null, record)}>
          {() => '删除'}
        </ElButton>
      )
    },
  }
}

/**
 * 创建预览列
 *
 * Create a preview column
 */
export function createPreviewColumns(): FileBasicColumn[] {
  return [
    {
      prop: 'url',
      label: '略缩图',
      width: 100,
      customRender: ({ record }) => {
        const { url } = (record as PreviewFileItem) || {}
        return isImgTypeByName(url) && <UploadThumb url={url} />
      },
    },
    {
      prop: 'name',
      label: '文件名',
      align: 'left',
    },
  ]
}

/**
 * 创建预览操作列
 *
 * Create a preview action column
 */
export function createPreviewActionColumn({
  handleRemove,
  handleDownload,
}: {
  handleRemove: Fn
  handleDownload: Fn
}): FileBasicColumn {
  return {
    width: 200,
    label: '操作',
    prop: 'action',
    fixed: false,
    customRender: ({ record }) => {
      return (
        <ElButtonGroup>
          <ElButton
            type='danger'
            onClick={handleRemove.bind(null, record)}>
            {() => '删除'}
          </ElButton>
          <ElButton
            type='success'
            onClick={handleDownload.bind(null, record)}>
            {() => '下载'}
          </ElButton>
        </ElButtonGroup>
      )
    },
  }
}
