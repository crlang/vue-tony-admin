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
import { defineComponent, ref, computed, unref, watchEffect, watch, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { BasicModal } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form/index'
import { formSchema } from './data'

export default defineComponent({
  name: 'DeptModal',
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
    const visibleRef = ref(false)

    const [registerForm, { validate }] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
    })

    const params = reactive({
      deptName: '',
      parentDept: '',
      orderNo: '',
      status: '',
      remark: '',
    })

    const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'))

    async function handleSubmit() {
      try {
        const values = await validate()
        // setModalProps({ confirmLoading: true })
        // TODO custom api
        console.log(values)
        // closeModal()
        emit('success')
      } finally {
        // setModalProps({ confirmLoading: false })
      }
    }

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

    return {
      visibleRef,
      params,
      registerForm,
      getTitle,
      handleSubmit }
  },
})
</script>
