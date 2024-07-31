<template>
  <PageWrapper title="时间组件示例">
    <CollapseContainer title="基础示例">
      <RelativeTime :value="time1" />
      <br>
      <RelativeTime :value="time2" />
    </CollapseContainer>

    <CollapseContainer title="定时更新" class="mt-4" @expand="handleExpand">
      <ElDescriptions :column="1" border>
        <ElDescriptionsItem label="每60秒更新(默认)">
          <RelativeTime :value="now" />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="格式化日期">
          <RelativeTime :value="now" mode="date" />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="格式化时间">
          <RelativeTime :value="now" mode="datetime" />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="每秒更新">
          <RelativeTime :value="now" :step="1" />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="每5秒更新">
          <RelativeTime :value="now" :step="5" />
        </ElDescriptionsItem>
      </ElDescriptions>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

import { RelativeTime } from '@/components/RelativeTime'
import { CollapseContainer } from '@/components/CollapseContainer'

export default defineComponent({
  components: { ElDescriptions, ElDescriptionsItem, RelativeTime, CollapseContainer },
  setup() {
    const now = new Date().getTime()

    function handleExpand() {
      // do something
    }

    return {
      now,
      time1: now - 60 * 3 * 1000,
      time2: now - 86400 * 3 * 1000,
      handleExpand,
    }
  },
})
</script>
