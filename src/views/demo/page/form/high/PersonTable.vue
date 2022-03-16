<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/Table'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: '成员姓名',
        prop: 'name',
      },
      {
        label: '工号',
        prop: 'no',
      },
      {
        label: '所属部门',
        prop: 'dept',
      },
      {
        actions: [
          {
            text: '编辑',
            callback: handleEdit,
          },
          {
            text: '删除',
          },
        ],
      },
    ]

    const data: any[] = [
      {
        name: 'John Brown',
        no: '00001',
        dept: 'New York No. 1 Lake Park',
      },
      {
        name: 'John Brown2',
        no: '00002',
        dept: 'New York No. 2 Lake Park',
      },
      {
        name: 'John Brown3',
        no: '00003',
        dept: 'New York No. 3Lake Park',
      },
    ]

    const [registerTable, { getDataSource }] = useTable({
      columns: columns,
      dataSource: data,
    })

    function handleEdit(record) {
      record.onEdit?.(true)
    }

    function createActions(record) {
      return [
        {
          text: '编辑',
          onClick: handleEdit.bind(null, record),
        },
        {
          text: '删除',
        },
      ]
    }

    return {
      registerTable,
      handleEdit,
      createActions,
      getDataSource,
    }
  },
})
</script>
