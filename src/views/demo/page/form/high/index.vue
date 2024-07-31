<template>
  <PageWrapper
    class="high-form"
    title="高级表单"
    content-full-height
    description=" 高级表单常见于一次性输入和提交大批量数据的场景。"
  >
    <ElCard header="仓库管理">
      <BasicForm @register="register" />
    </ElCard>

    <ElCard header="任务管理" class="my-5">
      <BasicForm @register="registerTask" />
    </ElCard>

    <ElCard header="成员管理">
      <PersonTable ref="tableRef" />
    </ElCard>

    <template #rightFooter>
      <div class="p-2 text-right">
        <ElButton type="primary" @click="submitAll">提交</ElButton>
      </div>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { ElButton, ElCard } from 'element-plus'
import { defineComponent, ref } from 'vue'
import PersonTable from './PersonTable.vue'
import { schemas, taskSchemas } from './data'
import { BasicForm, useForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'FormHightPage',
  components: { ElButton, ElCard, BasicForm, PersonTable },
  setup() {
    const tableRef = ref()

    const { createMessage } = useMessage()

    const [register, { validate }] = useForm({
      labelWidth: 120,
      colProps: {
        span: 6,
      },
      schemas,
      showActionButtonGroup: false,
    })

    const [registerTask, { validate: validateTaskForm }] = useForm({
      labelWidth: 120,
      colProps: {
        span: 6,
      },
      schemas: taskSchemas,
      showActionButtonGroup: false,
    })

    async function submitAll() {
      try {
        await Promise.all([validate(), validateTaskForm()])
      }
      catch {
        createMessage.error('请填写完整再提交')
      }
    }

    return { register, registerTask, submitAll, tableRef }
  },
})
</script>

<style lang="scss" scoped>
.high-form {
  padding-bottom: 48px;
}
</style>
