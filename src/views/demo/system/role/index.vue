<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button
          type="primary"
          @click="handleCreate">新增角色</el-button>
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
    <RoleDrawer
      @register="registerDrawer"
      @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton, ElTableColumn } from 'element-plus'

import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getRoleListByPage } from '@/api/demo/system'

import { useDrawer } from '@/components/Drawer'
import RoleDrawer from './RoleDrawer.vue'
import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'RoleManagement',
  components: { ElButton, ElTableColumn, BasicTable, RoleDrawer, TableAction },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer()
    const [registerTable, { reload }] = useTable({
      title: '角色列表',
      api: getRoleListByPage,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
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

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    }
  },
})
</script>
