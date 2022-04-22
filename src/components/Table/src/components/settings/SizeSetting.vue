<template>
  <ElTooltip
    placement="top"
    content="密度">
    <ElDropdown
      trigger="hover"
      @command="handleTitleClick">
      <SvgIcon
        size="0"
        name="colum-height" />
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="default">
            <span>默认</span>
          </ElDropdownItem>
          <ElDropdownItem command="large">
            <span>宽松</span>
          </ElDropdownItem>
          <ElDropdownItem command="small">
            <span>紧凑</span>
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

    function handleTitleClick(key: ComponentSize) {
      table.setProps({
        size: key,
      })
    }

    return {
      handleTitleClick,
    }
  },
})
</script>
