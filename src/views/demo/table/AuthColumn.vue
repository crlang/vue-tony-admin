<template>
  <PageWrapper>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable, BasicColumn } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'
import { getAuthColumns } from './data'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const { createMessage } = useMessage()
    const columns:BasicColumn[] = [
      ...getAuthColumns(),
      {
        align: 'right',
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
            popConfirm: {
              title: '是否删除？',
              type: 'error',
            },
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
    function handleEdit() {
      // do something
    }
    function handleDelete(info, type) {
      console.info(info, type)
      createMessage.info('点击了', type)
    }
    function handleOpen() {
      // do something
    }
    return { registerTable }
  },
})
</script>
