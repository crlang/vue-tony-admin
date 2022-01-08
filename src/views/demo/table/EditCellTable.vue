<template>
  <div class="p-4">
    <BasicTable
      @register="registerTable"
      @edit-cancel="handleEditCancel"
      :beforeEditSubmit="beforeEditSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable } from '@/components/Table'

import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'
import { getEditColumns as columns } from './tableData'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const [registerTable] = useTable({
      title: '可编辑单元格示例',
      api: demoListApi,
      columns,
      border: true,
    })

    const { createMessage } = useMessage()

    // 模拟将指定数据保存
    function feakSave({ value, key, id }) {
      const loading = createMessage.loading(`正在模拟保存${key}`, 0)
      return new Promise((resolve) => {
        setTimeout(() => {
          loading.close()
          if (value === '') {
            createMessage.error({
              message: '保存失败：不能为空',
              duration: 2000,
            })
            resolve(false)
          } else {
            createMessage.success({
              message: `记录 ${id} 的 ${key} 已保存为 ${value}`,
              duration: 2000,
            })
            resolve(true)
          }
        }, 2000)
      })
    }

    async function beforeEditSubmit({ record, index, key, value }) {
      console.log('submit', { record, index, key, value })
      return await feakSave({ id: record.id, key, value })
    }

    function handleEditCancel({ record, index, key, value }) {
      console.log('cancel', record, index, key, value)
    }

    return {
      registerTable,
      handleEditCancel,
      beforeEditSubmit,
    }
  },
})
</script>
