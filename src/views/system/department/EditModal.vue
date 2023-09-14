<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '@/components/BasicModal';
import { BasicForm, useForm } from '@/components/BasicForm';
import { formSchema } from './data';
import { ApiDepartmentTreeList } from '@/api/department';
import { ApiDepartmentAdd } from '@/api/department';
import { ApiDepartmentEdit } from '@/api/department';

export default defineComponent({
  name: 'DepartmentModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const isFirstLoaded = ref(false);
    const editId = ref('');

    const [registerForm, { resetFields, getFieldsValue, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: formSchema,
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

      // 非第一次打开
      if (isFirstLoaded.value) {
        // 每次获取最新的菜单数据
        updateSchema({
          field: 'parentId',
          label: '上级菜单',
          component: 'CustomTreeSelect',
          required: true,
          componentProps: {
            remote: true,
            api: ApiDepartmentTreeList,
            nodeKey: 'id',
            props: {
              label: 'title',
              value: 'id',
            },
            params: {
              t: +new Date(),
            },
            checkStrictly: true,
            defaultExpandAll: true,
          },
        });
      }
      isFirstLoaded.value = true;
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

    async function handleSubmit() {
      try {
        await validate();

        const params = getFieldsValue() as any;
        let apiFn: any = ApiDepartmentAdd;

        if (isUpdate.value) {
          params.id = editId.value;
          apiFn = ApiDepartmentEdit;
        }

        await apiFn(params);
        setModalProps({ confirmOptions: { loading: true } });
        closeModal();
        emit('success');
      } finally {
        setModalProps({ confirmOptions: { loading: false } });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  },
});
</script>
