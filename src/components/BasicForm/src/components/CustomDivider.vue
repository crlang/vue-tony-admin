<template>
  <BasicDivider v-bind="getProps" :text="label || text">
    <slot></slot>
  </BasicDivider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { BasicDivider, basicDividerProps } from '@/components/Basic';

export default defineComponent({
  name: 'CustomDivider',
  components: { BasicDivider },
  props: {
    label: {
      type: String,
      default: '',
    },
    ...basicDividerProps,
  },

  setup(props, { attrs }) {
    const getProps = computed(() => {
      return {
        ...attrs,
        ...props,
      };
    });
    return {
      getProps,
    };
  },
});
</script>
