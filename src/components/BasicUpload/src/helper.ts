import type { Ref } from 'vue'
import { computed, unref } from 'vue'

/**
 * 简单校验文件扩展名是否合法
 *
 * @param file File
 * @param accepts eg. ['png','jpg']
 */
export function checkFileExtType(file: File, accepts: string[]) {
  const newTypes = accepts.join('|')
  const reg = new RegExp(`\\.(${newTypes})$`, 'i')
  return reg.test(file.name)
}

/**
 * 检查文件名是否为图片
 *
 * @param file File
 */
export function checkImgType(file: File) {
  return isImgTypeByName(file.name)
}

/**
 * 检查文件名是否为图片
 *
 * @param name File name
 */
export function isImgTypeByName(name: string) {
  return /\.(?:jpg|jpeg|png|gif|webp|svg)$/i.test(name)
}

/**
 * 基于文件获取 Base64 内容
 *
 * @param file File
 */
export function getBase64WithFile(file: File) {
  return new Promise<{
    result: string
    file: File
  }>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve({ result: reader.result as string, file })
    reader.onerror = error => reject(error)
  })
}

/**
 * 检查上传限制，并转换为帮助文本
 */
export function useUploadType(
  {
    acceptRef,
    helpTextRef,
    maxNumberRef,
    maxSizeRef,
  }: {
    acceptRef: Ref<string[]>
    helpTextRef: Ref<string>
    maxNumberRef: Ref<number>
    maxSizeRef: Ref<number>
  },
  uploadedList: Ref<string[]>,
) {
  /**
   * 获取可支持文件扩展名类型
   */
  const getAccept = computed(() => {
    const accept = unref(acceptRef)
    if (accept && accept.length > 0) {
      return accept
    }
    return []
  })

  /**
   * 更友好的显示可支持扩展名
   */
  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => {
        if (item.indexOf('/') > 0 || item.startsWith('.')) {
          return item
        }
        else {
          return `.${item}`
        }
      })
      .join(',')
  })

  /**
   * 上传提示帮助文本
   */
  const getHelpText = computed(() => {
    let text = unref(helpTextRef) || ''

    const accept = unref(acceptRef)
    if (accept.length > 0) {
      text += `支持 ${accept.join(',')} 格式，`
    }

    const maxSize = unref(maxSizeRef)
    if (maxSize) {
      text += `单个文件不超过 ${maxSize} MB，`
    }

    const maxNumber = unref(maxNumberRef) - unref(uploadedList).length
    if (maxNumber && maxNumber !== Infinity) {
      text += `最多只能上传 ${maxNumber} 个文件，`
    }

    // 移除最后的逗号和空格
    return text.trim().replace(/,\s*$/, '')
  })

  return { getAccept, getStringAccept, getHelpText }
}
