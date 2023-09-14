<template>
  <PageWrapper title="Icon组件示例">
    <CardGrid title="element-plus官方图标库使用 (直接按需引入相应组件即可)" class="my-6" center>
      <CardGridItem><ArrowDownBold :style="{ width: '2rem' }" /></CardGridItem>
      <CardGridItem><ArrowLeftBold :style="{ width: '2rem' }" /></CardGridItem>
      <CardGridItem><ArrowRightBold :style="{ width: '2rem' }" /></CardGridItem>
    </CardGrid>

    <CardGrid title="SVG图标使用" class="my-6" center>
      <CardGridItem>
        <SvgIcon name="sun" :size="30" />
      </CardGridItem>
      <CardGridItem>
        <SvgIcon name="moon" :size="30" spin />
      </CardGridItem>
      <CardGridItem>
        <SvgIcon name="bells" :size="30" color="#f00" />
      </CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArrowDownBold, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';

import { CardGrid, CardGridItem } from '@/components/CardGrid';
import { SvgIcon } from '@/components/SvgIcon';

export default defineComponent({
  components: {
    ArrowDownBold,
    ArrowLeftBold,
    ArrowRightBold,
    CardGrid,
    CardGridItem,
    SvgIcon,
  },
  setup() {
    return {};
  },
});
</script>
