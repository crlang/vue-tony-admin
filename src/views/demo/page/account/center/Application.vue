<template>
  <List :class="prefixCls">
    <el-row :gutter="16">
      <template
        v-for="item in list"
        :key="item.title">
        <el-col :span="6">
          <ListItem
            type="card"
            :cardClass="`${prefixCls}__card`">
            <div :class="`${prefixCls}__card-title`">
              <Icon
                class="icon"
                v-if="item.icon"
                :icon="item.icon"
                :color="item.color" />
              {{ item.title }}
            </div>
            <div :class="`${prefixCls}__card-num`">
              活跃用户：
              <span>{{ item.active }}</span>
              万
            </div>
            <div :class="`${prefixCls}__card-num`">
              新增用户：
              <span>{{ item.new }}</span>
            </div>
            <Icon
              :class="`${prefixCls}__card-download`"
              v-if="item.download"
              :icon="item.download" />
          </ListItem>
        </el-col>
      </template>
    </el-row>
  </List>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import Icon from '@/components/Icon'
import { applicationList } from './data'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ListItem,
    List,
    Icon,
  },
  setup() {
    return {
      prefixCls: 'account-center-application',
      list: applicationList,
    }
  },
})
</script>

<style lang="scss">
.account-center-application {
  &__card {
    width: 100%;
    padding: 16px;
    margin-bottom: -12px;

    &-title {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 500;

      .icon {
        margin-top: -5px;
        font-size: 22px;
      }
    }

    &-num {
      margin-left: 24px;
      line-height: 36px;
      color: var(--text-secondary-color);

      span {
        margin-left: 5px;
        font-size: 18px;
      }
    }

    &-download {
      float: right;
      font-size: 20px !important;
      color: var(--primary-color);
    }
  }
}
</style>
