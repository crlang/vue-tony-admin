<template>
  <span class="thumb">
    <ElImage
      v-if="fileUrl"
      :src="fileUrl"
      :preview-src-list="[fileUrl]"
      :width="104" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElImage } from 'element-plus'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  components: { ElImage },
  props: {
    fileUrl: propTypes.string.def(''),
    fileName: propTypes.string.def(''),
  },
})
</script>

<style lang="scss">
.thumb {
  img {
    position: static;
    display: block;
    cursor: zoom-in;
    border-radius: 4px;
  }
}
</style>
