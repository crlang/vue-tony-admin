<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form'
import { accountFormSchema } from './data'

export default defineComponent({
  name: 'AccountModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true)
    const rowId = ref('')

    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate, getFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: accountFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
    })

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields()
      setModalProps({ confirmButton: { loading: false } })
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        rowId.value = data.record.id
        setFieldsValue({
          ...data.record,
        })
      }

      updateSchema([
        {
          field: 'pwd',
          show: !unref(isUpdate),
          ifShow: !unref(isUpdate),
        },
      ])
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'))

    async function handleSubmit() {
      try {
        await validate()
        const values = getFieldsValue()
        setModalProps({ confirmButton: { loading: true } })
        closeModal()
        emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } })
      } finally {
        setModalProps({ confirmButton: { loading: false } })
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit }
  },
})
</script>
