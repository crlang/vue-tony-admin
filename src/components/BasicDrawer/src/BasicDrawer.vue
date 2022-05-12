<template>
  <ElDrawer
    @close="handleClose()"
    v-bind="getBindValues"
    v-model="visibleRef">
    <template #title>
      <div :class="`${prefixCls}-header`">
        <span
          :class="`${prefixCls}-header__back`"
          v-if="isDetail"
          @click="handleClose()"><SvgIcon
            name="arrow-right"
            :size="16"
            rotate="180deg" /></span>

        <BasicTitle
          :class="`${prefixCls}-header__title`">
          <template v-if="title">{{ title || '' }}</template>
          <template v-else><slot name="title"></slot></template>
        </BasicTitle>

        <span
          :class="`${prefixCls}-header__toolbar`"
          v-if="$slots.toolbar">
          <slot name="toolbar"></slot>
        </span>
      </div>
    </template>

    <ScrollContainer
      :class="`${prefixCls}-body`"
      v-loading="getLoading"
      :element-loading-text="loadingText">
      <slot></slot>
    </ScrollContainer>

    <div
      :class="`${prefixCls}-footer`"
      v-if="showFooter">
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>

      <template v-else>
        <slot
          name="prependFooter"
          v-if="$slots.prependFooter"></slot>
        <ElButton
          @click="handleClose"
          v-bind="cancelOptions"
          v-if="showCancelBtn">
          {{ cancelOptions.text || '取消' }}
        </ElButton>
        <slot
          name="centerFooter"
          v-if="$slots.centerFooter"></slot>
        <ElButton
          @click="handleOk"
          v-bind="confirmOptions"
          :loading="getProps.confirmOptions?.loading"
          v-if="showConfirmBtn">
          {{ confirmOptions.text || '确定' }}
        </ElButton>
        <slot
          name="appendFooter"
          v-if="$slots.appendFooter"></slot>
      </template>
    </div>
  </ElDrawer>
</template>

<script lang="ts">
import type { DrawerInstance, BasicProps } from './typing'

import { defineComponent, ref, computed, watch, unref, nextTick, getCurrentInstance } from 'vue'
import { ElDrawer, ElLoading, ElButton } from 'element-plus'
import { ScrollContainer } from '@/components/ScrollContainer'
import { basicProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'
import { omit } from 'lodash-es'
import { EleDrawer } from '@/components/ElementPlus'
import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'BasicDrawer',
  components: { ElDrawer, ElButton, ScrollContainer, BasicTitle, SvgIcon },
  directives: {
    loading: ElLoading.directive,
  },
  inheritAttrs: false,
  props: basicProps,
  emits: ['update:modelValue', 'visible-change', 'confirm', 'cancel', 'register'],
  setup(props, { attrs, emit }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<Nullable<BasicProps>>>(null)

    const { prefixCls } = useDesign('basic-drawer')

    /**
     * 定义内部实例
     *
     * Define inner instance
     */
    const drawerInstance: DrawerInstance = {
      setDrawerProps: setDrawerProps,
      emitVisible: undefined,
    }

    /**
     * 获取当前实例
     *
     * Get current instance
     */
    const instance = getCurrentInstance()

    /**
     * 获取当前实例
     *
     * Register current instance
     */
    instance && emit('register', drawerInstance, instance.uid)

    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      const opts = {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicProps

      opts.customClass = `${prefixCls} ${opts?.customClass} basic-drawer-${instance?.uid}`

      return opts
    })

    /**
     * 绑定抽屉Props
     *
     * Bind drawer props
     */
    const getBindValues = computed(() => {
      const opts = { ...unref(attrs), ...unref(getProps) }

      const customProps = ['isDetail', 'loading', 'loadingText', 'closeFunc', 'showFooter', 'showConfirmBtn', 'confirmOptions', 'showCancelBtn', 'cancelOptions']

      return omit(opts, customProps) as EleDrawer
    })

    /**
     * 获取loading状态
     *
     * Get loading state
     */
    const getLoading = computed(() => {
      return !!unref(getProps)?.loading
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param drawerProps Drawer Props
     */
    function setDrawerProps(drawerProps: Partial<BasicProps>): void {
      console.log('drawerProps', drawerProps)
      propsRef.value = { ...(unref(propsRef) as Recordable), ...drawerProps } as Recordable
      console.log('propsRef', propsRef)
      if (Reflect.has(drawerProps, 'modelValue')) {
        visibleRef.value = !!drawerProps.modelValue
      }
    }

    /**
     * 关闭抽屉
     *
     * Close drawer
     */
    async function handleClose() {
      const { closeFunc } = unref(getProps)

      if (closeFunc && typeof closeFunc === 'function') {
        const res = await closeFunc()
        visibleRef.value = !res
        return
      } else {
        visibleRef.value = false
      }

      emit('cancel')
    }

    /**
     * 确认下一步，抽屉未主动关闭
     *
     * Confirm the next step, the drawer is not automatically closed
     */
    function handleOk() {
      emit('confirm')
    }

    watch(
      () => props.modelValue,
      (v) => {
        visibleRef.value = !!v
      },
      { deep: true }
    )

    watch(
      () => visibleRef.value,
      (visible) => {
        nextTick(() => {
          emit('visible-change', visible)
          emit('update:modelValue', visible)
          instance && drawerInstance.emitVisible?.(visible, instance.uid)
        })
      }
    )

    return {
      handleClose,
      prefixCls,
      visibleRef,
      getProps,
      getLoading,
      getBindValues,
      handleOk,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-drawer';

.#{$prefix-cls} {
  line-height: 1;

  .el-drawer__header {
    height: 60px;
    padding: 0;
    margin: 0;
    color: var(--text-primary-color);
  }

  .el-drawer__body {
    display: flex;
    width: 100%;
    padding: 0;
    overflow: hidden;
    flex: 1;
    flex-direction: column;
  }

  .scrollbar__wrap {
    padding: 16px;
    margin-bottom: 0;
  }

  /*   .scrollbar > .scrollbar__bar.is-horizontal {
    display: none;
  } */

  &-header {
    display: flex;
    align-items: center;
    overflow: hidden;

    &__back {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        color: var(--primary-color);
      }
    }

    &__title {
      display: flex;
      align-items: center;
      padding: 0;
      margin-left: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }

    &__toolbar {
      margin: 0 16px;
    }
  }

  &-body {
    width: auto;
    height: auto;
    flex-grow: 1;
    padding: 0 16px;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    flex-shrink: 0;
  }
}
</style>