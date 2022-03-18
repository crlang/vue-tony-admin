<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/Table'

import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const { createConfirm, createMessage } = useMessage()
    const columns:BasicColumn[] = [
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
        label: '状态',
        prop: 'status',
      },
      {
        label: '地址',
        prop: 'address',
        auth: 'admin', // 同时根据权限和业务控制是否显示
        ifShow: true,
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
            auth: 'admin', // 根据权限控制是否显示: 无权限，不显示
          },
          {
            text: '编辑',
            callback: handleEdit,
            auth: 'other', // 根据权限控制是否显示: 无权限，不显示
          },
          {
            text: '删除',
            callback: handleDelete,
            auth: 'admin', // 根据权限控制是否显示: 有权限，会显示
          },
        ],
      },
    ]
    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns,
      border: true,
    })
    function handleEdit(record: Recordable) {
      console.log('点击了编辑', record)
    }
    function handleDelete(record: Recordable) {
      console.log('点击了删除', record)
      createConfirm({
        title: '温馨提示',
        content: '是否删除当前文件？',
        type: 'warning',
      })
        .then(() => {
          createMessage.success('删除完成')
        })
        .catch(() => {
          createMessage.info('取消删除')
        })
    }
    function handleOpen(record: Recordable) {
      console.log('点击了启用', record)
    }
    return { registerTable }
  },
})
</script>
