<template>
  <ElDrawer
    @close="onClose"
    v-bind="getBindValues"
    v-model="visibleRef">
    <template
      #title
      v-if="!$slots.title">
      <DrawerHeader
        :title="getMergeProps.title"
        :isDetail="isDetail"
        :showDetailBack="showDetailBack"
        @close="onClose">
        <template #titleToolbar>
          <slot name="titleToolbar"></slot>
        </template>
      </DrawerHeader>
    </template>
    <template
      v-else
      #title>
      <slot name="title"></slot>
    </template>

    <ScrollContainer :style="getScrollContentStyle">
      <slot></slot>
    </ScrollContainer>
    <DrawerFooter
      v-bind="getProps"
      @close="onClose"
      @ok="handleOk"
      :height="getFooterHeight">
      <template
        #[item]="data"
        v-for="item in Object.keys($slots)">
        <slot
          :name="item"
          v-bind="data || {}"></slot>
      </template>
    </DrawerFooter>
  </ElDrawer>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import type { DrawerInstance, DrawerProps } from './typing'

import { defineComponent, ref, computed, watch, unref, nextTick, toRaw, getCurrentInstance } from 'vue'
import { ElDrawer } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { isFunction } from '@/utils/is'
import { deepMerge } from '@/utils'
import DrawerFooter from './components/DrawerFooter.vue'
import DrawerHeader from './components/DrawerHeader.vue'
import { ScrollContainer } from '@/components/Container'
import { basicProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'
import { useAttrs } from '@/hooks/core/useAttrs'
import { omit } from 'lodash-es'

export default defineComponent({
  components: { ElDrawer, ScrollContainer, DrawerFooter, DrawerHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: ['visible-change', 'ok', 'close', 'register'],
  setup(props, { emit }) {
    const visibleRef = ref(false)
    const attrs = useAttrs()
    const propsRef = ref<Partial<Nullable<DrawerProps>>>(null)

    const { t } = useI18n()
    const { prefixCls } = useDesign('basic-drawer')

    const drawerInstance: DrawerInstance = {
      setDrawerProps: setDrawerProps,
      emitVisible: undefined,
    }

    const instance = getCurrentInstance()

    instance && emit('register', drawerInstance, instance.uid)

    const getMergeProps = computed((): DrawerProps => {
      return deepMerge(toRaw(props), unref(propsRef))
    })

    const getProps = computed((): DrawerProps => {
      const opt = {
        ...unref(attrs),
        ...unref(getMergeProps),
        // modelValue: unref(visibleRef)
      }
      opt.title = undefined
      const { isDetail, width, customClass } = opt
      if (isDetail) {
        if (!width) {
          opt.width = '100%'
        }
        const detailCls = `${prefixCls}__detail`
        opt.customClass = customClass ? `${customClass} ${detailCls}` : detailCls
      }
      return opt as DrawerProps
    })

    const getBindValues = computed(() => {
      const opts = {
        ...unref(attrs),
        ...unref(getProps),
      }
      opts.customClass = `${prefixCls} ${opts?.customClass}`

      return omit(opts, ['isDetail', 'showDetailBack', 'visible', 'loading', 'closeFunc', 'showCancelBtn', 'cancelType', 'footer', 'cancelText', 'showConfirmBtn', 'confirmLoading', 'confirmText', 'confirmType', 'showFooter', 'footerHeight', 'loadingText'])
    })

    // Custom implementation of the bottom button,
    const getFooterHeight = computed(() => {
      const { footerHeight, showFooter } = unref(getProps)
      if (showFooter && footerHeight) {
        return `${parseInt(footerHeight)}px`
      }
      return `0px`
    })

    const getScrollContentStyle = computed((): CSSProperties => {
      const footerHeight = unref(getFooterHeight)
      return {
        position: 'relative',
        height: `calc(100% - ${footerHeight})`,
      }
    })

    const getLoading = computed(() => {
      return !!unref(getProps)?.loading
    })

    watch(
      () => props.modelValue,
      (newVal, oldVal) => {
        if (newVal !== oldVal) visibleRef.value = newVal
      },
      { deep: true }
    )

    watch(
      () => visibleRef.value,
      (visible) => {
        nextTick(() => {
          emit('visible-change', visible)
          instance && drawerInstance.emitVisible?.(visible, instance.uid)
        })
      }
    )

    // Cancel event
    async function onClose(e: Recordable) {
      const { closeFunc } = unref(getProps)
      emit('close', e)
      if (closeFunc && isFunction(closeFunc)) {
        const res = await closeFunc()
        visibleRef.value = !res
        return
      }
      visibleRef.value = false
    }

    function setDrawerProps(props: Partial<DrawerProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)

      if (Reflect.has(props, 'modelValue')) {
        visibleRef.value = !!props.modelValue
      }
    }

    function handleOk() {
      emit('ok')
    }

    return {
      onClose,
      t,
      prefixCls,
      visibleRef,
      getMergeProps: getMergeProps as any,
      getScrollContentStyle,
      getProps: getProps as any,
      getLoading,
      getBindValues,
      getFooterHeight,
      handleOk,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-drawer';

.#{$prefix-cls} {
  .el-drawer__header {
    margin-bottom: 15px;
  }

  .el-drawer__body {
    width: 100%;
    height: calc(100% - 60px);
    padding: 0 16px;
  }

  .scrollbar__wrap {
    padding: 16px !important;
    margin-bottom: 0 !important;
  }

  .scrollbar > .scrollbar__bar.is-horizontal {
    display: none;
  }
}
</style>
