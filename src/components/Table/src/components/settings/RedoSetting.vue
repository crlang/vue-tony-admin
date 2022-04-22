<template>
  <ElTooltip
    placement="top"
    content="刷新">
    <span><Refresh @click="redo" /></span>
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import { Refresh } from '@element-plus/icons'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'RedoSetting',
  components: {
    ElTooltip,
    Refresh,
  },
  setup() {
    const table = useTableContext()

    function redo() {
      table.reload()
    }

    return { redo }
  },
})
</script>
