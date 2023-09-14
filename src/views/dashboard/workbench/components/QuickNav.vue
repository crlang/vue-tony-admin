<template>
  <CardGrid center title="快捷导航">
    <CardGridItem vertical v-for="(item, index) in datainfo" :key="index">
      <SvgIcon :name="item.icon" :color="item.color" size="20" />
      <span class="text-md mt-2">{{ item.title }}</span>
    </CardGridItem>
  </CardGrid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SvgIcon } from '@/components/SvgIcon';
import { CardGrid, CardGridItem } from '@/components/CardGrid';

import { DashboardNavInfo } from '@/api/types';

export default defineComponent({
  components: { CardGrid, CardGridItem, SvgIcon },
  props: {
    datainfo: {
      type: Array as PropType<DashboardNavInfo[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>
