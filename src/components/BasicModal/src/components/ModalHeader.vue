<template>
  <div
    :class="customClass"
    @dblclick="handleTitleDbClick">
    <BasicTitle :helpMessage="helpMessage">{{ customTitle }}</BasicTitle>
    <div :class="`${customClass}__extra`">
      <template v-if="showFullscreen">
        <ElTooltip
          content="还原"
          placement="bottom"
          v-if="fullscreen">
          <span @click="handleFullscreen"><SvgIcon name="fullscreen-exit" /></span>
        </ElTooltip>
        <ElTooltip
          content="最大化"
          placement="bottom"
          v-else>
          <span @click="handleFullscreen"><SvgIcon name="fullscreen" /></span>
        </ElTooltip>
      </template>
      <ElTooltip
        v-if="showClose"
        content="关闭"
        placement="bottom">
        <span @click="handleCancel"><SvgIcon name="close" /></span>
      </ElTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { ElTooltip } from 'element-plus'

import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

import { useModalDragMove } from '../hooks/useModalDrag'
import { headerProps } from '../props'

export default defineComponent({
  name: 'BasicModalHeader',
  components: { ElTooltip, BasicTitle, SvgIcon },
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean }, // inherit
    destroyOnClose: { type: Boolean }, // inherit
    fullscreen: { type: Boolean }, // inherit
    draggable: { type: Boolean }, // inherit
    customClass: { type: String },
    customTitle: { type: String },
    ...headerProps,
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    const { modelValue, draggable, destroyOnClose } = toRefs(props)
    useModalDragMove({
      modelValue,
      destroyOnClose,
      draggable,
    })

    function handleTitleDbClick(e) {
      if (!props.showFullscreen) return
      e.stopPropagation()

      handleFullscreen(e)
    }

    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    function handleFullscreen(e: Event) {
      e?.stopPropagation()
      e?.preventDefault()
      emit('fullscreen')
    }

    return {
      handleCancel,
      handleFullscreen,
      handleTitleDbClick,
    }
  },
})
</script>
