<template>
  <div>
    <span style="width: 100%; text-align: center" @click="openDrawer(true)">
      <SvgIcon name="setting" />
    </span>
    <SettingDrawer @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SettingDrawer from './SettingDrawer'
import { SvgIcon } from '@/components/SvgIcon'
import { useDrawer } from '@/components/BasicDrawer'

export default defineComponent({
  name: 'SettingButton',
  components: { SettingDrawer, SvgIcon },
  setup() {
    const [register, { openDrawer }] = useDrawer()
    return {
      register,
      openDrawer,
    }
  },
})
</script>

<style lang="scss">
.setting-drawer {
  .el-divider {
    --el-bg-color: var(--background-primary-color);
  }
}
</style>
