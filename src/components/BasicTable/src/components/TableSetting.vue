<template>
  <ElTooltip v-if="redo" placement="top" content="刷新">
    <SvgIcon name="reload" @click="handleRedo" />
  </ElTooltip>
  <ElTooltip v-if="size" placement="top" content="密度">
    <SvgIcon :name="`size-${sizeRef}`" @click="handleSize" />
  </ElTooltip>

  <ElTooltip v-if="fullscreen" placement="top" content="全屏">
    <SvgIcon :name="isFullscreen ? 'shrink' : 'arrowsalt'" @click="toggle" />
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'

import { useTableContext } from '../hooks/useTableContext'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'TableSetting',
  components: {
    ElTooltip,
    SvgIcon,
  },
  props: {
    redo: Boolean,
    size: Boolean,
    fullscreen: Boolean,
  },
  setup() {
    const table = useTableContext()
    const sizeRef = ref<ComponentSize>('default')
    const { toggle, isFullscreen } = useFullscreen(table.wrapRef)

    /**
     * 刷新当前页
     */
    function handleRedo() {
      table.reload()
    }

    /**
     * 切换表格大小
     */
    function handleSize() {
      if (sizeRef.value === 'default') {
        sizeRef.value = 'large'
      }
      else if (sizeRef.value === 'large') {
        sizeRef.value = 'small'
      }
      else {
        sizeRef.value = 'default'
      }

      table.setTableProps({
        size: sizeRef.value,
      })
    }

    return {
      sizeRef,
      isFullscreen,
      toggle,
      handleRedo,
      handleSize,
    }
  },
})
</script>
