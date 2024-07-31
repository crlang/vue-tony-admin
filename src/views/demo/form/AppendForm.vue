<template>
  <PageWrapper title="表单增删示例">
    <div class="mb-4">
      <ElButton @click="changeLabel3">更改字段3label</ElButton>
      <ElButton @click="appendField">往字段3后面插入字段3x</ElButton>
      <ElButton @click="deleteField">删除字段1、2</ElButton>
      <ElButton @click="resetField">重置表单字段</ElButton>
    </div>
    <BasicForm @register="register" @submit="handleSubmit">
      <template #add="{ schema }">
        <template v-if="fieldIndex === schema.defaultValue">
          <ElButton type="primary" plain @click="handleAdd">+</ElButton>
          <ElButton
            v-if="fieldIndex > 3"
            type="danger"
            plain
            @click="handleDel()"
          >
            -
          </ElButton>
        </template>
      </template>
    </BasicForm>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { basicSchemas } from './AppendForm-data'
import { BasicForm, useForm } from '@/components/BasicForm'

export default defineComponent({
  components: { ElButton, BasicForm },
  setup() {
    const fieldIndex = ref(3)
    const [register, { appendSchemaByField, removeSchemaByField, validate, updateSchema, resetSchema }] = useForm({
      schemas: basicSchemas,
      labelWidth: 100,
      colProps: { span: 12 },
      actionColProps: { span: 24 },
    })

    async function handleSubmit() {
      try {
        await validate()
      }
      catch {
      }
    }

    function handleAdd() {
      fieldIndex.value++

      const fix = fieldIndex.value < 10 ? `0${fieldIndex.value}` : fieldIndex.value
      appendSchemaByField({
        field: `field0${fix}`,
        component: 'ElInput',
        label: `字段${Number.parseInt(fix)}`,
        required: true,
      })

      appendSchemaByField({
        field: `add0${fix}`,
        component: 'ElInput',
        label: '',
        defaultValue: fieldIndex.value,
        slot: 'add',
      })
    }

    function handleDel() {
      const fix = fieldIndex.value < 10 ? `0${fieldIndex.value}` : fieldIndex.value
      removeSchemaByField(`field0${fix}`)
      removeSchemaByField(`add0${fix}`)
      fieldIndex.value--
    }

    function changeLabel3() {
      updateSchema({
        field: 'field003',
        label: '字段3 New',
      })
    }

    function appendField() {
      appendSchemaByField(
        {
          field: 'field003x',
          label: '字段3x',
          component: 'ElInput',
        },
        'field003',
      )
    }
    function deleteField() {
      removeSchemaByField(['field001', 'field002'])
    }
    function resetField() {
      resetSchema(basicSchemas)
    }

    return {
      register,
      handleSubmit,
      fieldIndex,
      handleAdd,
      handleDel,
      changeLabel3,
      appendField,
      deleteField,
      resetField,
    }
  },
})
</script>
