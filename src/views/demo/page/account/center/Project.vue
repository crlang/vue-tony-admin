<template>
  <BasicList :class="prefixCls">
    <el-row :gutter="16">
      <template v-for="item in list" :key="item.title">
        <el-col :span="6">
          <BasicListItem :class="`${prefixCls}__item`">
            <el-card :class="`${prefixCls}__card`" :bodyStyle="{ padding: 0 }">
              <div :class="`${prefixCls}__card-img`" :style="{ 'background-image': 'url()' }"></div>

              <div :class="`${prefixCls}__card-title`">
                {{ item.title }}
              </div>
              <div :class="`${prefixCls}__card-content`">
                {{ item.content }}
              </div>
            </el-card>
          </BasicListItem>
        </el-col>
      </template>
    </el-row>
  </BasicList>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElRow, ElCol, ElCard } from 'element-plus';
import { projectList } from './data';
import { BasicList, BasicListItem } from '@/components/BasicList';

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    BasicList,
    BasicListItem,
  },
  setup() {
    return {
      prefixCls: 'account-center-project',
      list: projectList,
    };
  },
});
</script>

<style lang="scss">
.account-center-project {
  &__item {
    border: none;
  }

  &__card {
    width: 100%;
    border: 1px solid var(--border-color-light);

    &-img {
      width: 100%;
      padding-bottom: 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }

    &-title {
      margin: 5px 10px;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary-color);
    }

    &-content {
      margin: 5px 10px;
      color: var(--text-secondary-color);
    }
  }
}
</style>
