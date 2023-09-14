<template>
  <div :class="prefixCls">
    <ElPopover
      placement="bottom"
      trigger="click"
      width="300px"
      @show="handleShow"
      :popper-class="`${prefixCls}__overlay`">
      <template #reference>
        <ElBadge :value="count" is-dot>
          <SvgIcon name="bells" />
        </ElBadge>
      </template>

      <ElTabs :class="`${prefixCls}__tabs`" stretch v-loading="loading">
        <template v-for="item in listData" :key="item.key">
          <ElTabPane :label="item.name">
            <NoticeList
              :list="item.list"
              :vkey="item.key"
              v-if="item.key === '1'"
              @title-click="onNoticeClick" />
            <NoticeList :list="item.list" :vkey="item.key" v-else />
            <div :class="`${prefixCls}__more`">查看更多</div>
          </ElTabPane>
        </template>
      </ElTabs>
    </ElPopover>
  </div>
</template>

<script lang="ts">
import type { ListItem } from './data';

import { computed, defineComponent, ref } from 'vue';
import { ElPopover, ElLoading, ElBadge, ElTabs, ElTabPane } from 'element-plus';

import { useDesign } from '@/hooks/web/useDesign';
import { SvgIcon } from '@/components/SvgIcon';
import { useMessage } from '@/hooks/web/useMessage';

import NoticeList from './NoticeList.vue';
import { ApiNoticeList } from '@/api/notice';

export default defineComponent({
  components: { ElPopover, ElBadge, ElTabs, ElTabPane, SvgIcon, NoticeList },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const { prefixCls } = useDesign('header-notify');
    const { createMessage } = useMessage();
    const listData = ref();
    const loading = ref(false);

    const count = computed(() => {
      let count = 0;
      if (listData.value?.length) {
        for (let i = 0; i < listData.value.length; i++) {
          count += listData.value[i].list.length;
        }
      }

      return count;
    });

    async function getData() {
      loading.value = true;
      const res = await ApiNoticeList();
      listData.value = res;
      loading.value = false;
    }

    function onNoticeClick(record: ListItem) {
      createMessage.success(`Notice ID: ${record.id}`);
      record.titleDelete = !record.titleDelete;
    }

    function handleShow() {
      getData();
    }

    return {
      prefixCls,
      listData,
      count,
      loading,
      onNoticeClick,
      handleShow,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-notify';

.#{$prefix-cls} {
  padding-top: 2px;

  &__overlay {
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
    min-height: 100px;

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
