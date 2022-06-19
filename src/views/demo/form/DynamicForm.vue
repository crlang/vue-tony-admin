<template>
  <PageWrapper title="动态表单示例">
    <div class="mb-4">
      <el-button @click="changeLabel3">更改字段3label</el-button>
      <el-button @click="changeLabel34">同时更改字段3,4label</el-button>
      <el-button @click="appendField">往字段3后面插入字段10</el-button>
      <el-button @click="deleteField">删除字段11</el-button>
    </div>
    <CollapseContainer title="动态表单示例,动态根据表单内其他值改变">
      <BasicForm
        @register="register"
        @submit="handleSubmit" />
    </CollapseContainer>

    <CollapseContainer
      class="mt-5"
      title="componentProps动态改变">
      <BasicForm
        @register="register1"
        @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicForm, useForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'

import { dyncSchemas as schemas, dyncSchemas1 as schemas1 } from './data'

export default defineComponent({
  components: { ElButton, CollapseContainer, BasicForm },
  setup() {
    const [register, { setFormProps, updateSchema, appendSchemaByField, removeSchemaByField }] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
    })
    const [register1] = useForm({
      labelWidth: 120,
      schemas: schemas1,
      actionColOptions: {
        span: 24,
      },
    })
    function changeLabel3() {
      updateSchema({
        field: 'field3',
        label: '字段3 New',
      })
    }
    function changeLabel34() {
      updateSchema([
        {
          field: 'field3',
          label: '字段3 New++',
        },
        {
          field: 'field4',
          label: '字段4 New++',
        },
      ])
    }

    function appendField() {
      appendSchemaByField(
        {
          field: 'field10',
          label: '字段10',
          component: 'ElInput',
          colProps: {
            span: 8,
          },
        },
        'field3'
      )
    }
    function deleteField() {
      removeSchemaByField('field11')
    }
    function handleSubmit() {
      // do something
    }

    return {
      register,
      register1,
      schemas,
      setFormProps,
      changeLabel3,
      changeLabel34,
      appendField,
      deleteField,
      handleSubmit,
    }
  },
})
</script>
