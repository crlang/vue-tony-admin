<template>
  <div>
    <slot></slot>
    {{ title }}
    <Edit />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Edit } from '@element-plus/icons'
export default defineComponent({
  name: 'EditTableHeaderIcon',
  components: { Edit },
  props: { title: { type: String, default: '' } },
})
</script>
