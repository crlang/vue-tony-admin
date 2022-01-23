<template>
  <div :class="prefixCls">
    <el-popover
      placement="bottom"
      trigger="click"
      width="300px"
      :popper-class="`${prefixCls}__overlay`">
      <template #reference>
        <el-badge
          :value="count"
          is-dot>
          <SvgIcon
            size="18"
            name="notices" />
        </el-badge>
      </template>

      <el-tabs
        :class="`${prefixCls}__tabs`"
        stretch>
        <template
          v-for="item in listData"
          :key="item.key">
          <el-tab-pane>
            <template #label>
              {{ item.name }}
              <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
            </template>
            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
            <NoticeList
              :list="item.list"
              v-if="item.key === '1'"
              @title-click="onNoticeClick" />
            <NoticeList
              :list="item.list"
              v-else />
            <div :class="`${prefixCls}__more`">查看更多</div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { SvgIcon } from '@/components/Icon'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { SvgIcon, NoticeList },
  setup() {
    const { prefixCls } = useDesign('header-notify')
    const { createMessage } = useMessage()
    const listData = ref(tabListData)

    const count = computed(() => {
      let count = 0
      for (let i = 0; i < tabListData.length; i++) {
        count += tabListData[i].list.length
      }
      return count
    })

    function onNoticeClick(record: ListItem) {
      createMessage.success('你点击了通知，ID=' + record.id)
      record.titleDelete = !record.titleDelete
    }

    return {
      prefixCls,
      listData,
      count,
      onNoticeClick,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-notify';

.#{$prefix-cls} {
  padding-top: 2px;

  &__overlay  {
    &.is-light {
      border-color: transparent;

      .el-popper__arrow::before {
        border-color: transparent;
      }
    }

    &.el-popover.el-popper {
      padding: 0;
    }
  }

  &__tabs {
    .el-tabs__item {
      padding: 0;
    }
  }

  &__more {
    padding: 12px;
    color: var(--text-primary-color);
    text-align: center;

    &:hover {
      color: var(--link-color);
      cursor: pointer;
      background: var(--background-primary-color);
    }
  }
}
</style>
