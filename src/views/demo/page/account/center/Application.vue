<template>
  <BasicList :class="prefixCls">
    <ElRow :gutter="16">
      <template v-for="item in list" :key="item.title">
        <ElCol :span="6">
          <BasicListItem :class="`${prefixCls}__item`">
            <ElCard :class="`${prefixCls}__card`" :body-style="{ padding: 0 }">
              <div :class="`${prefixCls}__card-title`">
                <SvgIcon
                  v-if="item.icon"
                  class="icon"
                  :name="item.icon"
                  size="24"
                  :color="item.color"
                />
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
              <SvgIcon
                v-if="item.download"
                :class="`${prefixCls}__card-download`"
                size="20"
                :name="item.download"
              />
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
import { applicationList } from './data'
import { SvgIcon } from '@/components/SvgIcon'
import { BasicList, BasicListItem } from '@/components/BasicList'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    BasicList,
    BasicListItem,
    SvgIcon,
  },
  setup() {
    return {
      prefixCls: 'account-center',
      list: applicationList,
    }
  },
})
</script>

<style lang="scss" scoped>
.account-center {
  &__item {
    border: none;
  }

  &__card {
    width: 100%;
    padding: 16px;
    border: 1px solid var(--border-color-light);

    &-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 500;

      .icon {
        margin-right: 12px;
      }
    }

    &-num {
      margin-left: 36px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--text-secondary-color);

      span {
        margin-left: 5px;
        font-size: 18px;
      }
    }

    &-download {
      float: right;
      color: var(--primary-color);
    }
  }
}
</style>
