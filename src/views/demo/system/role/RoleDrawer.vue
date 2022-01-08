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
          v-model="model[field]"
          :treeData="treeData"
          :prop="{ label: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { BasicForm, useForm } from '@/components/Form/index'
import { formSchema } from './data'
import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
import { TreeType } from '@/components/Tree'

import { getMenuList } from '@/api/demo/system'

export default defineComponent({
  name: 'RoleDrawer',
  components: { BasicDrawer, BasicForm },
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
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
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
        const values = await validate()
        setDrawerProps({ confirmLoading: true })
        // TODO custom api
        console.log(values)
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
