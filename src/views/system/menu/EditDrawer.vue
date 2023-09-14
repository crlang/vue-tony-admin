<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    size="500px"
    @confirm="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';

import { BasicForm, useForm } from '@/components/BasicForm';
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer';

import { formSchema } from './data';
import { ApiMenuEdit, ApiMenuAdd, ApiMenuTreeList } from '@/api/menu';

export default defineComponent({
  name: 'MenuDrawer',
  components: { BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const editId = ref('');
    const isFirstLoaded = ref(false);

    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, getFieldsValue }] = useForm({
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

    const [registerDrawer, { closeDrawer, changeConfirmLoading }] = useDrawerInner(async(data) => {
      resetFields();
      changeConfirmLoading(false);
      isUpdate.value = !!data?.isUpdate;
      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
        editId.value = data.record.id;
      } else {
        if (data?.parentId) {
          setFieldsValue({
            parentId: data.parentId,
          });
        }
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
            api: ApiMenuTreeList,
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

    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

    async function handleSubmit() {
      try {
        await validate();

        const params = getFieldsValue() as any;
        let apiFn: any = ApiMenuAdd;

        if (isUpdate.value) {
          params.id = editId.value;
          apiFn = ApiMenuEdit;
        }

        await apiFn(params);
        changeConfirmLoading(true);
        closeDrawer();
        emit('success');
      } finally {
        changeConfirmLoading(false);
      }
    }

    return { registerDrawer, registerForm, getTitle, handleSubmit };
  },
});
</script>
