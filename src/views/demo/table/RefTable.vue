<template>
  <PageWrapper>
    <div class="mb-4">
      <ElButton @click="reloadTable">还原</ElButton>
      <ElButton @click="changeLoading">开启loading</ElButton>
      <ElButton @click="changeColumns">更改Columns</ElButton>
      <ElButton @click="getColumn">获取Columns</ElButton>
      <ElButton @click="getTableData">获取表格数据</ElButton>
      <ElButton @click="getTableRawData">获取接口原始数据</ElButton>
      <ElButton @click="setPaginationInfo">跳转到第2页</ElButton>
    </div>
    <div class="mb-4">
      <ElButton @click="getPaginationInfo">获取分页信息</ElButton>
    </div>
    <BasicTable
      ref="tableRef"
      title="RefTable示例"
      title-help-message="使用Ref调用表格内方法"
      :api="api"
      :columns="columns"
      show-checkbox-column
    />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { getBasicColumns, getBasicShortColumns } from './data'
import { BasicTable } from '@/components/BasicTable'
import type { TableActionMethods } from '@/components/BasicTable'
import { useMessage } from '@/hooks/web/useMessage'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const tableRef = ref<Nullable<TableActionMethods>>(null)
    const { createMessage } = useMessage()

    function getTable() {
      const table = unref(tableRef)
      if (!table) {
        throw new Error('tableAction is null')
      }
      return table
    }

    function changeLoading() {
      getTable().setLoading(true)
      setTimeout(() => {
        getTable().setLoading(false)
      }, 1000)
    }
    function changeColumns() {
      getTable().setColumns(getBasicShortColumns())
    }
    function reloadTable() {
      getTable().setColumns(getBasicColumns())

      getTable().reload()
    }
    function getColumn() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getTable().getColumns())
    }

    function getTableData() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getTable().getDataSource())
    }
    function getTableRawData() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getTable().getRawDataSource())
    }

    function getPaginationInfo() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getTable().getPagination())
    }

    function setPaginationInfo() {
      getTable().setPagination({
        currentPage: 2,
      })
      getTable().reload()
    }

    return {
      tableRef,
      api: demoListApi,
      columns: getBasicColumns(),
      changeLoading,
      changeColumns,
      reloadTable,
      getColumn,
      getTableData,
      getTableRawData,
      getPaginationInfo,
      setPaginationInfo,
    }
  },
})
</script>
