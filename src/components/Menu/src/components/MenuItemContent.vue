<template>
  <span>
    <SvgIcon v-if="getIcon" :name="getIcon" class="mr-2" />
    {{ getName }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { contentProps } from '../props'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'MenuItemContent',
  components: {
    SvgIcon,
  },
  props: contentProps,
  setup(props) {
    const getName = computed(() => props.item?.name)
    const getIcon = computed(() => props.item?.icon)

    return {
      getName,
      getIcon,
    }
  },
})
</script>
