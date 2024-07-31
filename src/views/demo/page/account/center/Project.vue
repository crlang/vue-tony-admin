<template>
  <BasicList :class="prefixCls">
    <ElRow :gutter="16">
      <template v-for="item in list" :key="item.title">
        <ElCol :span="6">
          <BasicListItem :class="`${prefixCls}__item`">
            <ElCard :class="`${prefixCls}__card`" :body-style="{ padding: 0 }">
              <div :class="`${prefixCls}__card-img`" :style="{ 'background-image': 'url()' }"></div>

              <div :class="`${prefixCls}__card-title`">
                {{ item.title }}
              </div>
              <div :class="`${prefixCls}__card-content`">
                {{ item.content }}
              </div>
            </ElCard>
          </BasicListItem>
        </ElCol>
      </template>
    </ElRow>
  </BasicList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElCol, ElRow } from 'element-plus'
import { projectList } from './data'
import { BasicList, BasicListItem } from '@/components/BasicList'

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
    }
  },
})
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
