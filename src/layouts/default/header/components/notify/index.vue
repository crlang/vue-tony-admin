<template>
  <div :class="prefixCls">
    <ElPopover
      placement="bottom"
      trigger="click"
      width="300px"
      :popper-class="`${prefixCls}__overlay`">
      <template #reference>
        <ElBadge
          :value="count"
          is-dot>
          <SvgIcon
            size="18"
            name="notices" />
        </ElBadge>
      </template>

      <ElTabs
        :class="`${prefixCls}__tabs`"
        stretch>
        <template
          v-for="item in listData"
          :key="item.key">
          <ElTabPane :label="item.name">
            <NoticeList
              :list="item.list"
              v-if="item.key === '1'"
              @title-click="onNoticeClick" />
            <NoticeList
              :list="item.list"
              v-else />
            <div :class="`${prefixCls}__more`">{{ t('common.viewMore') }}<span v-if="item.list.length !== 0">({{ item.list.length }})</span></div>
          </ElTabPane>
        </template>
      </ElTabs>
    </ElPopover>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ElPopover, ElBadge, ElTabs, ElTabPane } from 'element-plus'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { SvgIcon } from '@/components/Icon'
import { useMessage } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  components: { ElPopover, ElBadge, ElTabs, ElTabPane, SvgIcon, NoticeList },
  setup() {
    const { prefixCls } = useDesign('header-notify')
    const { createMessage } = useMessage()
    const listData = ref(tabListData)
    const { t } = useI18n()

    const count = computed(() => {
      let count = 0
      for (let i = 0; i < tabListData.length; i++) {
        count += tabListData[i].list.length
      }
      return count
    })

    function onNoticeClick(record: ListItem) {
      createMessage.success('Notice ID: ' + record.id)
      record.titleDelete = !record.titleDelete
    }

    return {
      t,
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
