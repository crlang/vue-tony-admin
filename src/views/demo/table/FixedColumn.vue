<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #action="{label,prop}">
        <el-table-column
          :label="label"
          :prop="prop">
          <template #default="scope">
            <TableAction
              :actions="[
                {
                  text: '启用',
                  onClick: handleOpen.bind(null, scope.row)
                },
                {
                  text: '删除',
                  onClick: handleDelete.bind(null, scope.row)
                }
              ]"
            />
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import { BasicTable, useTable, BasicColumn, TableAction } from '@/components/Table'

import { demoListApi } from '@/api/demo/table'
export default defineComponent({
  components: { ElTableColumn, BasicTable, TableAction },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: 'ID',
        prop: 'id',
        fixed: 'left',
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '地址',
        prop: 'address',
      },
      {
        label: '编号',
        prop: 'no',
      },
      {
        label: '开始时间',
        prop: 'beginTime',
      },
      {
        label: '结束时间',
        prop: 'endTime',
      },
    ]
    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns: columns,
      showCheckboxColumn: true,
      border: true,
      actionColumn: {
        width: 160,
        label: 'Action',
        prop: 'action',
        isSlot: true,
      },
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
