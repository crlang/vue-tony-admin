<template>
  <div class="workbench-base">
    <el-avatar
      shape="circle"
      :size="72"
      :src="datainfo.avatar"
      class="workbench-base__avatar" />
    <div class="workbench-base__title">
      <h1>{{ datainfo.name }}</h1>
      <p>{{ datainfo.desc }}</p>
    </div>
    <div class="workbench-base__statistic">
      <div class="statistic-item">
        <div>项目数</div>
        <div>{{ datainfo.projectCount || '--' }}</div>
      </div>
      <div class="statistic-item">
        <div>团队内排名</div>
        <div>{{ datainfo.teamIndex || '--' }}/{{ datainfo.teamTotal || '--' }}</div>
      </div>
      <div class="statistic-item">
        <div>项目访问</div>
        <div>{{ datainfo.projectViews || '--' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElAvatar } from 'element-plus';

import { DashboardUserInfo } from '@/api/types';

export default defineComponent({
  components: { ElAvatar },
  props: {
    datainfo: {
      type: Object as PropType<DashboardUserInfo>,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.workbench-base {
  display: flex;
  margin-top: 12px;

  &__avatar {
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    margin-right: 24px;
  }

  &__title {
    flex-shrink: 0;

    > h1 {
      margin-bottom: 16px;
      color: var(--text-primary-color);
    }

    > p {
      color: var(--text-secondary-color);
    }
  }

  &__statistic {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-end;

    .statistic-item {
      position: relative;
      display: inline-block;
      padding: 0 32px;
      color: var(--text-secondary-color);
      text-align: center;

      > div:last-child {
        margin-top: 4px;
        font-size: 130%;
        font-weight: bold;
        color: var(--text-primary-color);
      }

      &:not(:last-child)::after {
        position: absolute;
        top: 10%;
        right: 0;
        bottom: 10%;
        content: '';
        border-right: 1px solid #ccc;
      }
    }
  }
}
</style>
