<template>
  <div :class="`${prefixCls}-wrap`">
    <div :class="prefixCls" ref="listElRef" v-loading="getLoading">
      <template v-if="getDataSourceRef && getDataSourceRef.length">
        <template v-for="(item, index) in getDataSourceRef" :key="index">
          <slot name="renderItem" v-bind="{ item, index }"></slot>
        </template>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
    <TablePagination
      v-if="getPaginationProps !== false"
      :prefixCls="`${prefixCls}-pagination`"
      v-bind="getPaginationProps"
      @page-change="handlePageChange"
      @size-change="handlePageSizeChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, computed } from 'vue';
import { ElLoading } from 'element-plus';

import { useDesign } from '@/hooks/web/useDesign';
import { ElePagination } from '@/components/ElementPlus';

import { BasicListProps } from './typing';
import { listProps } from './props';
import { useLoading } from './hooks/useLoading';
import { usePagination } from './hooks/usePagination';
import { useDataSource } from './hooks/useDataSource';
import TablePagination from './components/ListPagination.vue';
import { isBoolean } from '@/utils/is';

export default defineComponent({
  name: 'List',
  components: { TablePagination },
  directives: {
    loading: ElLoading.directive,
  },
  props: listProps,
  emits: ['pagination', 'fetch-success', 'fetch-error'],
  setup(props, { emit }) {
    const listElRef = ref();
    const listData = ref<Recordable[]>([]);
    const { prefixCls } = useDesign('basic-list');
    const propsRef = ref<Partial<BasicListProps>>({});

    /**
     * 获取 Props
     *
     * Get props
     */
    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) } as BasicListProps;
    });

    const { getLoading, setLoading } = useLoading(getProps);

    const { getListPagination, setPagination } = usePagination(getProps);

    const { handleListChange, getDataSourceRef, getDataSource, getRawDataSource, updateListDataRecord, deleteListDataRecord, insertListDataRecord, findListDataRecord, reload } =
      useDataSource(getProps, getListPagination, setPagination, setLoading, emit);

    /**
     * 获取分页 Props
     *
     * Get pagination props
     */
    const getPaginationProps = computed((): ElePagination | boolean => {
      return unref(getListPagination);
    });

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param tableProps List Props
     */
    function setListProps(tableProps: Partial<BasicListProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...tableProps } as Recordable;
    }

    /**
     * 处理分页页码变化
     *
     * Handling pagination page changes
     */
    function handlePageChange(currentPage: number) {
      const opts = unref(getListPagination);
      if (isBoolean(opts)) {
        return;
      }

      emit('pagination', {
        ...opts,
        currentPage: (opts.currentPage || 0) + currentPage,
      });

      handleListChange({ currentPage });
    }

    /**
     * 处理分页大小变化
     *
     * Handling pagination size changes
     */
    function handlePageSizeChange(pageSize: number) {
      const opts = unref(getListPagination);
      if (isBoolean(opts)) {
        return;
      }

      emit('pagination', {
        ...opts,
        pageSize: (opts.pageSize || 0) + pageSize,
      });

      handleListChange({ pageSize });
    }

    return {
      listElRef,
      listData,
      prefixCls,

      setListProps,
      getDataSourceRef,
      getLoading,

      getPaginationProps,
      handlePageChange,
      handlePageSizeChange,

      getDataSource,
      getRawDataSource,
      reload,
      updateListDataRecord,
      deleteListDataRecord,
      insertListDataRecord,
      findListDataRecord,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-list';

.#{$prefix-cls} {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid var(--border-color-light);

    &--card {
      border-bottom: none;
    }

    &-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;

      &-thumb {
        margin-right: 16px;

        > img {
          width: 64px;
          height: 64px;
        }
      }

      &-content {
        flex: 1 0;
        width: 0;
        color: rgba(0, 0, 0, 0.85);
      }

      &-title {
        font-size: 16px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);

        > a {
          color: inherit;
          transition: all 0.3s;
        }
      }

      &-description {
        margin-top: 8px;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.45);
      }
    }

    &:last-child {
      border: none;
    }
  }

  &-pagination {
    margin-top: 30px;
  }
}
</style>
