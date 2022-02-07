<template>
  <BasicModal
    :visible="visibleRef"
    :title="getTitle"
    width="600px"
    @close="visibleRef=false">
    <BasicForm @register="registerForm" />
    <template #footer>
      <el-button
        type="default"
        @click="visibleRef=false">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit">确定</el-button>
    </template>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref, watch, watchEffect, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { BasicModal, useModalInner } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form'
import { accountFormSchema } from './data'
import { getDeptList } from '@/api/demo/system'

export default defineComponent({
  name: 'AccountModal',
  components: { ElButton, BasicModal, BasicForm },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['success', 'update:visible'],
  setup(props, { emit }) {
    const isUpdate = ref(true)
    const rowId = ref('')
    const visibleRef = ref(false)
    const params = reactive({
      account: '',
      nickname: '',
      email: '',
      createTime: '',
      role: '',
      remark: '',
    })

    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      labelWidth: 100,
      schemas: accountFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
    })

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields()
      setModalProps({ confirmLoading: false })
      isUpdate.value = !!data?.isUpdate

      if (unref(isUpdate)) {
        rowId.value = data.record.id
        setFieldsValue({
          ...data.record,
        })
      }

      const treeData = await getDeptList()
      updateSchema([
        {
          field: 'pwd',
          show: !unref(isUpdate),
        },
        {
          field: 'dept',
          componentProps: { treeData },
        },
      ])
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'))

    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    watch(
      () => visibleRef.value,
      (v) => {
        emit('update:visible', v)
      },
      {
        immediate: false,
      }
    )

    async function handleSubmit() {
      try {
        const values = await validate()
        setModalProps({ confirmLoading: true })
        // TODO custom api
        console.log(values)
        closeModal()
        emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } })
      } finally {
        setModalProps({ confirmLoading: false })
      }
    }

    return {
      visibleRef,
      params,
      registerModal,
      registerForm,
      getTitle,
      handleSubmit,
    }
  },
})
</script>
