<template>
  <ElButton class="my-4" type="primary" @click="openDrawerLoading">
    打开Drawer
  </ElButton>
  <BasicDrawer title="Drawer Title" size="50%" @register="register">
    <p>Drawer Info.</p>
    <ElButton class="my-4" @click="closeDrawer">
      关闭 Drawer
    </ElButton>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicDrawer, useDrawer } from '@/components/BasicDrawer'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const [register, { openDrawer, setDrawerProps, closeDrawer }] = useDrawer()

    function openDrawerLoading() {
      openDrawer()
      setDrawerProps({ loading: true })
      setTimeout(() => {
        setDrawerProps({ loading: false })
      }, 2000)
    }

    return {
      register,
      openDrawerLoading,
      closeDrawer,
    }
  },
})
</script>
