<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import type { BasicColumn } from '@/components/Table'

import { defineComponent } from 'vue'
import { BasicTable, useTable } from '@/components/Table'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: '编号',
        prop: 'no',
        width: 100,
      },
      {
        label: '姓名',
        prop: 'name',
        auth: 'test', // 根据权限控制是否显示: 无权限，不显示
      },
      {
        label: '地址',
        prop: 'address',
        auth: 'admin',
        ifShow: true, // 同时根据权限和业务控制是否显示
      },
      {
        actions: [
          {
            text: '启用',
            callback: handleOpen,
          },
          {
            text: '编辑',
            callback: handleEdit,
            auth: 'test', // 根据权限控制是否显示: 无权限，不显示
          },
          {
            text: '删除',
            callback: handleDelete,
            auth: 'super', // 根据权限控制是否显示: 有权限，会显示
          },
        ],
      },
    ]

    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns: columns,
      border: true,
    })

    function handleEdit(record: Recordable) {
      console.log('点击了编辑', record)
    }

    function handleDelete(record: Recordable) {
      console.log('点击了删除', record)
    }
    function handleOpen(record: Recordable) {
      console.log('点击了启用', record)
    }

    return {
      registerTable,
      handleEdit,
      handleDelete,
      handleOpen,
    }
  },
})
</script>
