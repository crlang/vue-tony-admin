<template>
  <el-tooltip
    placement="top"
    :content="t('common.redo')">
    <Refresh @click="redo" />
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Refresh } from '@element-plus/icons'
import { useI18n } from '@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'RedoSetting',
  components: {
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
