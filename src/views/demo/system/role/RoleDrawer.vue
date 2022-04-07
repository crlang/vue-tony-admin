<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <el-tree
          :default-checked-keys="model[field]"
          :data="treeData"
          node-key="id"
          defaultExpandAll
          :props="{ label: 'menuName'}"
          show-checkbox
          title="菜单分配" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { ElTree } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form'
import { formSchema } from './data'
import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
import { TreeType } from '@/components/Tree'

import { getMenuList } from '@/api/demo/system'

export default defineComponent({
  name: 'RoleDrawer',
  components: { ElTree, BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true)
    const treeData = ref<TreeType[]>([])

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      schemas: formSchema,
      showActionButtonGroup: false,
    })

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields()
      setDrawerProps({ confirmLoading: false })
      if (unref(treeData).length === 0) {
        treeData.value = (await getMenuList()) as any as TreeType[]
      }
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        })
      }
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'))

    async function handleSubmit() {
      try {
        await validate()
        setDrawerProps({ confirmLoading: true })
        closeDrawer()
        emit('success')
      } finally {
        setDrawerProps({ confirmLoading: false })
      }
    }

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData,
    }
  },
})
</script>
