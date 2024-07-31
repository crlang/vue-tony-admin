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
      <ElButton @click="toggleSelectedRows">切换选中行</ElButton>
      <ElButton @click="getPaginationInfo">获取分页信息</ElButton>
    </div>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { getBasicColumns, getBasicShortColumns } from './data'
import { BasicTable, useTable } from '@/components/BasicTable'
import { useMessage } from '@/hooks/web/useMessage'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const { createMessage } = useMessage()
    const columns = getBasicColumns()
    const [registerTable, { setLoading, setColumns, getColumns, getDataSource, getRawDataSource, reload, getPagination, setPagination, toggleAllSelection }] = useTable({
      title: 'useTable示例',
      titleHelpMessage: '使用useTable调用表格内方法',
      api: demoListApi,
      columns,
      rowKey: 'id',
      showTableSetting: true,
      onSelectionChange: (selection) => {
      // eslint-disable-next-line no-console
        console.info(selection)
      },
      showCheckboxColumn: true,
    })
    function changeLoading() {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    function changeColumns() {
      // setColumns(['id', 'name', 'address'])
      setColumns(getBasicShortColumns())
    }
    function reloadTable() {
      setColumns(getBasicColumns())

      reload()
    }
    function getColumn() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getColumns())
    }

    function getTableData() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getDataSource())
    }

    function getTableRawData() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getRawDataSource())
    }

    function getPaginationInfo() {
      createMessage.info('请在控制台查看！')
      // eslint-disable-next-line no-console
      console.info(getPagination())
    }

    function setPaginationInfo() {
      setPagination({
        currentPage: 2,
      })
      reload()
    }

    function toggleSelectedRows() {
      toggleAllSelection()
    }

    return {
      registerTable,
      changeLoading,
      changeColumns,
      reloadTable,
      getColumn,
      getTableData,
      getTableRawData,
      getPaginationInfo,
      setPaginationInfo,
      toggleSelectedRows,
    }
  },
})
</script>
