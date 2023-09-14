<template>
  <el-card shadow="hover">
    <template #header><div class="el-card__header--title">项目进度</div></template>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in datainfo"
        :key="index"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp">
        <h4 class="timeline-title">{{ activity.content }}</h4>
        <p class="timeline-desc">{{ activity.desc }}</p>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElCard, ElTimeline, ElTimelineItem } from 'element-plus';

import { DashboardProgressInfo } from '@/api/types';

export default defineComponent({
  components: { ElCard, ElTimeline, ElTimelineItem },
  props: {
    datainfo: {
      type: Array as PropType<DashboardProgressInfo[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.timeline {
  &-title {
    margin-bottom: 6px;
    font-size: 20px;
    line-height: 1;
    color: var(--text-primary-color);
  }

  &-desc {
    font-size: 14px;
    color: var(--text-secondary-color);
  }
}
</style>
