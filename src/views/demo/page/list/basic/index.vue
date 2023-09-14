<template>
  <PageWrapper :class="prefixCls" title="数据列表">
    <div :class="`${prefixCls}__top`">
      <el-row :gutter="12">
        <el-col :span="8" :class="`${prefixCls}__top-col`">
          <div>我的待办</div>
          <p>8个任务</p>
        </el-col>
        <el-col :span="8" :class="`${prefixCls}__top-col`">
          <div>本周任务平均处理时间</div>
          <p>32分钟</p>
        </el-col>
        <el-col :span="8" :class="`${prefixCls}__top-col`">
          <div>本周完成任务数</div>
          <p>24个任务</p>
        </el-col>
      </el-row>
    </div>

    <CollapseContainer title="常规列表">
      <div :class="`${prefixCls}__content`">
        <BasicList :dataSource="list" :pagination="pagination">
          <template #renderItem="{ item }">
            <BasicListItem class="list">
              <template #title>
                <span>{{ item.title }}</span>
                <div class="extra" v-if="item.extra">
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
            </BasicListItem>
          </template>
        </BasicList>
      </div>
    </CollapseContainer>

    <CollapseContainer class="my-4" title="基础列表">
      <div :class="`${prefixCls}__content`">
        <BasicList :api="mockApi">
          <template #renderItem="{ item, index }">
            <BasicListItem :title="item.title" :thumb="`https://himg.bdimg.com/sys/portrait/hotitem/wildkid/${index + 26}`">
              <template #description>{{ item.description }}</template>
            </BasicListItem>
          </template>
        </BasicList>
      </div>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElRow, ElCol, ElProgress } from 'element-plus';
import { cardList } from './data';
import { BasicList, BasicListItem } from '@/components/BasicList';
import { CollapseContainer } from '@/components/CollapseContainer';

function mockApi({ page = 1, pageSize = 20 }) {
  return new Promise<any>((resolve, reject) => {
    if ((page - 0) * pageSize > cardList.length) {
      return reject(null);
    }
    const res = {
      page: page,
      pageSize: pageSize,
      items: cardList.slice((page - 1) * pageSize, page * pageSize),
      total: cardList.length,
    };
    return resolve(res);
  });
}

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElProgress,
    BasicList,
    BasicListItem,
    CollapseContainer,
  },
  setup() {
    return {
      prefixCls: 'list-basic',
      list: cardList,
      pagination: {
        show: true,
        pageSize: 3,
      },
      mockApi,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-basic {
  &__top {
    padding: 24px;
    margin-bottom: 16px;
    text-align: center;
    background-color: var(--background-primary-color);

    &-col {
      &:not(:last-child) {
        border-right: 1px dashed var(--border-color);
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
