<template>
  <div
    ref="wrapRef"
    :class="getWrapperClass">
    <BasicForm
      submitOnReset
      v-bind="getFormProps"
      v-if="getBindValues.useSearchForm"
      :tableAction="tableAction"
      @register="registerForm"
      @advanced-change="redoHeight"
      @submit="handleSearchInfoChange">
      <template
        #[replaceFormSlotKey(item)]="data"
        v-for="item in getFormSlotKeys">
        <slot
          :name="item"
          v-bind="data || {}"></slot>
      </template>
    </BasicForm>
    <TableHeader
      v-if="getHeaderProps"
      v-bind="getHeaderProps">
      <template
        #toolbar
        v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </template>
      <template
        #tableTitle
        v-if="$slots.tableTitle">
        <slot name="tableTitle"></slot>
      </template>
      <template
        #headerTop
        v-if="$slots.headerTop">
        <slot name="headerTop"></slot>
      </template>
    </TableHeader>
    <ElTable
      ref="tableElRef"
      v-bind="getBindValues"
      v-loading="getBindValues.loading"
      v-show="getEmptyDataIsShowTable"
      :rowClassName="getRowClassName">
      <template
        v-for="column in columns"
        :key="column.prop">
        <template v-if="column.customRender">
          <ElTableColumn v-bind="column">
            <template #default="scope">
              <TableRender :render="column.customRender(scope)" />
            </template>
          </ElTableColumn>
        </template>
        <template v-else-if="column.type==='action'">
          <ElTableColumn v-bind="column">
            <template #default="scope">
              <TableAction
                :prefixCls="`${prefixCls}-action`"
                :column="column"
                :scopes="scope" />
            </template>
          </ElTableColumn>

        </template>
        <template v-else-if="column.isSlot">
          <slot
            :name="column.prop"
            v-bind="column"></slot>
        </template>

        <ElTableColumn
          v-bind="column"
          v-else />

      </template>
    </ElTable>

    <div
      :class="`${prefixCls}__pagination`"
      v-if="getBindValues.pagination !== false ">
      <TablePagination
        v-bind="getBindValues.pagination"
        @page-change="handlePageChange"
        @size-change="handlePageSizeChange" />
    </div>
  </div>
</template>

<script lang="ts">
import type {
  BasicTableProps,
  TableActionType,
  ColumnChangeParam,
} from './types/table'

import { defineComponent, ref, computed, unref, toRaw, watchEffect, inject } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form'
import { PageWrapperFixedHeightKey } from '@/components/Page'
import { InnerHandlers } from './types/table'

import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useDataSource } from './hooks/useDataSource'
import { useLoading } from './hooks/useLoading'
import { useRowSelection } from './hooks/useRowSelection'
import { useTableScroll } from './hooks/useTableScroll'
import { useTableStyle } from './hooks/useTableStyle'
import { useTableExpand } from './hooks/useTableExpand'
import { createTableContext } from './hooks/useTableContext'
import { useTableForm } from './hooks/useTableForm'
import { useDesign } from '@/hooks/web/useDesign'
import TableHeader from './components/TableHeader.vue'
import TableRender from './components/TableRender'
import TablePagination from './components/TablePagination.vue'
import TableAction from './components/TableAction.vue'

import { omit } from 'lodash-es'
import { basicProps, ElTableBasicEmits } from './props'
import { isFunction, isString } from '@/utils/is'
import { warn } from '@/utils/log'
import { useBasicTableFn } from './hooks/useBasic'

export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    BasicForm,
    TableHeader,
    TableRender,
    TablePagination,
    TableAction,
  },
  props: basicProps,
  emits: [
    ...ElTableBasicEmits,
    'fetch-success',
    'fetch-error',
    'register',
    'edit-cancel',
    'edit-row-end',
    'edit-change',
    'columns-change',
    'change',
  ],

  setup(props, { attrs, emit, slots, expose }) {
    const tableElRef = ref()
    const tableData = ref<Recordable[]>([])

    const wrapRef = ref(null)
    const innerPropsRef = ref<Partial<BasicTableProps>>()

    const { prefixCls } = useDesign('basic-table')
    const [registerForm, formActions] = useForm()

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) } as BasicTableProps
    })

    const isFixedHeightPage = inject(PageWrapperFixedHeightKey, false)
    watchEffect(() => {
      unref(isFixedHeightPage) &&
          props.canResize &&
          warn(
            "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)",
          )
    })

    const { getLoading, setLoading } = useLoading(getProps)
    const {
      getPaginationInfo,
      getPagination,
      setPagination,
      setShowPagination,
      getShowPagination,
    } = usePagination(getProps)

    const {
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      toggleRowExpansion,
      setCurrentRow,
      clearSort,
      clearFilter,
      doLayout,
      sort,
    } = useBasicTableFn(getProps, tableElRef)

    const {
      getRowSelection,
      getRowSelectionRef,
      getSelectRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setSelectedRowKeys,
    } = useRowSelection(getProps, tableData, emit)

    const {
      handleTableChange: onTableChange,
      getDataSourceRef,
      getDataSource,
      getRawDataSource,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      fetch,
      getRowKey,
      reload,
      updateTableData,
    } = useDataSource(
      getProps,
      {
        tableData,
        getPaginationInfo,
        setLoading,
        setPagination,
        getFieldsValue: formActions.getFieldsValue,
      },
      emit,
    )

    function handleTableChange(...args) {
      onTableChange.call(undefined, ...args)
      emit('change', ...args)
      const { onChange } = unref(getProps)
      onChange && isFunction(onChange) && onChange.call(undefined, ...args)
    }

    const {
      getViewColumns,
      getColumns,
      setCacheColumnsByField,
      setColumns,
      getColumnsRef,
      getCacheColumns,
    } = useColumns(getProps)

    const { getScrollRef, redoHeight } = useTableScroll(
      getProps,
      tableElRef,
      getColumnsRef,
      getRowSelectionRef,
      getDataSourceRef,
    )

    const { getRowClassName } = useTableStyle(getProps, prefixCls)

    const { getExpandOption, expandAll, collapseAll } = useTableExpand(getProps, tableData, emit)

    const handlers: InnerHandlers = {
      onColumnsChange: (data: ColumnChangeParam[]) => {
        emit('columns-change', data)
        // support useTable
        unref(getProps).onColumnsChange?.(data)
      },
    }

    const getHeaderProps = computed(() => {
      const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(getProps)
      const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting
      if (hideTitle && !isString(title)) {
        return {}
      }

      const propsData: Recordable = {
        title,
        tableSetting,
        showTableSetting,
        titleHelpMessage,
        onColumnsChange: handlers.onColumnsChange,
      }

      return propsData
    })

    const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
        useTableForm(getProps, slots, fetch, getLoading)

    const getBindValues = computed(() => {
      const dataSource = unref(getDataSourceRef)
      let propsData: Recordable = {
        ...attrs,
        ...unref(getProps),
        ...unref(getHeaderProps),
        scroll: unref(getScrollRef),
        loading: unref(getLoading),
        rowSelection: unref(getRowSelectionRef),
        rowKey: unref(getRowKey),
        columns: toRaw(unref(getViewColumns)),
        pagination: unref(getPaginationInfo),
        data: dataSource,
        ...unref(getExpandOption),
      }
      propsData = omit(propsData, ['title'])
      return propsData
    })

    const getWrapperClass = computed(() => {
      const values = unref(getBindValues)
      return [
        prefixCls,
        attrs.class,
        {
          [`${prefixCls}-form-container`]: values.useSearchForm,
          [`${prefixCls}--inset`]: values.inset,
        },
      ]
    })

    const getEmptyDataIsShowTable = computed(() => {
      const { emptyDataIsShowTable, useSearchForm } = unref(getProps)
      if (emptyDataIsShowTable || !useSearchForm) {
        return true
      }
      return !!unref(getDataSourceRef).length
    })

    function setProps(props: Partial<BasicTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props }
    }

    function handlePageChange(v:number) {
      setPagination({ currentPage: v })
      handleTableChange(unref(getBindValues).pagination)
    }

    function handlePageSizeChange(v:number) {
      setPagination({ pageSize: v })
      handleTableChange(unref(getBindValues).pagination)
    }

    const tableAction: TableActionType = {
      // Element Plus
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      toggleRowExpansion,
      setCurrentRow,
      clearSort,
      clearFilter,
      doLayout,
      sort,
      // 拓展
      reload,
      getSelectRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setPagination,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      redoHeight,
      setSelectedRows: () => void (0),
      setSelectedRowKeys,
      setColumns,
      setLoading,
      getDataSource,
      getRawDataSource,
      setProps,
      getRowSelection,
      getPaginationRef: getPagination,
      getColumns,
      getCacheColumns,
      emit,
      updateTableData,
      setShowPagination,
      getShowPagination,
      setCacheColumnsByField,
      expandAll,
      collapseAll,
      getSize: () => {
        return unref(getBindValues).size
      },
    }
    createTableContext({ ...tableAction, wrapRef, getBindValues })

    expose(tableAction)

    emit('register', tableAction, formActions)

    return {
      prefixCls,
      tableElRef,
      getBindValues,
      getLoading,
      registerForm,
      handleSearchInfoChange,
      getEmptyDataIsShowTable,
      getRowClassName,
      handlePageChange,
      handlePageSizeChange,
      wrapRef,
      tableAction,
      redoHeight,
      getHeaderProps,
      getFormProps: getFormProps as any,
      replaceFormSlotKey,
      getFormSlotKeys,
      getWrapperClass,
      columns: getViewColumns,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table';

.#{$prefix-cls} {
  max-width: 100%;
  padding: 8px;
  background: var(--background-secondary-color);

  &-row__striped {
    td {
      background-color: var(--background-tertiary-color);
    }
  }

  &-form-container {
    padding: 16px;
  }

  &-action {
    display: flex;
    align-items: center;

    &.left {
      justify-content: flex-start;
    }

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: flex-end;
    }

    .el-button  {
      display: flex;
      align-items: center;

      .eleicon {
        margin-right: 4px;
      }
    }
  }
}
</style>
