<template>
  <Button
    @click="openDrawerLoading"
    class="my-4"
    type="primary">打开Drawer</Button>
  <BasicDrawer
    @register="register"
    title="Drawer Title"
    size="50%">
    <p> Drawer Info.</p>
    <Button
      @click="closeDrawer"
      class="my-4">关闭 Drawer</Button>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDrawer, useDrawer } from '@/components/Drawer'

export default defineComponent({
  components: { BasicDrawer },
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
