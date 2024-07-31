<template>
  <ElDrawer v-bind="getBindValues" v-model="visibleRef" @close="handleClose()">
    <template #header>
      <div :class="`${prefixCls}-header`">
        <span v-if="isDetail" :class="`${prefixCls}-header__back`" @click="handleClose()">
          <SvgIcon name="left" />
        </span>

        <BasicTitle :class="`${prefixCls}-header__title`">
          <template v-if="title">
            {{ title || '' }}
          </template>
          <template v-else>
            <slot name="header"></slot>
          </template>
        </BasicTitle>

        <span v-if="$slots.toolbar" :class="`${prefixCls}-header__toolbar`">
          <slot name="toolbar"></slot>
        </span>
      </div>
    </template>

    <ScrollContainer v-loading="getLoading" :class="`${prefixCls}-body`" :element-loading-text="loadingText">
      <slot></slot>
    </ScrollContainer>

    <div v-if="showFooter" :class="`${prefixCls}-footer`">
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>

      <template v-else>
        <slot v-if="$slots.prependFooter" name="prependFooter"></slot>
        <ElButton v-if="showCancelBtn" v-bind="cancelOptions" @click="handleClose">
          {{ cancelOptions.btnText || 'Cancel' }}
        </ElButton>
        <slot v-if="$slots.centerFooter" name="centerFooter"></slot>
        <ElButton
          v-if="showConfirmBtn"
          v-bind="confirmOptions"
          :loading="getProps.confirmOptions?.loading"
          @click="handleOk"
        >
          {{ confirmOptions.btnText || 'Ok' }}
        </ElButton>
        <slot v-if="$slots.appendFooter" name="appendFooter"></slot>
      </template>
    </div>
  </ElDrawer>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, ref, unref, watch } from 'vue'

import { ElButton, ElDrawer, ElLoading } from 'element-plus'
import { omit } from 'lodash-es'
import type { BasicDrawerProps, DrawerInstanceMethods } from './typing'

import { basicProps, customProps } from './props'
import { ScrollContainer } from '@/components/ScrollContainer'
import { useDesign } from '@/hooks/web/useDesign'
import type { EleDrawer } from '@/components/ElementPlus'
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
  emits: ['update:modelValue', 'visibleChange', 'confirm', 'cancel', 'register'],
  setup(props, { attrs, emit }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<Nullable<BasicDrawerProps>>>(null)

    const { prefixCls } = useDesign('basic-drawer')

    /**
     * 获取当前实例
     */
    const instance = getCurrentInstance()

    /**
     * 获取更新 Props
     */
    const getProps = computed(() => {
      const opts = {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicDrawerProps
      const className = `${prefixCls} ${opts?.customClass || ''} ${prefixCls}-${instance?.uid}`

      return {
        ...opts,
        class: className, // compatible 2.3+
        // customClass: className,
      } as BasicDrawerProps
    })

    /**
     * 绑定抽屉Props
     */
    const getBindValues = computed(() => {
      const opts = { ...attrs, ...unref(getProps) }
      // 绑定组件Porps前，移除自定义附加项
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleDrawer
    })

    /**
     * 获取loading状态
     */
    const getLoading = computed(() => {
      return !!unref(getProps)?.loading
    })

    /**
     * 通过实例设置 Props
     */
    function setDrawerProps(drawerProps: Partial<BasicDrawerProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...drawerProps } as Recordable

      if (Reflect.has(drawerProps, 'modelValue')) {
        visibleRef.value = !!drawerProps.modelValue
      }
    }

    /**
     * 关闭抽屉
     */
    async function handleClose() {
      const { closeFn } = unref(getProps)

      if (typeof closeFn === 'function') {
        const isClose: boolean = await closeFn()
        visibleRef.value = !isClose
        return
      }
      else {
        visibleRef.value = false
      }

      emit('cancel')
    }

    /**
     * 确认下一步，抽屉未主动关闭
     */
    function handleOk() {
      emit('confirm')
    }
    /**
     * 定义实例方法
     */
    const drawerMethods: DrawerInstanceMethods = {
      setDrawerProps,
      emitVisible: undefined,
    }

    if (instance) {
      emit('register', drawerMethods)
    }

    watch(
      () => props.modelValue,
      (v) => {
        visibleRef.value = !!v
      },
      { deep: true },
    )

    watch(
      () => visibleRef.value,
      (visible) => {
        nextTick(() => {
          emit('visibleChange', visible)
          emit('update:modelValue', visible)
          if (instance) {
            drawerMethods.emitVisible?.(visible, instance.uid)
          }
        })
      },
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

  --el-drawer-bg-color: var(--background-primary-color);

  /* stylelint-disable-next-line selector-class-pattern */
  .el-drawer__header {
    height: 60px;
    padding: 0 16px;
    margin: 0;
    color: var(--text-primary-color);
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .el-drawer__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    padding: 0;
    overflow: hidden;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .scrollbar__wrap {
    padding: 16px;
    margin-bottom: 0;
  }

  &-header {
    display: flex;
    align-items: center;
    overflow: hidden;

    &__back {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }

    &__title {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__toolbar {
      margin: 0 16px;
    }
  }

  &-body {
    flex-grow: 1;
    width: auto;
    height: auto;
    padding: 0 16px;
  }

  &-footer {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 48px;
    padding: 0 16px;
  }
}
</style>
