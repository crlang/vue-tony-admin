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
      :rowClassName="getRowClassName">
      <template
        v-for="column in columns"
        :key="column.prop">
        <template v-if="column.customRender">
          <ElTableColumn v-bind="column">
            <template #default="scope">
              <TableRender
                :customRender="column.customRender"
                :scope="scope"
                :column="column" />
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

import { defineComponent, ref, computed, unref, watchEffect, inject } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form'
import { PageWrapperFixedHeightKey } from '@/components/Page'

import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useDataSource } from './hooks/useDataSource'
import { useLoading } from './hooks/useLoading'
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
import { isString } from '@/utils/is'
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
    'columns-change',
    'pagination',
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

    const {
      getLoading,
      setLoading,
    } = useLoading(getProps)

    const {
      getPaginationInfo,
      getPagination,
      setPagination,
    } = usePagination(getProps)

    const {
      getBasicEmits,
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      toggleRowExpansion,
      setCurrentRow,
      clearSort,
      clearFilter,
      doLayout,
      sort,
    } = useBasicTableFn(getProps, tableElRef, emit)

    const {
      handleTableChange,
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

    const {
      getViewColumns,
      getColumns,
      setColumns,
      getColumnsRef,
      getCacheColumns,
    } = useColumns(getProps, getPaginationInfo)

    const {
      redoHeight,
    } = useTableScroll(
      getProps,
      tableElRef,
      getColumnsRef,
      getDataSourceRef,
    )

    const {
      getRowClassName,
    } = useTableStyle(getProps)

    const {
      getExpandOption,
      expandAll,
      collapseAll,
    } = useTableExpand(getProps, tableData, emit)

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
        onColumnsChange: (data: ColumnChangeParam[]) => {
          emit('columns-change', data)
          doLayout()
        },
      }

      return propsData
    })

    const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
        useTableForm(getProps, slots, fetch, getLoading)

    const getBindValues = computed(() => {
      const dataSource = unref(getDataSourceRef)
      let propsData: Recordable = {
        ...attrs,
        ...getBasicEmits,
        ...unref(getProps),
        loading: unref(getLoading),
        rowKey: unref(getRowKey),
        pagination: unref(getPaginationInfo),
        data: dataSource,
        ...unref(getExpandOption),
      }
      propsData = omit(propsData, ['title', 'columns', 'dataSource', 'api', 'showCheckboxColumn', 'showIndexColumn'])
      return propsData
    })

    const getWrapperClass = computed(() => {
      const values = unref(getBindValues)
      return [
        prefixCls,
        {
          [`${prefixCls}--full`]: values.canResize,
        },
      ]
    })

    function setProps(props: Partial<BasicTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props }
    }

    function handlePageChange(currentPage:number) {
      setPagination({ currentPage })
      emit('pagination', unref(getBindValues).pagination, 'currentPage', currentPage)
      handleTableChange(unref(getBindValues).pagination)
    }

    function handlePageSizeChange(pageSize:number) {
      setPagination({ pageSize })
      emit('pagination', unref(getBindValues).pagination, 'pageSize', pageSize)
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
      // Advanced
      reload,
      setProps,
      getColumns,
      setColumns,
      setLoading,
      getDataSource,
      getRawDataSource,
      setTableData,
      getCacheColumns,
      redoHeight,
      setPagination,
      getPagination,
      getFormRef: () => void (0) as any, // No definition needed
      expandAll,
      collapseAll,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      updateTableData,
      emit,
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
      getRowClassName,
      handlePageChange,
      handlePageSizeChange,
      wrapRef,
      tableAction,
      redoHeight,
      getHeaderProps,
      getFormProps,
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
  padding: 16px;
  background: var(--background-primary-color);

  &--full {
    height: 100%;
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

  &__pagination {
    padding: 1rem 0;
  }
}
</style>
