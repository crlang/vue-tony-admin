<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button
          type="primary"
          @click="handleCreate"> 新增部门 </el-button>
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
    <DeptModal
      v-model:visible="modalVisible"
      @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getDeptList } from '@/api/demo/system'

import { useModal } from '@/components/Modal'
import DeptModal from './DeptModal.vue'
import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'DeptManagement',
  components: { BasicTable, TableAction, DeptModal },
  setup() {
    const [registerModal, { openModal }] = useModal()
    const modalVisible = ref(false)
    const [registerTable, { reload }] = useTable({
      title: '部门列表',
      api: getDeptList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      // pagination: undefined,
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
      openModal(true, {
        isUpdate: false,
      })
    }

    function handleEdit(record: Recordable) {
      openModal(true, {
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
      modalVisible,
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    }
  },
})
</script>
