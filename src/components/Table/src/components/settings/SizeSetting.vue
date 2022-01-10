<template>
  <el-tooltip
    placement="top"
    :content="t('component.table.settingDens')">
    <el-dropdown
      trigger="click"
      @command="handleTitleClick">
      <SvgIcon
        size="0"
        name="colum-height" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="default">
            <span>{{ t('component.table.settingDensDefault') }}</span>
          </el-dropdown-item>
          <el-dropdown-item command="large">
            <span>{{ t('component.table.settingDensLarge') }}</span>
          </el-dropdown-item>
          <el-dropdown-item command="small">
            <span>{{ t('component.table.settingDensSmall') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script lang="ts">
import type { SizeType } from '../../types/table'
import { defineComponent } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'SizeSetting',
  components: { SvgIcon },
  setup() {
    const table = useTableContext()
    const { t } = useI18n()

    function handleTitleClick(key: SizeType) {
      table.setProps({
        size: key,
      })
    }

    return {
      handleTitleClick,
      t,
    }
  },
})
</script>
