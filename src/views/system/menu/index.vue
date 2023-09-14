<template>
  <PageWrapper>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <el-button type="primary" @click="handleCreate">新增菜单</el-button>
      </template>
    </BasicTable>
    <EditDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { ElButton } from 'element-plus';

import { BasicTable, useTable } from '@/components/BasicTable';

import { useDrawer } from '@/components/BasicDrawer';
import EditDrawer from './EditDrawer.vue';

import { ApiMenuDel, ApiMenuPage } from '@/api/menu';
import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'MenuManagement',
  components: { ElButton, BasicTable, EditDrawer },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload, expandAll }] = useTable({
      api: ApiMenuPage,
      columns: [
        ...columns,
        {
          width: 200,
          actions: [
            {
              iconName: 'note-edit-line',
              btnText: '新增下级',
              callback: handleNew,
            },
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

    function handleNew({ row }) {
      openDrawer(true, {
        parentId: Number(row.id),
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
        ApiMenuDel(row.id)
          .then(() => {
            reload();
          })
          .catch(() => {});
      }
    }

    function handleSuccess() {
      reload();
    }

    function onFetchSuccess() {
      nextTick(expandAll);
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      onFetchSuccess,
    };
  },
});
</script>
