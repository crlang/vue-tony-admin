<template>
  <PageWrapper contentBackground>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button
          type="primary"
          @click="handleReloadCurrent">刷新当前页</el-button>
        <el-button
          type="primary"
          @click="handleReload">刷新第2页</el-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable } from '@/components/Table'
import { getBasicColumns } from './tableData'
import { PageWrapper } from '@/components/Page'

import { demoListApi } from '@/api/demo/table'
export default defineComponent({
  components: { BasicTable, PageWrapper },
  setup() {
    const [registerTable, { reload }] = useTable({
      title: '远程加载示例',
      api: demoListApi,
      columns: getBasicColumns(),
    })
    function handleReloadCurrent() {
      reload()
    }

    function handleReload() {
      reload({
        page: 2,
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
