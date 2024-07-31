<template>
  <PageWrapper content-full-height fixed-height>
    <ElRow class="dept-wrap" :gutter="16">
      <ElCol :span="6" class="dept-tree">
        <DeptTree @select="handleSelect" />
      </ElCol>

      <ElCol :span="18" class="dept-table">
        <BasicTable :search-info="searchInfo" @register="registerTable">
          <template #toolbar>
            <ElButton type="primary" size="small" @click="handleCreate">新增账号</ElButton>
          </template>
        </BasicTable>
      </ElCol>
    </ElRow>

    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElButton, ElCol, ElRow } from 'element-plus'

import { columns, searchFormSchema } from './data'
import AccountModal from './AccountModal.vue'
import DeptTree from './DeptTree.vue'
import { BasicTable, useTable } from '@/components/BasicTable'
import { getAccountList } from '@/api/demo/system'
import { useGo } from '@/hooks/web/usePage'
import type { DeptListItem } from '@/api/demo/model/systemModel'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/BasicModal'

export default defineComponent({
  name: 'AccountManagement',
  components: {
    ElRow,
    ElCol,
    ElButton,
    BasicTable,
    DeptTree,
    AccountModal,
  },
  setup() {
    const go = useGo()
    const { createMessage } = useMessage()

    const [registerModal, { openModal }] = useModal()

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      })
    }

    const searchInfo = reactive<Recordable>({})
    const [registerTable, { reload, updateTableDataRecord }] = useTable({
      title: '账号列表',
      api: getAccountList,
      rowKey: 'id',
      columns: [
        ...columns,
        {
          width: 180,
          fixed: 'right',
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
        // actionColProps: {
        //   span: 24,
        // },
      },
      useSearchForm: true,
      border: true,
      pagination: { pageSize: 5 },
      searchFn(info) {
        return info
      },
    })

    function handleEdit({ row }) {
      openModal(true, {
        record: row,
        isUpdate: true,
      })
    }

    function handleDelete(_, action) {
      if (action === 'confirm') {
        createMessage.success('删除成功')
      }
    }

    function handleSuccess({ isUpdate, values }) {
      if (isUpdate) {
        // 演示不刷新表格直接更新内部数据。
        // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        updateTableDataRecord(values.id, values)
      }
      else {
        reload()
      }
    }

    function handleSelect(deptItem: DeptListItem) {
      searchInfo.deptId = deptItem?.id
      reload()
    }

    function handleView({ row }) {
      go(`/system/account_detail/${row.id}`)
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
