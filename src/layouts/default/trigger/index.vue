<template>
  <SiderTrigger v-if="sider" />
  <HeaderTrigger v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SiderTrigger from './SiderTrigger.vue';
import HeaderTrigger from './HeaderTrigger.vue';

export default defineComponent({
  name: 'LayoutTrigger',
  components: { SiderTrigger, HeaderTrigger },
  props: {
    sider: {
      type: Boolean,
      default: true,
    },
  },
  setup() {},
});
</script>
