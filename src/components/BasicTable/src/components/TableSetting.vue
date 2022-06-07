<template>
  <ElTooltip
    v-if="getSetting.redo"
    placement="top"
    content="刷新">
    <SvgIcon
      name="redo"
      @click="handleRedo" />
  </ElTooltip>
  <ElTooltip
    v-if="getSetting.size"
    placement="top"
    content="密度">
    <SvgIcon
      :name="`size-${sizeRef}`"
      @click="handleSize" />
  </ElTooltip>

  <ElTooltip
    v-if="getSetting.fullScreen"
    placement="top"
    content="全屏">
    <SvgIcon
      @click="toggle"
      :name="isFullscreen ? 'fullscreen-exit': 'fullscreen'" />
  </ElTooltip>
</template>

<script lang="ts">
import type { TableSetting } from '../typing'

import { defineComponent, computed, ref } from 'vue'
import { ComponentSize, ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'

import SvgIcon from '@/components/SvgIcon'

import { useTableContext } from '../hooks/useTableContext'

export default defineComponent({
  name: 'TableSetting',
  components: {
    ElTooltip,
    SvgIcon,
  },
  props: {
    setting: Object as PropType<TableSetting>,
  },
  setup(props) {
    const table = useTableContext()
    const sizeRef = ref<ComponentSize>('default')
    const { toggle, isFullscreen } = useFullscreen(table.wrapRef)

    /**
     * 获取最新设置
     *
     * Get table setting
     */
    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: true,
        ...(props.setting || {}),
      }
    })

    /**
     * 刷新当前页
     *
     * Redo table
     */
    function handleRedo() {
      table.reload()
    }

    /**
     * 切换表格大小
     *
     * Toggle table size
     */
    function handleSize() {
      if (sizeRef.value === 'default') {
        sizeRef.value = 'large'
      } else if (sizeRef.value === 'large') {
        sizeRef.value = 'small'
      } else {
        sizeRef.value = 'default'
      }

      table.setTableProps({
        size: sizeRef.value,
      })
    }

    return {
      getSetting,
      sizeRef,
      isFullscreen,
      toggle,
      handleRedo,
      handleSize,
    }
  },
})
</script>
