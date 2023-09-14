<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button type="primary" @click="handleCreate">新增部门</el-button>
      </template>
    </BasicTable>
    <EditModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

import { BasicTable, useTable } from '@/components/BasicTable';

import { useModal } from '@/components/BasicModal';
import EditModal from './EditModal.vue';

import { ApiDepartmentDel, ApiDepartmentPage } from '@/api/department';
import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'DeptManagement',
  components: { ElButton, BasicTable, EditModal },
  setup() {
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload }] = useTable({
      api: ApiDepartmentPage,
      columns: [
        ...columns,
        {
          actions: [
            {
              iconName: 'note-edit-line',
              btnText: '编辑',
              callback: handleEdit,
            },
            {
              iconName: 'delete',
              type: 'danger',
              btnText: '删除',
              popConfirm: {
                title: '是否删除？',
                type: 'error',
              },
              callback: handleDelete,
            },
          ],
        },
      ],
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      showTableSetting: true,
      border: true,
      showIndexColumn: false,
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit({ row }) {
      openModal(true, {
        record: row,
        isUpdate: true,
      });
    }

    function handleDelete({ row }, type) {
      if (type === 'confirm') {
        ApiDepartmentDel(row.id)
          .then(() => {
            reload();
          })
          .catch(() => {});
      }
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
