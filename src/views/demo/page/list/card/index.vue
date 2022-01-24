<template>
  <PageWrapper
    :class="prefixCls"
    title="卡片列表">
    <template #footer>
      基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统。
      <div :class="`${prefixCls}__link`">
        <a>
          <Icon
            icon="bx:bx-paper-plane"
            color="#1890ff" />
          <span>开始</span>
        </a>
        <a>
          <Icon
            icon="carbon:warning"
            color="#1890ff" />
          <span>简介</span>
        </a>
        <a>
          <Icon
            icon="ion:document-text-outline"
            color="#1890ff" />
          <span>文档</span>
        </a>
      </div>
    </template>

    <div :class="`${prefixCls}__content`">
      <List>
        <el-row :gutter="16">
          <template
            v-for="item in list"
            :key="item.title">
            <el-col :span="6">
              <ListItem
                type="card"
                :cardClass="`${prefixCls}__card`"
                :cardBorder="false">
                <div :class="`${prefixCls}__card-title`">
                  <Icon
                    class="icon"
                    v-if="item.icon"
                    :icon="item.icon"
                    :color="item.color" />
                  {{ item.title }}
                </div>
                <div :class="`${prefixCls}__card-detail`">
                  基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统
                </div>
              </ListItem>
            </el-col>
          </template>
        </el-row>
      </List>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import Icon from '@/components/Icon/index'
import { cardList } from './data'
import { PageWrapper } from '@/components/Page'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    Icon,
    PageWrapper,
    List,
    ListItem,
  },
  setup() {
    return {
      prefixCls: 'list-card',
      list: cardList,
    }
  },
})
</script>

<style lang="scss" scoped>
.list-card {
  &__link {
    margin-top: 10px;
    font-size: 14px;

    a {
      margin-right: 30px;
    }

    span {
      margin-left: 5px;
    }
  }

  &:deep(#{&}__card) {
    padding: 16px;
    margin-bottom: -8px;
  }

  &__card {
    &-title {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary-color);

      .icon {
        margin-top: -5px;
        margin-right: 10px;
        font-size: 38px !important;
      }
    }

    &-detail {
      padding-top: 10px;
      padding-left: 30px;
      font-size: 14px;
      color: var(--text-secondary-color);
    }
  }
}
</style>
