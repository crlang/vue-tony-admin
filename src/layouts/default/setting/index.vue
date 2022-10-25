<template>
  <div>
    <span
      style="width: 100%; text-align: center"
      @click="openDrawer(true)">
      <Icon name="ion:settings-outline" />
    </span>
    <SettingDrawer @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Icon from '@/components/Icon'
import { useDrawer } from '@/components/BasicDrawer'

import SettingDrawer from './SettingDrawer'

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
