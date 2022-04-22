<template>
  <ElDrawer
    @close="onClose"
    v-bind="getBindValues"
    v-model="visibleRef">
    <template #title>
      <DrawerHeader
        v-bind="getProps"
        :prefixCls="prefixCls"
        @close="onClose">
        <template
          #title
          v-if="$slots.title">
          <slot name="title"></slot>
        </template>
        <template
          #titleToolbar
          v-if="$slots.titleToolbar">
          <slot name="titleToolbar"></slot>
        </template>
      </DrawerHeader>
    </template>

    <ScrollContainer :style="getScrollContentStyle">
      <slot></slot>
    </ScrollContainer>

    <DrawerFooter
      v-bind="getProps"
      :prefixCls="prefixCls"
      :height="getFooterHeight"
      @close="onClose"
      @ok="handleOk">
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
import { ElDrawer, ElLoading } from 'element-plus'
import { isFunction } from '@/utils/is'
import { deepMerge } from '@/utils'
import DrawerFooter from './components/DrawerFooter.vue'
import DrawerHeader from './components/DrawerHeader.vue'
import { ScrollContainer } from '@/components/Container'
import { basicProps, extProps, footerProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'
import { useAttrs } from '@/hooks/core/useAttrs'
import { omit } from 'lodash-es'
import { EleDrawer } from '@/components/ElementPlus'

export default defineComponent({
  components: { ElDrawer, ScrollContainer, DrawerFooter, DrawerHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: ['visible-change', 'ok', 'close', 'register'],
  setup(props, { emit }) {
    const visibleRef = ref(false)
    const attrs = useAttrs()
    const propsRef = ref<Partial<Nullable<DrawerProps>>>(null)
    const loadingInstance = ref()

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
      // opt.title = undefined
      const { isDetail, width, customClass } = opt
      if (isDetail) {
        if (!width) {
          opt.width = '100%'
        }
        const detailCls = `${prefixCls}__detail`
        opt.customClass = customClass ? `${customClass} ${detailCls}` : detailCls
      }
      return opt
    })

    const getBindValues = computed(():EleDrawer => {
      const preOpts = { ...unref(getProps) }
      preOpts.customClass = `${prefixCls} ${preOpts?.customClass} basic-drawer-${instance?.uid}`
      const opts = omit(preOpts, Object.getOwnPropertyNames({ ...footerProps, ...extProps })) as EleDrawer

      return opts
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
      () => propsRef.value?.loading,
      (v) => {
        if (v) {
          loadingInstance.value = ElLoading.service({
            target: `.basic-drawer-${instance?.uid}`,
            text: propsRef.value?.loadingText || props.loadingText || 'Loading',
          })
        } else {
          loadingInstance.value?.close()
        }
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

    // Cancel
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
      prefixCls,
      visibleRef,
      getMergeProps,
      getScrollContentStyle,
      getProps,
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
  line-height: 1;

  &-header {
    display: flex;
    align-items: center;

    &__back {
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }

    &__title {
      flex: 1;
      display: flex;
      align-items: center;

    }

    &__toolbar {
      padding-right: 48px;
    }
  }

  &-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 0 16px;
  }

  .el-drawer__header {
    margin-bottom: 15px;
  }

  .el-drawer__body {
    width: 100%;
    flex: 1;
    padding: 0 16px;
  }

  .scrollbar__wrap {
    padding: 16px;
    margin-bottom: 0;
  }

  .scrollbar > .scrollbar__bar.is-horizontal {
    display: none;
  }
}
</style>
