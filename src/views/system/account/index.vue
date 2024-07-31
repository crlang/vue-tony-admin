<template>
  <PageWrapper content-full-height fixed-height>
    <ElRow class="dept-wrap" :gutter="16">
      <ElCol :span="6" :xs="24" class="dept-tree">
        <PartDepartment @select="handleSelect" />
      </ElCol>

      <ElCol :span="18" :xs="24" class="dept-table">
        <BasicTable :search-info="searchInfo" @register="registerTable">
          <template #toolbar>
            <ElButton type="primary" @click="handleCreate">新增账号</ElButton>
          </template>
        </BasicTable>
      </ElCol>
    </ElRow>

    <EditModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElButton, ElCol, ElRow } from 'element-plus'

import EditModal from './EditModal.vue'
import { columns, searchFormSchema } from './data'
import PartDepartment from './PartDepartment.vue'
import { BasicTable, useTable } from '@/components/BasicTable'
import { ApiUserDel, ApiUserPage } from '@/api/user'
import { useGo } from '@/hooks/web/usePage'

import { useModal } from '@/components/BasicModal'

import type { ResponseDepartmentInfo } from '@/api/types'

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
    const go = useGo()

    const [registerModal, { openModal }] = useModal()

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      })
    }

    const searchInfo = reactive<Recordable>({})
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
    })

    function handleEdit({ row }) {
      openModal(true, {
        record: row,
        isUpdate: true,
      })
    }

    function handleDelete({ row }, type) {
      if (type === 'confirm') {
        ApiUserDel(row.id)
          .then(() => {
            reload()
          })
          .catch(() => {})
      }
    }

    function handleSuccess() {
      reload()
    }

    function handleSelect(deptItem: ResponseDepartmentInfo) {
      searchInfo.group = deptItem?.id
      reload()
    }

    function handleView({ row }) {
      go(`/system/account/info?id=${row.id}`)
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
    }
  },
})
</script>
