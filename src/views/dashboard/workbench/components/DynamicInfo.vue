<template>
  <el-card shadow="hover">
    <template #header>
      <div class="dync-card-header">
        <div class="el-card__header--title">项目动态</div>
        <el-button text>更多</el-button>
      </div>
    </template>
    <BasicList>
      <template v-for="item in datainfo" :key="item.title">
        <BasicListItem>
          <template #title>
            <div class="dync-title">{{ item.name }}</div>
            <div class="dync-desc">
              <p>{{ item.desc }}</p>
            </div>
          </template>
          <template #thumb>
            <img :src="item.avatar" :alt="item.name" width="32" />
          </template>
          <template #description>
            {{ item.date }}
          </template>
        </BasicListItem>
      </template>
    </BasicList>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElCard, ElButton } from 'element-plus';

import { BasicList, BasicListItem } from '@/components/BasicList';

import { DashboardNewsInfo } from '@/api/types';

export default defineComponent({
  components: { ElCard, ElButton, BasicList, BasicListItem },
  props: {
    datainfo: {
      type: Array as PropType<DashboardNewsInfo[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.dync-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dync-title {
  margin-bottom: 6px;
  font-size: 20px;
  color: var(--text-primary-color);
}

.dync-desc {
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary-color);
}
</style>
