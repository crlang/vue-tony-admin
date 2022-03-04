<template>
  <ElTooltip
    placement="top"
    :content="t('common.redo')">
    <span><Refresh @click="redo" /></span>
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import { Refresh } from '@element-plus/icons'
import { useI18n } from '@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'RedoSetting',
  components: {
    ElTooltip,
    Refresh,
  },
  setup() {
    const table = useTableContext()
    const { t } = useI18n()

    function redo() {
      table.reload()
    }

    return { redo, t }
  },
})
</script>
