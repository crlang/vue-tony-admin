<template>
  <div>
    <BasicTable
      @register="registerTable"
      @fetch-success="onFetchSuccess">
      <template #toolbar>
        <el-button
          type="primary"
          @click="handleCreate"> 新增菜单 </el-button>
      </template>
    </BasicTable>
    <MenuDrawer
      @register="registerDrawer"
      @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { ElButton } from 'element-plus'

import { BasicTable, useTable } from '@/components/Table'
import { getMenuList } from '@/api/demo/system'

import { useDrawer } from '@/components/BasicDrawer'
import MenuDrawer from './MenuDrawer.vue'

import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'MenuManagement',
  components: { ElButton, BasicTable, MenuDrawer },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer()
    const [registerTable, { reload, expandAll }] = useTable({
      title: '菜单列表',
      api: getMenuList,
      columns: [
        ...columns,
        {
          actions: [
            {
              icon: 'clarity:note-edit-line',
              callback: handleEdit,
            },
            {
              icon: 'ep:delete',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete,
              },
            },
          ],
        },
      ],
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      border: true,
    })

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      })
    }

    function handleEdit({ row }) {
      openDrawer(true, {
        record: row,
        isUpdate: true,
      })
    }

    function handleDelete({ row }) {
      console.table(row)
    }

    function handleSuccess() {
      reload()
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(expandAll)
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      onFetchSuccess,
    }
  },
})
</script>
