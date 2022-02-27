import { FileBasicColumn } from './typing'

export const basicProps = {
  /**
  * Upload interface function
  */
  api: {
    type: Function as PropType<PromiseFn>,
    default: null,
    required: true,
  },
  /**
  * Tips on the left side of the upload button
  */
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  /**
  * Maximum supported file size (MB)
  */
  maxSize: {
    type: Number as PropType<number>,
    default: 2,
  },
  /**
  * Supports the maximum number of files at a time Infinity is not limited
  */
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  /**
  * upload support file accept. for example ['.doc,','application/msword','image/*']
  */
  accept: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
  * Whether to choose multiple
  */
  multiple: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
  * whether to disable
  */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
  * Upload additional parameters
  */
  uploadParams: {
    type: Object as PropType<any>,
    default: {},
  },
}

export const uploadContainerProps = {
  ...basicProps,
  /**
  * Upload list default content
  */
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
  * Whether the upload button shows the number
  */
  showPreviewNumber: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
  * Whether to hide the preview button when empty
  */
  emptyHidePreview: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export const previewProps = {
  /**
  * Preview the default content of the upload list
  */
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}

export const fileListProps = {
  /**
  * file table column
  */
  columns: {
    type: [Array] as PropType<FileBasicColumn[]>,
    default: null,
  },
  /**
  * File operation column
  */
  actionColumn: {
    type: Object as PropType<FileBasicColumn>,
    default: null,
  },
  /**
  * file data
  */
  dataSource: {
    type: Array as PropType<any[]>,
    default: null,
  },
}
