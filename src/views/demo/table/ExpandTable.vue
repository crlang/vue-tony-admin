<template>
  <PageWrapper
    title="可展开表格"
    content="不可与scroll共用。TableAction组件可配置stopButtonPropagation来阻止操作按钮的点击事件冒泡，以便配合Table组件的expandRowByClick">
    <BasicTable @register="registerTable">
      <template #address="coo">
        <el-table-column
          type="expand"
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <span>Address: {{ scope.row.address }}</span>
          </template>
        </el-table-column>
      </template>
      <template #action="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <TableAction
              stopButtonPropagation
              :actions="[
                {
                  label: '启用',
                  icon: 'ic:outline-delete-outline',
                  onClick: handleOpen.bind(null, scope.row)
                },
                {
                  label: '删除',
                  icon: 'ic:outline-delete-outline',
                  onClick: handleDelete.bind(null, scope.row)
                }

              ]"
            />
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import { BasicTable, useTable, TableAction } from '@/components/Table'
import { PageWrapper } from '@/components/Page'
import { getBasicColumns } from './tableData'

import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElTableColumn, BasicTable, TableAction, PageWrapper },
  setup() {
    const [registerTable] = useTable({
      api: demoListApi,
      title: '可展开表格演示',
      titleHelpMessage: ['已启用expandRowByClick', '已启用stopButtonPropagation'],
      columns: getBasicColumns(),
      rowKey: 'id',
      expandRowByClick: true,
      actionColumn: {
        width: 160,
        label: 'Action',
        prop: 'action',
        isSlot: true,
      },
    })
    function handleDelete(record: Recordable) {
      console.log('点击了删除', record)
    }
    function handleOpen(record: Recordable) {
      console.log('点击了启用', record)
    }

    return {
      registerTable,
      handleDelete,
      handleOpen,
    }
  },
})
</script>
