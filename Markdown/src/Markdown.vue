<template>
  <div
    ref="wrapRef"
    :class="prefixCls"></div>
</template>

<script lang="ts">
import type { Ref } from 'vue'

import { defineComponent, ref, unref, nextTick, computed, watch, onBeforeUnmount, onDeactivated } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useLocale } from '@/locales/useLocale'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated'
import { useDesign } from '@/hooks/web/useDesign'

type Lang = 'zh_CN' | 'en_US' | undefined

export default defineComponent({
  inheritAttrs: false,
  props: {
    height: { type: Number, default: 400 },
    modelValue: { type: String, default: '' },
  },
  emits: ['change', 'get', 'update:modelValue'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref<ElRef>(null)
    const vditorRef = ref(null) as Ref<Nullable<Vditor>>
    const initedRef = ref(false)
    const { prefixCls } = useDesign('markdown')

    const { getLocale } = useLocale()
    const { getDarkMode } = useRootSetting()
    const valueRef = ref(props.modelValue || '')

    watch(
      [() => getDarkMode.value, () => initedRef.value],
      ([val, inited]) => {
        if (!inited) {
          return
        }
        const theme = val === 'dark' ? 'dark' : 'classic'
        instance.getVditor()?.setTheme(theme)
      },
      {
        immediate: true,
        flush: 'post',
      }
    )

    watch(
      () => props.value,
      (v) => {
        if (v !== valueRef.value) {
          instance.getVditor()?.setValue(v)
        }
        valueRef.value = v
      }
    )

    const getCurrentLang = computed((): 'zh_CN' | 'en_US' => {
      let lang: Lang
      switch (unref(getLocale)) {
        case 'en':
          lang = 'en_US'
          break
        default:
          lang = 'zh_CN'
      }
      return lang
    })

    function init() {
      const wrapEl = unref(wrapRef) as HTMLElement
      if (!wrapEl) return
      const bindValue = { ...attrs, ...props }
      const insEditor = new Vditor(wrapEl, {
        theme: getDarkMode.value === 'dark' ? 'dark' : 'classic',
        lang: unref(getCurrentLang),
        mode: 'sv',
        fullscreen: {
          index: 520,
        },
        preview: {
          actions: [],
        },
        input: (v) => {
          valueRef.value = v
          emit('update:modelValue', v)
          emit('change', v)
        },
        after: () => {
          nextTick(() => {
            insEditor.setValue(valueRef.value)
            vditorRef.value = insEditor
            initedRef.value = true
            emit('get', instance)
          })
        },
        blur: () => { },
        ...bindValue,
        cache: {
          enable: false,
        },
      })
    }

    const instance = {
      getVditor: (): Vditor => vditorRef.value!,
    }

    function destroy() {
      const vditorInstance = unref(vditorRef)
      if (!vditorInstance) return
      try {
        vditorInstance?.destroy?.()
      } catch (error) {
        // continue regardless of error
      }
      vditorRef.value = null
      initedRef.value = false
    }

    onMountedOrActivated(init)

    onBeforeUnmount(destroy)
    onDeactivated(destroy)
    return {
      wrapRef,
      prefixCls,
      ...instance,
    }
  },
})
</script>
