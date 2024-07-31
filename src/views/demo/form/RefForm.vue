<template>
  <PageWrapper title="Ref操作示例">
    <div class="mb-4">
      <ElButton @click="setFormProps({ labelWidth: 150 })">更改labelWidth</ElButton>
      <ElButton @click="setFormProps({ labelWidth: 120 })">还原labelWidth</ElButton>
      <ElButton @click="setFormProps({ size: 'large' })">更改Size</ElButton>
      <ElButton @click="setFormProps({ size: 'default' })">还原Size</ElButton>
      <ElButton @click="setFormProps({ disabled: true })">禁用表单</ElButton>
      <ElButton @click="setFormProps({ disabled: false })">解除禁用</ElButton>
      <ElButton @click="setFormProps({ actionColProps: { span: 8 } })">操作按钮位置</ElButton>
      <ElButton @click="setFormProps({ actionColProps: { span: 24 } })">操作按钮位置</ElButton>
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

    <BasicForm
      ref="formElRef"
      :schemas="basicSchemas"
      :label-width="100"
      :action-col-props="{ span: 24 }"
      @submit="handleSubmit"
    />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { basicSchemas } from './RefForm-data'
import type { BasicFormProps, FormActionMethods } from '@/components/BasicForm'
import { BasicForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'
import { logLog } from '@/utils/log'

export default defineComponent({
  components: { ElButton, BasicForm },
  setup() {
    const formElRef = ref<Nullable<FormActionMethods>>(null)
    const { createMessage } = useMessage()

    function handleSubmit(values) {
      logLog('提交内容', values)
      createMessage.success('提交成功')
    }

    function setFormProps(props: Partial<BasicFormProps>) {
      const formEl = formElRef.value
      if (!formEl)
        return
      formEl.setFormProps(props)
    }

    return {
      formElRef,
      basicSchemas,
      handleSubmit,
      setFormProps,
    }
  },
})
</script>
