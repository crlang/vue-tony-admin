<template>
  <div class="p-4">
    <div class="mb-4">
      <el-button @click="reloadTable">还原</el-button>
      <el-button @click="changeLoading">开启loading</el-button>
      <el-button @click="changeColumns">更改Columns</el-button>
      <el-button @click="getColumn">获取Columns</el-button>
      <el-button @click="getTableData">获取表格数据</el-button>
      <el-button @click="getTableRawData">获取接口原始数据</el-button>
      <el-button @click="setPaginationInfo">跳转到第2页</el-button>
    </div>
    <div class="mb-4">
      <el-button @click="getSelectRowList">获取选中行</el-button>
      <el-button @click="getSelectRowKeyList">获取选中行Key</el-button>
      <el-button @click="setSelectedRowKeyList">设置选中行</el-button>
      <el-button @click="clearSelect">清空选中行</el-button>
      <el-button @click="getPagination">获取分页信息</el-button>
    </div>
    <BasicTable
      title="RefTable示例"
      titleHelpMessage="使用Ref调用表格内方法"
      ref="tableRef"
      :api="api"
      :columns="columns"
      showCheckboxColumn
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, TableActionType } from '@/components/Table'
import { getBasicColumns, getBasicShortColumns } from './tableData'
import { useMessage } from '@/hooks/web/useMessage'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const tableRef = ref<Nullable<TableActionType>>(null)
    const { createMessage } = useMessage()

    function getTableAction() {
      const tableAction = unref(tableRef)
      if (!tableAction) {
        throw new Error('tableAction is null')
      }
      return tableAction
    }
    function changeLoading() {
      getTableAction().setLoading(true)
      setTimeout(() => {
        getTableAction().setLoading(false)
      }, 1000)
    }
    function changeColumns() {
      getTableAction().setColumns(getBasicShortColumns())
    }
    function reloadTable() {
      getTableAction().setColumns(getBasicColumns())

      getTableAction().reload({
        page: 1,
      })
    }
    function getColumn() {
      createMessage.info('请在控制台查看！')
      console.log(getTableAction().getColumns())
    }

    function getTableData() {
      createMessage.info('请在控制台查看！')
      console.log(getTableAction().getDataSource())
    }
    function getTableRawData() {
      createMessage.info('请在控制台查看！')
      console.log(getTableAction().getRawDataSource())
    }

    function getPagination() {
      createMessage.info('请在控制台查看！')
      console.log(getTableAction().getPaginationRef())
    }

    function setPaginationInfo() {
      getTableAction().setPagination({
        page: 2,
      })
      getTableAction().reload()
    }
    function getSelectRowList() {
      createMessage.info('请在控制台查看！')
      console.log(getTableAction().getSelectRows())
    }
    function getSelectRowKeyList() {
      createMessage.info('请在控制台查看！')
      console.log(getTableAction().getSelectRowKeys())
    }
    function setSelectedRowKeyList() {
      getTableAction().setSelectedRowKeys(['0', '1', '2'])
    }
    function clearSelect() {
      getTableAction().clearSelectedRowKeys()
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
      getPagination,
      setPaginationInfo,
      getSelectRowList,
      getSelectRowKeyList,
      setSelectedRowKeyList,
      clearSelect,
    }
  },
})
</script>
