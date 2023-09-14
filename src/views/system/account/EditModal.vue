<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm">
      <template #role="{ model, field }">
        {{ model[field] }}
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '@/components/BasicModal';
import { BasicForm, useForm } from '@/components/BasicForm';

import { getAllRoleList } from '@/api/demo/system';
import { accountFormSchema } from './data';
import { ApiUserAdd, ApiUserEdit } from '@/api/user';

export default defineComponent({
  name: 'AccountModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const editId = ref('');

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
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async(data) => {
      resetFields();
      setModalProps({ confirmOptions: { loading: false } });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
        editId.value = data.record.id;
      }

      updateSchema({
        field: 'pwd',
        show: !unref(isUpdate),
        ifShow: !unref(isUpdate),
      });
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

    async function handleSubmit() {
      try {
        await validate();
        const params = getFieldsValue() as any;
        let apiFn: any = ApiUserAdd;

        if (isUpdate.value) {
          params.id = editId.value;
          apiFn = ApiUserEdit;
        }

        await apiFn(params);
        setModalProps({ confirmOptions: { loading: true } });
        closeModal();
        emit('success', { isUpdate: unref(isUpdate), values: { ...params, id: editId.value } });
      } finally {
        setModalProps({ confirmOptions: { loading: false } });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit, getAllRoleList };
  },
});
</script>
