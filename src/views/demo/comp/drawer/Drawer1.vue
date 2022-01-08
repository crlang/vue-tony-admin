<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Drawer Title"
    size="50%">Drawer Info.</BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDrawer } from '@/components/Drawer'
export default defineComponent({
  components: { BasicDrawer },
  setup() {
    return {}
  },
})
</script>
