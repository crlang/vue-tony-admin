import type { BasicColumn } from '@/components/Table'
import { FileItem, PreviewFileItem, UploadResultStatus } from './typing'
import { isImgTypeByName } from './helper'
import ThumbUrl from './ThumbUrl.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElButtonGroup, ElProgress, ElTag } from 'element-plus'

const { t } = useI18n()

export function createTableColumns(): BasicColumn[] {
  return [
    {
      prop: 'thumbUrl',
      label: t('component.upload.legend'),
      width: 100,
      customRender: ({ record }) => {
        const { thumbUrl } = (record as FileItem) || {}
        return thumbUrl && <ThumbUrl fileUrl={thumbUrl} />
      },
    },
    {
      prop: 'name',
      label: t('component.upload.fileName'),
      align: 'left',
      customRender: ({ text, record }) => {
        const { percent, status: uploadStatus } = (record as FileItem) || {}
        console.log('record', record)
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
            <p class='truncate mb-1' title={text}>
              {text}
            </p>
            <ElProgress percentage={percent} text-inside={true} stroke-width={24} status={status} />
          </span>
        )
      },
    },
    {
      prop: 'size',
      label: t('component.upload.fileSize'),
      width: 100,
      customRender: ({ text = 0 }) => {
        return text && (text / 1024).toFixed(2) + 'KB'
      },
    },
    {
      prop: 'status',
      label: t('component.upload.fileStatue'),
      width: 100,
      customRender: ({ text }) => {
        if (text === UploadResultStatus.SUCCESS) {
          return <ElTag type='success'>{() => t('component.upload.uploadSuccess')}</ElTag>
        } else if (text === UploadResultStatus.ERROR) {
          return <ElTag type='danger'>{() => t('component.upload.uploadError')}</ElTag>
        } else if (text === UploadResultStatus.UPLOADING) {
          return <ElTag>{() => t('component.upload.uploading')}</ElTag>
        }

        return text
      },
    },
  ]
}
export function createActionColumn(handleRemove: Function): BasicColumn {
  return {
    width: 120,
    label: t('component.upload.operating'),
    prop: 'action',
    fixed: false,
    customRender: ({ record }) => {
      return <ElButton type='danger' onClick={handleRemove.bind(null, record)}>{() => t('component.upload.del')}</ElButton>
    },
  }
}

export function createPreviewColumns(): BasicColumn[] {
  return [
    {
      prop: 'url',
      label: t('component.upload.legend'),
      width: 100,
      customRender: ({ record }) => {
        const { url } = (record as PreviewFileItem) || {}
        return isImgTypeByName(url) && <ThumbUrl fileUrl={url} />
      },
    },
    {
      prop: 'name',
      label: t('component.upload.fileName'),
      align: 'left',
    },
  ]
}

export function createPreviewActionColumn({
  handleRemove,
  handleDownload,
}: {
  handleRemove: Fn
  handleDownload: Fn
}): BasicColumn {
  return {
    width: 200,
    label: t('component.upload.operating'),
    prop: 'action',
    fixed: false,
    customRender: ({ record }) => {
      return <ElButtonGroup><ElButton type='danger' onClick={handleRemove.bind(null, record)}>{() => t('component.upload.del')}</ElButton><ElButton type='success' onClick={handleDownload.bind(null, record)}>{() => t('component.upload.download')}</ElButton></ElButtonGroup>
    },
  }
}
