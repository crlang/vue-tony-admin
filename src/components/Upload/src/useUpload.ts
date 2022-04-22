import { Ref, unref, computed } from 'vue'
export function useUploadType({
  acceptRef,
  helpTextRef,
  maxNumberRef,
  maxSizeRef,
}: {
  acceptRef: Ref<string[]>
  helpTextRef: Ref<string>
  maxNumberRef: Ref<number>
  maxSizeRef: Ref<number>
}) {
  const getAccept = computed(() => {
    const accept = unref(acceptRef)
    if (accept && accept.length > 0) {
      return accept
    }
    return []
  })
  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => {
        if (item.indexOf('/') > 0 || item.startsWith('.')) {
          return item
        } else {
          return `.${item}`
        }
      })
      .join(',')
  })

  const getHelpText = computed(() => {
    const helpText = unref(helpTextRef)
    if (helpText) {
      return helpText
    }
    const helpTexts: string[] = []

    const accept = unref(acceptRef)
    if (accept.length > 0) {
      helpTexts.push(`支持${accept.join(',')}格式`)
    }

    const maxSize = unref(maxSizeRef)
    if (maxSize) {
      helpTexts.push(`单个文件不超过${maxSize}MB`)
    }

    const maxNumber = unref(maxNumberRef)
    if (maxNumber && maxNumber !== Infinity) {
      helpTexts.push(`最多只能上传${maxNumber}个文件`)
    }
    return helpTexts.join('，')
  })
  return { getAccept, getStringAccept, getHelpText }
}
