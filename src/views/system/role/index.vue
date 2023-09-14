<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button type="primary" @click="handleCreate">新增角色</el-button>
      </template>
    </BasicTable>
    <EditDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

import { BasicTable, useTable } from '@/components/BasicTable';
import { ApiRolePage, ApiRoleDel } from '@/api/role';

import { useDrawer } from '@/components/BasicDrawer';
import EditDrawer from './EditDrawer.vue';
import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'RoleManagement',
  components: { ElButton, BasicTable, EditDrawer },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      api: ApiRolePage,
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
      border: true,
    });

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }

    function handleEdit({ row }) {
      openDrawer(true, {
        record: row,
        isUpdate: true,
      });
    }

    function handleDelete({ row }, type) {
      if (type === 'confirm') {
        ApiRoleDel(row.id)
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
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
