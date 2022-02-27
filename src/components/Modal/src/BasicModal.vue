<template>
  <Modal
    v-bind="getBaiscBindValue"
    v-model:modelValue="visibleRef">
    <template
      #title
      v-if="$slots.title">
      <slot name="title"></slot>
    </template>

    <template
      #title
      v-else>
      <ModalHeader
        v-bind="getHeaderBindValue"
        @fullscreen="handleFullscreen"
        @cancel="handleCancel" />
    </template>

    <template
      #footer
      v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
    <template
      #footer
      v-else>
      <ModalFooter
        v-bind="getFooterBindValue"
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
      ref="modalWrapperRef"
      v-bind="getWrapperBindValue"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange">
      <slot></slot>
    </ModalWrapper>
  </Modal>
</template>

<script lang="ts">
import type { ModalProps, ModalMethods, ModalCustomHeader, ModalCustomContent, ModalCustomFooter } from './typing'

import { defineComponent, computed, ref, watch, unref, watchEffect, getCurrentInstance, nextTick } from 'vue'
import Modal from './components/Modal.vue'
import ModalWrapper from './components/ModalWrapper.vue'
import ModalFooter from './components/ModalFooter.vue'
import ModalHeader from './components/ModalHeader.vue'
import { isFunction } from '@/utils/is'
import { deepMerge } from '@/utils'
import { basicProps } from './props'
import { omit } from 'lodash-es'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicModal',
  components: { Modal, ModalWrapper, ModalFooter, ModalHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: [
    'visible-change',
    'height-change',
    'cancel',
    'ok',
    'register',
    'update:modelValue'],
  setup(props, { emit }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<ModalProps> | null>(null)
    const modalWrapperRef = ref<any>(null)
    const { prefixCls } = useDesign('basic-modal')
    const fullscreenRef = ref(false)
    const draggableRef = ref(false)

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

    const getMergeProps = computed(() => {
      return {
        ...props,
        ...unref(propsRef),
      }
    })

    const getBaiscBindValue = computed(() => {
      const attr = {
        ...unref(getMergeProps),
        fullscreen: unref(fullscreenRef),
        draggable: unref(draggableRef),
        customClass: prefixCls,
      } as ModalProps
      return attr
    })

    const getHeaderBindValue = computed(() => {
      const attr = {
        ...unref(getMergeProps),
        fullscreen: unref(fullscreenRef),
        modelValue: unref(visibleRef),
        draggable: unref(draggableRef),
        customClass: `${prefixCls}__header`,
        customTitle: unref(getMergeProps).title,
      } as ModalCustomHeader
      return attr
    })

    const getWrapperBindValue = computed(() => {
      const attr = {
        ...unref(getMergeProps),
        fullscreen: unref(fullscreenRef),
        modelValue: unref(visibleRef),
        customClass: `${prefixCls}__body`,
      } as ModalCustomContent
      return attr
    })

    const getFooterBindValue = computed(() => {
      const attr = {
        ...unref(getMergeProps),
        customClass: `${prefixCls}__footer`,
      } as ModalCustomFooter
      return attr
    })

    // const getWrapperHeight = computed(() => {
    //   if (unref(fullscreenRef)) return undefined
    //   return unref(getProps).height
    // })

    watchEffect(() => {
      visibleRef.value = !!props.modelValue
      fullscreenRef.value = !!props.fullscreen
      draggableRef.value = !!props.draggable
    })

    watch(
      () => unref(visibleRef),
      (v) => {
        emit('visible-change', v)
        emit('update:modelValue', v)
        instance && modalMethods.emitVisible?.(v, instance.uid)
        nextTick(() => {
          if (props?.scrollTop && v && unref(modalWrapperRef)) {
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
     * 设置modal参数
     */
    function setModalProps(props: Partial<ModalProps>): void {
      propsRef.value = deepMerge(unref(propsRef) || {}, props)

      if (Reflect.has(props, 'modelValue')) {
        visibleRef.value = !!props.modelValue
      }
      if (Reflect.has(props, 'fullscreen')) {
        fullscreenRef.value = !!props.fullscreen
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
    function handleFullscreen() {
      setModalProps({ fullscreen: !unref(fullscreenRef) })
    }

    return {
      prefixCls,
      handleCancel,
      getBaiscBindValue,
      getHeaderBindValue,
      getWrapperBindValue,
      getFooterBindValue,
      handleFullscreen,
      fullscreenRef,
      getMergeProps,
      handleOk,
      visibleRef,
      draggableRef,
      omit,
      modalWrapperRef,
      handleExtHeight,
      handleHeightChange,
    }
  },
})
</script>
