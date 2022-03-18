<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/Table'

import { demoListApi } from '@/api/demo/table'
export default defineComponent({
  components: { BasicTable },
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
    ]
    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns: columns,
      showCheckboxColumn: true,
      border: true,
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
