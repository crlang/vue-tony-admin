<template>
  <span @click="toggleCollapsed">
    <SvgIcon :name="getCollapsed ? 'doubleright' : 'doubleleft'" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { SvgIcon } from '@/components/SvgIcon';

export default defineComponent({
  name: 'LayoutTrigger',
  components: { SvgIcon },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();
    return { getCollapsed, toggleCollapsed };
  },
});
</script>
