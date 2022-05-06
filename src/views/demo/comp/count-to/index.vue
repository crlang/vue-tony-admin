<template>
  <CountTo
    prefix="$"
    color="#f00"
    :startVal="1"
    :endVal="200000"
    :duration="8000" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { CountTo } from '@/components/CountTo'

export default defineComponent({
  components: {
    CountTo,
  },
})
</script>
