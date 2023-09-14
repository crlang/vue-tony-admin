<template>
  <PageWrapper :class="prefixCls" title="卡片列表">
    <template #extra>
      基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统。
      <div :class="`${prefixCls}__link`">
        <a>
          <SvgIcon name="m_guide" color="var(--primary-color)" />
          <span>开始</span>
        </a>
        <a>
          <SvgIcon name="info-cirlce-o" color="var(--primary-color)" />
          <span>简介</span>
        </a>
        <a>
          <SvgIcon name="filetext" color="var(--primary-color)" />
          <span>文档</span>
        </a>
      </div>
    </template>

    <div :class="`${prefixCls}__content`">
      <BasicList>
        <el-row :gutter="16">
          <template v-for="item in list" :key="item.title">
            <el-col :span="6">
              <BasicListItem :class="`${prefixCls}__card-item`">
                <el-card :class="`${prefixCls}__card`" :bodyStyle="{ padding: 0 }">
                  <div :class="`${prefixCls}__card-title`">
                    <SvgIcon
                      class="icon"
                      size="50"
                      v-if="item.icon"
                      :name="item.icon"
                      :color="item.color" />
                    <span>{{ item.title }}</span>
                  </div>
                  <div :class="`${prefixCls}__card-detail`">基于 Vue3, TypeScript, Element Plus 实现的一套完整的企业级后台管理系统</div>
                </el-card>
              </BasicListItem>
            </el-col>
          </template>
        </el-row>
      </BasicList>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElRow, ElCol, ElCard } from 'element-plus';
import { SvgIcon } from '@/components/SvgIcon';
import { cardList } from './data';
import { BasicList, BasicListItem } from '@/components/BasicList';

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    SvgIcon,
    BasicList,
    BasicListItem,
  },
  setup() {
    return {
      prefixCls: 'list-card',
      list: cardList,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-card {
  &__link {
    margin-top: 10px;
    font-size: 14px;

    a {
      display: inline-flex;
      align-items: center;
      margin-right: 30px;
    }

    span {
      margin-left: 5px;
    }
  }

  &__card {
    padding: 16px;

    &-item {
      border: none;
    }

    &-title {
      display: flex;
      font-size: 18px;
      font-weight: 500;
      color: var(--text-primary-color);

      .icon {
        margin-right: 10px;
      }
    }

    &-detail {
      padding-left: 60px;
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-secondary-color);
    }
  }
}
</style>
