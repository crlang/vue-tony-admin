<template>
  <Modal v-bind="getBindValue">
    <template
      #title
      v-if="!$slots.title">
      <ModalHeader
        :helpMessage="getProps.helpMessage"
        :class="`${prefixCls}__title`"
        :title="getMergeProps.title"
        @dblclick="handleTitleDbClick"
      />

      <ModalClose
        :canFullscreen="getProps.canFullscreen"
        :fullScreen="fullScreenRef"
        :class="`${prefixCls}__close`"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>

    <template
      #footer
      v-if="!$slots.footer">
      <ModalFooter
        v-bind="getBindValue"
        :class="`${prefixCls}__footer`"
        @ok="handleOk"
        @cancel="handleCancel">
        <template
          #[item]="data"
          v-for="item in Object.keys($slots)">
          <slot
            :name="item"
            v-bind="data || {}"></slot>
        </template>
      </ModalFooter>
    </template>

    <ModalWrapper
      :useWrapper="getProps.useWrapper"
      :footerOffset="wrapperFooterOffset"
      :fullScreen="fullScreenRef"
      ref="modalWrapperRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :modelValue="visibleRef"
      :modalFooterHeight="footer !== undefined && !footer ? 0 : undefined"
      v-bind="omit(getProps.wrapperProps, 'modelValue', 'height', 'modalFooterHeight')"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange">
      <slot></slot>
    </ModalWrapper>

    <template
      #[item]="data"
      v-for="item in Object.keys(omit($slots, 'default'))">
      <slot
        :name="item"
        v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>

<script lang="ts">
import type { ModalProps, ModalMethods } from './typing'

import {
  defineComponent,
  computed,
  ref,
  watch,
  unref,
  watchEffect,
  toRef,
  getCurrentInstance,
  nextTick,
} from 'vue'
import Modal from './components/Modal'
import ModalWrapper from './components/ModalWrapper.vue'
import ModalClose from './components/ModalClose.vue'
import ModalFooter from './components/ModalFooter.vue'
import ModalHeader from './components/ModalHeader.vue'
import { isFunction } from '@/utils/is'
import { deepMerge } from '@/utils'
import { basicProps } from './props'
import { useFullScreen } from './hooks/useModalFullScreen'
import { omit } from 'lodash-es'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicModal',
  components: { Modal, ModalWrapper, ModalClose, ModalFooter, ModalHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register', 'update:modelValue'],
  setup(props, { emit, attrs }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<ModalProps> | null>(null)
    const modalWrapperRef = ref<any>(null)
    const { prefixCls } = useDesign('basic-modal')

    // modal   Bottom and top height
    const extHeightRef = ref(0)
    const modalMethods: ModalMethods = {
      setModalProps,
      emitVisible: undefined,
      redoModalHeight: () => {
        nextTick(() => {
          if (unref(modalWrapperRef)) {
            (unref(modalWrapperRef) as any).setModalHeight()
          }
        })
      },
    }

    const instance = getCurrentInstance()
    if (instance) {
      emit('register', modalMethods, instance.uid)
    }

    // Custom title component: get title
    const getMergeProps = computed((): Recordable => {
      return {
        ...props,
        ...(unref(propsRef) as any),
      }
    })

    const { handleFullScreen, getCustomClass, fullScreenRef } = useFullScreen({
      modalWrapperRef,
      extHeightRef,
      customClass: toRef(getMergeProps.value, 'customClass'),
    })

    // modal component does not need title and origin buttons
    const getProps = computed((): Recordable => {
      const opt = {
        ...unref(getMergeProps),
        modelValue: unref(visibleRef),
        confirmButtonProps: undefined,
        cancelButtonProps: undefined,
        title: undefined,
      }
      return {
        ...opt,
        customClass: `${prefixCls} ${unref(getCustomClass)}`,
      }
    })

    const getBindValue = computed((): Recordable => {
      const attr = {
        ...attrs,
        ...unref(getMergeProps),
        modelValue: unref(visibleRef),
        fullscreen: unref(fullScreenRef),
        customClass: `${prefixCls} ${unref(getCustomClass)}`,
      }
      if (unref(fullScreenRef)) {
        return omit(attr, ['height', 'title'])
      }
      return omit(attr, 'title')
    })

    const getWrapperHeight = computed(() => {
      if (unref(fullScreenRef)) return undefined
      return unref(getProps).height
    })

    watchEffect(() => {
      visibleRef.value = !!props.modelValue
      fullScreenRef.value = !!props.defaultFullscreen
    })

    watch(
      () => unref(visibleRef),
      (v) => {
        emit('visible-change', v)
        emit('update:modelValue', v)
        instance && modalMethods.emitVisible?.(v, instance.uid)
        nextTick(() => {
          if (props.scrollTop && v && unref(modalWrapperRef)) {
            (unref(modalWrapperRef) as any).scrollTop()
          }
        })
      },
      {
        immediate: false,
      },
    )

    // 取消事件
    async function handleCancel(e: Event) {
      e?.stopPropagation()

      if (props.closeFunc && isFunction(props.closeFunc)) {
        const isClose: boolean = await props.closeFunc()
        visibleRef.value = !isClose
        return
      }

      visibleRef.value = false
      emit('cancel', e)
    }

    /**
       * @description: 设置modal参数
       */
    function setModalProps(props: Partial<ModalProps>): void {
      // Keep the last setModalProps
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
      if (Reflect.has(props, 'modelValue')) {
        visibleRef.value = !!props.modelValue
      }
      if (Reflect.has(props, 'defaultFullscreen')) {
        fullScreenRef.value = !!props.defaultFullscreen
      }
    }

    function handleOk(e: Event) {
      emit('ok', e)
    }

    function handleHeightChange(height: string) {
      emit('height-change', height)
    }

    function handleExtHeight(height: number) {
      extHeightRef.value = height
    }

    function handleTitleDbClick(e) {
      if (!props.canFullscreen) return
      e.stopPropagation()
      handleFullScreen(e)
    }

    return {
      prefixCls,
      handleCancel,
      getBindValue,
      getProps,
      handleFullScreen,
      fullScreenRef,
      getMergeProps,
      handleOk,
      visibleRef,
      omit,
      modalWrapperRef,
      handleExtHeight,
      handleHeightChange,
      handleTitleDbClick,
      getWrapperHeight,
    }
  },
})
</script>
