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
      <template #action="coo">
        <el-table-column
          :lebel="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  onClick: handleEdit.bind(null, scope.row),
                },
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否确认删除',
                    confirm: handleDelete.bind(null, scope.row),
                  },
                },
              ]"
            />
          </template>
        </el-table-column>
      </template>
    </BasicTable>
    <MenuDrawer
      @register="registerDrawer"
      @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'

import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getMenuList } from '@/api/demo/system'

import { useDrawer } from '@/components/Drawer'
import MenuDrawer from './MenuDrawer.vue'

import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'MenuManagement',
  components: { BasicTable, MenuDrawer, TableAction },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer()
    const [registerTable, { reload, expandAll }] = useTable({
      title: '菜单列表',
      api: getMenuList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      pagination: undefined,
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      border: true,
      showIndexColumn: false,
      actionColumn: {
        width: 80,
        label: '操作',
        prop: 'action',
        isSlot: true,
        fixed: undefined,
      },
    })

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      })
    }

    function handleEdit(record: Recordable) {
      openDrawer(true, {
        record,
        isUpdate: true,
      })
    }

    function handleDelete(record: Recordable) {
      console.log(record)
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
