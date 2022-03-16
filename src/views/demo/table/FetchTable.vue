<template>
  <PageWrapper contentBackground>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button
          type="primary"
          @click="handleReloadCurrent">刷新当前页</el-button>
        <el-button
          type="primary"
          @click="handleReload">跳转第2页</el-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable } from '@/components/Table'
import { getBasicColumns } from './tableData'
import { PageWrapper } from '@/components/Page'

import { demoListApi } from '@/api/demo/table'
export default defineComponent({
  components: { ElButton, BasicTable, PageWrapper },
  setup() {
    const [registerTable, { reload, setPagination }] = useTable({
      title: '远程加载示例',
      api: demoListApi,
      canResize: true,
      showIndexColumn: true,
      columns: getBasicColumns(),
    })
    function handleReloadCurrent() {
      reload()
    }

    function handleReload() {
      setPagination({
        currentPage: 2,
      })
    }

    return {
      registerTable,
      handleReloadCurrent,
      handleReload,
    }
  },
})
</script>
