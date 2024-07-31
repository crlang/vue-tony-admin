<template>
  <div :class="prefixCls">
    <ElPopover
      placement="bottom"
      trigger="click"
      width="300px"
      :popper-class="`${prefixCls}__overlay`"
      @show="handleShow"
    >
      <template #reference>
        <ElBadge :value="count" is-dot>
          <SvgIcon name="bells" />
        </ElBadge>
      </template>

      <ElTabs v-loading="loading" :class="`${prefixCls}__tabs`" stretch>
        <template v-for="item in listData" :key="item.key">
          <ElTabPane :label="item.name">
            <NoticeList
              v-if="item.key === '1'"
              :list="item.list"
              :vkey="item.key"
              @title-click="onNoticeClick"
            />
            <NoticeList v-else :list="item.list" :vkey="item.key" />
            <div :class="`${prefixCls}__more`">
              查看更多
            </div>
          </ElTabPane>
        </template>
      </ElTabs>
    </ElPopover>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ElBadge, ElLoading, ElPopover, ElTabPane, ElTabs } from 'element-plus'
import type { ListItem } from './data'

import NoticeList from './NoticeList.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { SvgIcon } from '@/components/SvgIcon'
import { useMessage } from '@/hooks/web/useMessage'

import { ApiNoticeList } from '@/api/notice'

export default defineComponent({
  components: { ElPopover, ElBadge, ElTabs, ElTabPane, SvgIcon, NoticeList },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const { prefixCls } = useDesign('header-notify')
    const { createMessage } = useMessage()
    const listData = ref()
    const loading = ref(false)

    const count = computed(() => {
      let count = 0
      if (listData.value?.length) {
        for (let i = 0; i < listData.value.length; i++) {
          count += listData.value[i].list.length
        }
      }

      return count
    })

    async function getData() {
      loading.value = true
      const res = await ApiNoticeList()
      listData.value = res
      loading.value = false
    }

    function onNoticeClick(record: ListItem) {
      createMessage.success(`Notice ID: ${record.id}`)
      record.titleDelete = !record.titleDelete
    }

    function handleShow() {
      getData()
    }

    return {
      prefixCls,
      listData,
      count,
      loading,
      onNoticeClick,
      handleShow,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-notify';

.#{$prefix-cls} {
  padding-top: 2px;

  &__overlay {
    &.is-light {
      border-color: transparent;

      /* stylelint-disable-next-line selector-class-pattern */
      .el-popper__arrow::before {
        border-color: transparent;
      }
    }

    &.el-popover.el-popper {
      padding: 0;
    }
  }

  &__tabs {
    min-height: 100px;

    /* stylelint-disable-next-line selector-class-pattern */
    .el-tabs__item {
      padding: 0;
    }
  }

  &__more {
    padding: 12px;
    color: var(--text-primary-color);
    text-align: center;

    &:hover {
      color: var(--text-primary-color);
      cursor: pointer;
      background: var(--background-main-color);
    }
  }
}
</style>
