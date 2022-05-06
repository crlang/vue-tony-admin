<template>
  <PageWrapper title="UseForm操作示例">
    <div class="mb-4">
      <el-button @click="setProps({ labelWidth: 150 })"> 更改labelWidth </el-button>
      <el-button @click="setProps({ labelWidth: 120 })"> 还原labelWidth </el-button>
      <el-button @click="setProps({ size: 'large' })"> 更改Size </el-button>
      <el-button @click="setProps({ size: 'default' })"> 还原Size </el-button>
      <el-button @click="setProps({ disabled: true })"> 禁用表单 </el-button>
      <el-button @click="setProps({ disabled: false })"> 解除禁用 </el-button>
      <el-button @click="setProps({ actionColOptions: { span: 8 } })"> 操作按钮位置 </el-button>
    </div>
    <div class="mb-4">
      <el-button @click="setProps({ showActionButtonGroup: false })"> 隐藏操作按钮 </el-button>
      <el-button @click="setProps({ showActionButtonGroup: true })"> 显示操作按钮 </el-button>
      <el-button @click="setProps({ showResetButton: false })"> 隐藏重置按钮 </el-button>
      <el-button @click="setProps({ showResetButton: true })"> 显示重置按钮 </el-button>
      <el-button @click="setProps({ showSubmitButton: false })"> 隐藏查询按钮 </el-button>
      <el-button @click="setProps({ showSubmitButton: true })"> 显示查询按钮 </el-button>
      <el-button @click="setProps({resetButtonOptions: { disabled: true, text: '重置New'}})"> 修改重置按钮 </el-button>
      <el-button @click="setProps({submitButtonOptions: { disabled: true, loading: true}})"> 修改查询按钮 </el-button>
    </div>
    <CollapseContainer title="useForm示例">
      <BasicForm
        @register="register"
        @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'
import { UseSchemas as schemas } from './data'

export default defineComponent({
  components: { ElButton, BasicForm, CollapseContainer },
  setup() {
    const { createMessage } = useMessage()

    const [register, { setProps }] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
    })

    function handleSubmit(values: Recordable) {
      createMessage.success('click search,values:' + JSON.stringify(values))
    }

    return {
      register,
      setProps,
      handleSubmit,
    }
  },
})
</script>
