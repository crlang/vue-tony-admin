<template>
  <ElTooltip
    placement="top"
    :content="t('component.table.settingDens')">
    <ElDropdown
      trigger="click"
      @command="handleTitleClick">
      <SvgIcon
        size="0"
        name="colum-height" />
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="default">
            <span>{{ t('component.table.settingDensDefault') }}</span>
          </ElDropdownItem>
          <ElDropdownItem command="large">
            <span>{{ t('component.table.settingDensLarge') }}</span>
          </ElDropdownItem>
          <ElDropdownItem command="small">
            <span>{{ t('component.table.settingDensSmall') }}</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ElTooltip>
</template>

<script lang="ts">
import type { ComponentSize } from '@/utils/types'

import { defineComponent } from 'vue'
import { ElTooltip, ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'SizeSetting',
  components: {
    ElTooltip,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    SvgIcon,
  },
  setup() {
    const table = useTableContext()
    const { t } = useI18n()

    function handleTitleClick(key: ComponentSize) {
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
