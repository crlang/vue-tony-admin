<template>
  <BasicModal
    v-bind="$attrs"
    :title="getTitle"
    @register="registerModal"
    @confirm="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #role="{ model, field }">
        <ApiSelect
          v-model:modelValue="model[field]"
          :api="getAllRoleList"
          filterable
          placeholder="请选择"
          style="width: 100%"
          label-field="roleName"
          value-field="roleValue"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { accountFormSchema } from './data'
import { BasicModal, useModalInner } from '@/components/BasicModal'
import { BasicForm, useForm } from '@/components/BasicForm'
import { ApiSelect } from '@/components/ApiSelect'

import { getAllRoleList } from '@/api/demo/system'

export default defineComponent({
  name: 'AccountModal',
  components: { BasicModal, BasicForm, ApiSelect },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true)
    const rowId = ref('')

    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate, getFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: accountFormSchema,
      showActionButtonGroup: false,
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 24,
      },
    })

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields()
      setModalProps({ confirmOptions: { loading: false } })
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        rowId.value = data.record.id
        setFieldsValue({
          ...data.record,
        })
      }

      updateSchema({
        field: 'pwd',
        show: !unref(isUpdate),
        ifShow: !unref(isUpdate),
      })
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'))

    async function handleSubmit() {
      try {
        await validate()
        const values = getFieldsValue()
        setModalProps({ confirmOptions: { loading: true } })
        closeModal()
        emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } })
      }
      finally {
        setModalProps({ confirmOptions: { loading: false } })
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit, getAllRoleList }
  },
})
</script>
