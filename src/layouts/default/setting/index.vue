<template>
  <div>
    <Icon
      icon="ion:settings-outline"
      style="display: flex;align-items: center;height: 100%;"
      @click="openDrawer(true)" />
    <SettingDrawer @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SettingDrawer from './SettingDrawer'
import Icon from '@/components/Icon'
import { useDrawer } from '@/components/Drawer'

export default defineComponent({
  name: 'SettingButton',
  components: { SettingDrawer, Icon },
  setup() {
    const [register, { openDrawer }] = useDrawer()

    return {
      register,
      openDrawer,
    }
  },
})
</script>
