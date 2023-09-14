<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';

import { BasicForm, useForm } from '@/components/BasicForm';
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer';

import { formSchema } from './data';
import { ApiRoleAdd, ApiRoleEdit } from '@/api/role';

export default defineComponent({
  name: 'RoleDrawer',
  components: { BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const editId = ref('');

    const [registerForm, { resetFields, getFieldsValue, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      schemas: formSchema,
      showActionButtonGroup: false,
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 24,
      },
    });

    const [registerDrawer, { closeDrawer, changeConfirmLoading }] = useDrawerInner(async(data) => {
      resetFields();
      changeConfirmLoading(false);
      isUpdate.value = !!data?.isUpdate;
      if (unref(isUpdate)) {
        editId.value = data.record.id;
        setFieldsValue({
          ...data.record,
        });
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

    async function handleSubmit() {
      try {
        await validate();

        const params = getFieldsValue() as any;
        let apiFn: any = ApiRoleAdd;

        if (isUpdate.value) {
          params.id = editId.value;
          apiFn = ApiRoleEdit;
        }

        await apiFn(params);

        changeConfirmLoading(true);
        closeDrawer();
        emit('success');
      } finally {
        changeConfirmLoading(false);
      }
    }

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
    };
  },
});
</script>
