<template>
  <PageWrapper title="UseForm操作示例">
    <div class="mb-4">
      <ElButton @click="setFormProps({ labelWidth: 150 })">更改labelWidth</ElButton>
      <ElButton @click="setFormProps({ labelWidth: 120 })">还原labelWidth</ElButton>
      <ElButton @click="setFormProps({ size: 'large' })">更改Size</ElButton>
      <ElButton @click="setFormProps({ size: 'default' })">还原Size</ElButton>
      <ElButton @click="setFormProps({ disabled: true })">禁用表单</ElButton>
      <ElButton @click="setFormProps({ disabled: false })">解除禁用</ElButton>
      <ElButton @click="setFormProps({ actionColProps: { span: 8 } })">操作按钮位置-跟随</ElButton>
      <ElButton @click="setFormProps({ actionColProps: { span: 24 } })">操作按钮位置-单行</ElButton>
    </div>
    <div class="mb-4">
      <ElButton @click="setFormProps({ showActionButtonGroup: false })">隐藏操作按钮</ElButton>
      <ElButton @click="setFormProps({ showActionButtonGroup: true })">显示操作按钮</ElButton>
      <ElButton @click="setFormProps({ showResetButton: false })">隐藏重置按钮</ElButton>
      <ElButton @click="setFormProps({ showResetButton: true })">显示重置按钮</ElButton>
      <ElButton @click="setFormProps({ showSubmitButton: false })">隐藏查询按钮</ElButton>
      <ElButton @click="setFormProps({ showSubmitButton: true })">显示查询按钮</ElButton>
      <ElButton @click="setFormProps({ resetButtonOptions: { disabled: true, btnText: '重置New' } })">修改重置按钮</ElButton>
      <ElButton @click="setFormProps({ submitButtonOptions: { disabled: true, loading: true } })">修改查询按钮</ElButton>
    </div>

    <BasicForm @register="register" @submit="handleSubmit" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { basicSchemas } from './RefForm-data'
import { BasicForm, useForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'
import { logLog } from '@/utils/log'

export default defineComponent({
  name: 'UseFormDemo',
  components: { ElButton, BasicForm },
  setup() {
    const { createMessage } = useMessage()

    const [register, { setFormProps }] = useForm({
      labelWidth: 120,
      schemas: basicSchemas,
      submitAfterReset: true,
      actionColProps: {
        span: 24,
      },
    })

    function handleSubmit(values) {
      logLog('提交内容', values)
      createMessage.success('提交成功')
    }

    return {
      register,
      setFormProps,
      handleSubmit,
    }
  },
})
</script>
