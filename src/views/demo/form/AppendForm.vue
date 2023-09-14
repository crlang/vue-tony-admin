<template>
  <PageWrapper title="表单增删示例">
    <div class="mb-4">
      <el-button @click="changeLabel3">更改字段3label</el-button>
      <el-button @click="appendField">往字段3后面插入字段3x</el-button>
      <el-button @click="deleteField">删除字段1、2</el-button>
      <el-button @click="resetField">重置表单字段</el-button>
    </div>
    <BasicForm @register="register" @submit="handleSubmit">
      <template #add="{ schema }">
        <template v-if="fieldIndex === schema.defaultValue">
          <el-button type="primary" plain @click="handleAdd">+</el-button>
          <el-button
            v-if="fieldIndex > 3"
            type="danger"
            plain
            @click="handleDel()">-</el-button>
        </template>
      </template>
    </BasicForm>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElButton } from 'element-plus';

import { BasicForm, useForm } from '@/components/BasicForm';

import { basicSchemas } from './AppendForm-data';

export default defineComponent({
  components: { ElButton, BasicForm },
  setup() {
    const fieldIndex = ref(3);
    const [register, { appendSchemaByField, removeSchemaByField, validate, updateSchema, resetSchema }] = useForm({
      schemas: basicSchemas,
      labelWidth: 100,
      colProps: { span: 12 },
      actionColProps: { span: 24 },
    });

    async function handleSubmit() {
      try {
        await validate();
      } catch (e) {
        // --
      }
    }

    function handleAdd() {
      fieldIndex.value++;

      const fix = fieldIndex.value < 10 ? `0${fieldIndex.value}` : fieldIndex.value;
      appendSchemaByField({
        field: `field0${fix}`,
        component: 'ElInput',
        label: `字段${parseInt(fix)}`,
        required: true,
      });

      appendSchemaByField({
        field: `add0${fix}`,
        component: 'ElInput',
        label: '',
        defaultValue: fieldIndex.value,
        slot: 'add',
      });
    }

    function handleDel() {
      const fix = fieldIndex.value < 10 ? `0${fieldIndex.value}` : fieldIndex.value;
      removeSchemaByField(`field0${fix}`);
      removeSchemaByField(`add0${fix}`);
      fieldIndex.value--;
    }

    function changeLabel3() {
      updateSchema({
        field: 'field003',
        label: '字段3 New',
      });
    }

    function appendField() {
      appendSchemaByField(
        {
          field: 'field003x',
          label: '字段3x',
          component: 'ElInput',
        },
        'field003',
      );
    }
    function deleteField() {
      removeSchemaByField(['field001', 'field002']);
    }
    function resetField() {
      resetSchema(basicSchemas);
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
    };
  },
});
</script>
