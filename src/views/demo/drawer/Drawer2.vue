<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Drawer Title"
    width="50%"
    @register="register"
  >
    Drawer Info.<ElButton type="primary" @click="closeDrawer">内部关闭drawer</ElButton>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const [register, { closeDrawer }] = useDrawerInner()

    return { register, closeDrawer }
  },
})
</script>
