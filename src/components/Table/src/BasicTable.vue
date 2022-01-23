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
      <!--selection checkbox-->
      <ElTableColumn
        v-if="getBindValues.showCheckboxColumn"
        type="selection"
        width="50" />
      <!--index-->
      <ElTableColumn
        v-if="getBindValues.showIndexColumn"
        label="序号"
        type="index"
        width="50" />
      <!--数据列-->
      <template
        v-for="(column,index) in columns"
        :key="column.prop">
        <template v-if="column.customRender">
          <ElTableColumn v-bind="column">
            <template #default="scope">
              <TableRender :render="()=>column.customRender&&column.customRender(scope.row,index,column)" />
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
          v-else-if="column.edit">
          <template #default="scope">
            <EditableCell
              :column="column"
              :index="scope.$index"
              :record="scope.row" />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-bind="column"
          v-else />
      </template>
    </ElTable>

    <div
      :class="`${prefixCls}__pagination`"
      v-if="getBindValues.data?.length">
      <ElPagination
        v-if="getBindValues.pagination"
        v-bind="getBindValues.pagination"
        v-model:currentPage="tablePagination.page"
        v-model:pageSize="tablePagination.size" />
    </div>
  </div>
</template>

<script lang="ts">
import type {
  BasicTableProps,
  TableActionType,
  SizeType,
  ColumnChangeParam,
} from './types/table'

import { defineComponent, ref, computed, unref, toRaw, watch } from 'vue'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form/index'
// import expandIcon from './components/ExpandIcon'
// import HeaderCell from './components/HeaderCell.vue'
import { InnerHandlers } from './types/table'

import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useDataSource } from './hooks/useDataSource'
import { useLoading } from './hooks/useLoading'
import { useRowSelection } from './hooks/useRowSelection'
// import { useCustomRow } from './hooks/useCustomRow'
import { useTableStyle } from './hooks/useTableStyle'
import { useTableExpand } from './hooks/useTableExpand'
import { createTableContext } from './hooks/useTableContext'
import { useTableForm } from './hooks/useTableForm'
import { useDesign } from '@/hooks/web/useDesign'
import TableHeader from './components/TableHeader.vue'
import TableRender from './components/TableRender'

import { omit } from 'lodash-es'
import { basicProps } from './props'
import { isString } from '@/utils/is'
import { PAGE_SIZE } from './const'
import EditableCell from './components/editable/EditableCell.vue'

export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    BasicForm,
    TableHeader,
    EditableCell,
    TableRender,
  },
  props: basicProps,
  emits: [
    'fetch-success',
    'fetch-error',
    'register',
    'edit-cancel',
    'edit-row-end',
    'edit-change',
    'columns-change',
    'select',
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-contextmenu',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change',
  ],
  setup(props, { attrs, emit, slots, expose }) {
    const tableElRef = ref()
    const tableData = ref<Recordable[]>([])

    const wrapRef = ref(null)
    const innerPropsRef = ref<Partial<BasicTableProps>>()

    // const tablePaginationPage = ref<number>(1)
    // const tablePaginationSize = ref<number>(PAGE_SIZE)
    const tablePagination = ref<{page?: number, size?:number}>({ page: 1, size: PAGE_SIZE })

    const { prefixCls } = useDesign('basic-table')
    const [registerForm, formActions] = useForm()

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) } as BasicTableProps
    })

    const { getLoading, setLoading } = useLoading(getProps)
    const {
      getPaginationInfo,
      getPagination,
      setPagination,
      setShowPagination,
      getShowPagination,
    } = usePagination(getProps)

    // tableData.value = unref(getTableData)

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
      // getAutoCreateKey,
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
      setCacheColumnsByField,
      setColumns,
      // getColumnsRef,
      getCacheColumns,
    } = useColumns(getProps)

    // const { customRow } = useCustomRow(getProps, {
    //   setSelectedRowKeys,
    //   getSelectRowKeys,
    //   clearSelectedRowKeys,
    //   getAutoCreateKey,
    //   emit
    // })

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
        // customRow,
        // expandIcon: slots.expandIcon ? null : expandIcon(),
        ...unref(getProps),
        ...unref(getHeaderProps),
        loading: unref(getLoading),
        rowSelection: unref(getRowSelectionRef),
        rowKey: unref(getRowKey),
        columns: toRaw(unref(getViewColumns)),
        pagination: unref(getPaginationInfo),
        data: dataSource,
        // footer: unref(getFooterProps),
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

    // const getTablePagination = computed(() => {
    //   const paginationInfo = toRaw(unref(getPaginationInfo))
    //   return paginationInfo
    // })

    const getEmptyDataIsShowTable = computed(() => {
      const { emptyDataIsShowTable, useSearchForm } = unref(getProps)
      if (emptyDataIsShowTable || !useSearchForm) {
        return true
      }
      return !!unref(getDataSourceRef).length
    })

    function setProps(props: Partial<BasicTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props }
      setTimeout(() => {
      }, 300)
    }

    function toggleAllSelection() {
      unref(tableElRef).toggleAllSelection()
    }

    // const getPaginationRef = computed(() => {
    //   const paginationInfo = unref(getPaginationInfo)
    //   return paginationInfo
    // })

    // const getPaginationProps = computed(() => {
    //   const { page, size } = unref(getPaginationInfo) || {}
    // opts && omit(opts, ['currentPage', 'pageSize'])
    // tablePagination.value = { page, size }
    //   return { page, size }
    // })

    watch(
      () => unref(getPaginationInfo),
      (v1) => {
        if (!v1) return
        const { page, size } = unref(tablePagination)

        if (v1.page === page && v1.size === size) return

        if (v1.page !== page || v1.size !== size) {
          tablePagination.value = { page: v1.page, size: v1.size }
        }
      },
    )

    watch(
      () => unref(tablePagination),
      (v) => {
        setPagination({ page: v.page, size: v.size || PAGE_SIZE })
      },
      { deep: true },
    )

    const tableAction: TableActionType = {
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
      redoHeight: () => void (0),
      setSelectedRows: () => void (0),
      toggleAllSelection,
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
        return unref(getBindValues).size as SizeType
      },
    }
    createTableContext({ ...tableAction, wrapRef, getBindValues })

    expose(tableAction)

    emit('register', tableAction, formActions)
    return {
      prefixCls,
      // tablePaginationPage,
      // tablePaginationSize,
      tablePagination,
      tableElRef,
      getBindValues,
      getLoading,
      registerForm,
      handleSearchInfoChange,
      getEmptyDataIsShowTable,
      getRowClassName,
      // getPaginationRef,
      // getPaginationProps,
      // getPaginationInfo,
      wrapRef,
      tableAction,
      // redoHeight,
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

[data-theme='dark'] {
  // position: relative;
}

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
}
</style>
