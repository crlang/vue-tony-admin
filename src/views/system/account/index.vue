<template>
  <PageWrapper contentFullHeight fixedHeight>
    <el-row class="dept-wrap" :gutter="16">
      <el-col :span="6" :xs="24" class="dept-tree">
        <PartDepartment @select="handleSelect" />
      </el-col>

      <el-col :span="18" :xs="24" class="dept-table">
        <BasicTable @register="registerTable" :searchInfo="searchInfo">
          <template #toolbar>
            <el-button type="primary" @click="handleCreate">新增账号</el-button>
          </template>
        </BasicTable>
      </el-col>
    </el-row>

    <EditModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ElRow, ElCol, ElButton } from 'element-plus';

import { BasicTable, useTable } from '@/components/BasicTable';
import { ApiUserPage } from '@/api/user';
import { useGo } from '@/hooks/web/usePage';

import { useModal } from '@/components/BasicModal';
import EditModal from './EditModal.vue';

import { ResponseDepartmentInfo } from '@/api/types';
import { ApiUserDel } from '@/api/user';
import { searchFormSchema, columns } from './data';
import PartDepartment from './PartDepartment.vue';

export default defineComponent({
  name: 'AccountManagement',
  components: {
    ElRow,
    ElCol,
    ElButton,
    BasicTable,
    PartDepartment,
    EditModal,
  },
  setup() {
    const go = useGo();

    const [registerModal, { openModal }] = useModal();

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      api: ApiUserPage,
      rowKey: 'id',
      columns: [
        ...columns,
        {
          width: 180,
          actions: [
            {
              iconName: 'info-cirlce-o',
              btnText: '查看',
              callback: handleView,
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
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      border: true,
    });

    function handleEdit({ row }) {
      openModal(true, {
        record: row,
        isUpdate: true,
      });
    }

    function handleDelete({ row }, type) {
      if (type === 'confirm') {
        ApiUserDel(row.id)
          .then(() => {
            reload();
          })
          .catch(() => {});
      }
    }

    function handleSuccess() {
      reload();
    }

    function handleSelect(deptItem: ResponseDepartmentInfo) {
      searchInfo.group = deptItem?.id;
      reload();
    }

    function handleView({ row }) {
      go(`/system/account/info?id=${row.id}`);
    }

    return {
      searchInfo,
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      handleView,
    };
  },
});
</script>
