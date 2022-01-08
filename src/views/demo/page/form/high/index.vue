<template>
  <PageWrapper
    class="high-form"
    title="高级表单"
    content=" 高级表单常见于一次性输入和提交大批量数据的场景。">

    <el-card header="仓库管理">
      <BasicForm @register="register" />
    </el-card>

    <el-card
      header="任务管理"
      class="my-5">
      <BasicForm @register="registerTask" />
    </el-card>

    <el-card header="成员管理">
      <PersonTable ref="tableRef" />
    </el-card>

    <template #rightFooter>
      <el-button
        type="primary"
        @click="submitAll">提交</el-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { BasicForm, useForm } from '@/components/Form'
import { defineComponent, ref } from 'vue'
import PersonTable from './PersonTable.vue'
import { PageWrapper } from '@/components/Page'
import { schemas, taskSchemas } from './data'

export default defineComponent({
  name: 'FormHightPage',
  components: { BasicForm, PersonTable, PageWrapper },
  setup() {
    const tableRef = ref()

    const [register, { validate, getFieldsValue }] = useForm({
      labelWidth: 120,
      baseColProps: {
        span: 6,
      },
      schemas: schemas,
      showActionButtonGroup: false,
    })

    const [registerTask, { validate: validateTaskForm, getFieldsValue: getFieldsValue2 }] = useForm({
      labelWidth: 120,
      baseColProps: {
        span: 6,
      },
      schemas: taskSchemas,
      showActionButtonGroup: false,
    })

    async function submitAll() {
      try {
        if (tableRef.value) {
          console.log('table data:', tableRef.value.getDataSource())
        }

        await Promise.all([validate(), validateTaskForm()])
        console.log('form data:', getFieldsValue(), getFieldsValue2())
      } catch (error) {
        // continue regardless of error
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
