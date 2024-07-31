<template>
  <div :class="prefixCls" @dblclick="handleTitleDbClick">
    <BasicTitle :help-message="helpMessage">
      <template v-if="title">
        {{ title }}
      </template>
      <slot v-else name="header"></slot>
    </BasicTitle>
    <div :class="`${prefixCls}__extra`">
      <template v-if="showFullscreen">
        <ElTooltip v-if="fullscreen" content="还原" placement="bottom">
          <SvgIcon name="shrink" @click="handleFullscreen" />
        </ElTooltip>
        <ElTooltip v-else content="最大化" placement="bottom">
          <SvgIcon name="arrowsalt" @click="handleFullscreen" />
        </ElTooltip>
      </template>
      <ElTooltip v-if="showClose" content="关闭" placement="bottom">
        <SvgIcon name="close" @click="handleCancel" />
      </ElTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'

import { headerProps } from '../props'
import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'BasicModalHeader',
  components: { ElTooltip, BasicTitle, SvgIcon },
  inheritAttrs: false,
  props: {
    fullscreen: Boolean, // inherit
    prefixCls: String, // inherit
    title: String, // inherit
    ...headerProps,
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    /**
     * 双击标题栏全屏
     *
     * @param e
     */
    function handleTitleDbClick(e: Event) {
      if (!props.showFullscreen)
        return
      e.stopPropagation()

      handleFullscreen(e)
    }

    /**
     * 点击关闭
     *
     * @param e
     */
    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    /**
     * 点击全屏
     *
     * @param e
     */
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
