<template>
  <PageWrapper
    :class="prefixCls"
    title="标准列表">
    <div :class="`${prefixCls}__top`">
      <el-row :gutter="12">
        <el-col
          :span="8"
          :class="`${prefixCls}__top-col`">
          <div>我的待办</div>
          <p>8个任务</p>
        </el-col>
        <el-col
          :span="8"
          :class="`${prefixCls}__top-col`">
          <div>本周任务平均处理时间</div>
          <p>32分钟</p>
        </el-col>
        <el-col
          :span="8"
          :class="`${prefixCls}__top-col`">
          <div>本周完成任务数</div>
          <p>24个任务</p>
        </el-col>
      </el-row>
    </div>

    <div :class="`${prefixCls}__content`">
      <List :pagination="pagination">
        <template
          v-for="item in list"
          :key="item.id">
          <ListItem class="list">
            <ListItemMeta>
              <template #avatar>
                <Icon
                  class="icon"
                  v-if="item.icon"
                  :icon="item.icon"
                  :color="item.color" />
              </template>
              <template #title>
                <span>{{ item.title }}</span>
                <div
                  class="extra"
                  v-if="item.extra">
                  {{ item.extra }}
                </div>
              </template>
              <template #description>
                <div class="description">
                  {{ item.description }}
                </div>
                <div class="info">
                  <div>
                    <span>Owner</span>
                    {{ item.author }}
                  </div>
                  <div>
                    <span>开始时间</span>
                    {{ item.datetime }}
                  </div>
                </div>
                <div class="progress">
                  <el-progress :percentage="item.percent" />
                </div>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElProgress } from 'element-plus'
import Icon from '@/components/Icon'
import { cardList } from './data'
import { PageWrapper } from '@/components/Page'
import { List, ListItem, ListItemMeta } from '@/components/List'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElProgress,
    Icon,
    PageWrapper,
    List,
    ListItem,
    ListItemMeta,
  },
  setup() {
    return {
      prefixCls: 'list-basic',
      list: cardList,
      pagination: {
        show: true,
        pageSize: 3,
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.list-basic {
  &__top {
    padding: 24px;
    text-align: center;
    background-color: var(--background-secondary-color);

    &-col {
      &:not(:last-child) {
        border-right: 1px dashed var(--border-grey-color);
      }

      div {
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 22px;
        color: var(--text-primary-color);
      }

      p {
        margin: 0;
        font-size: 24px;
        line-height: 32px;
        color: var(--text-primary-color);
      }
    }
  }

  &__content {
    padding: 24px;
    margin-top: 12px;
    background-color: var(--background-secondary-color);

    .list {
      position: relative;
    }

    .icon {
      font-size: 40px !important;
    }

    .extra {
      position: absolute;
      top: 20px;
      right: 15px;
      font-weight: normal;
      color: var(--primary-color);
      cursor: pointer;
    }

    .description {
      display: inline-block;
      width: 40%;
    }

    .info {
      display: inline-block;
      width: 30%;
      text-align: center;

      div {
        display: inline-block;
        padding: 0 20px;

        span {
          display: block;
        }
      }
    }

    .progress {
      display: inline-block;
      width: 15%;
      vertical-align: top;
    }
  }
}
</style>
