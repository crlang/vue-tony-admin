<template>
  <PageWrapper
    title="可展开表格"
    description="不可与scroll共用。TableAction组件可配置stopButtonPropagation来阻止操作按钮的点击事件冒泡，以便配合Table组件的expandRowByClick">

    <BasicTable @register="registerTable">
      <template #address="{label,prop}">
        <el-table-column
          type="expand"
          :label="label"
          :prop="prop">
          <template #default="scope">
            <span>Address: {{ scope.row.address }}</span>
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import { BasicTable, useTable } from '@/components/Table'
import { PageWrapper } from '@/components/Page'
import { getBasicColumns } from './tableData'

import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElTableColumn, BasicTable, PageWrapper },
  setup() {
    const [registerTable] = useTable({
      api: demoListApi,
      title: '可展开表格演示',
      titleHelpMessage: ['已启用expandRowByClick', '已启用stopButtonPropagation'],
      columns: [
        ...getBasicColumns(),
        {
          actions: [
            {
              text: '启用',
              callback: handleOpen,
            },
            {
              text: '删除',
              callback: handleDelete,
            },
          ],
        },
      ],
      rowKey: 'id',
      expandRowByClick: true,
    })
    function handleDelete(record) {
      console.table('点击了删除', record)
    }
    function handleOpen(record) {
      console.table('点击了启用', record)
    }

    return {
      registerTable,
      handleDelete,
      handleOpen,
    }
  },
})
</script>
