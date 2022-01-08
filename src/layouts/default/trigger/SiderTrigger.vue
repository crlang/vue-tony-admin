<template>
  <div @click.stop="toggleCollapsed">
    <DArrowRight v-if="getCollapsed" />
    <DArrowLeft v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'SiderTrigger',
  components: { DArrowLeft, DArrowRight },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()

    return { getCollapsed, toggleCollapsed }
  },
})
</script>
