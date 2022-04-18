<template>
  <div class="step2">
    <el-alert
      title="确认转账后，资金将直接打入对方账户，无法退回。"
      show-icon />
    <el-descriptions
      :column="1"
      class="mt-5">
      <el-descriptions-item label="付款账户">test@alipay.com</el-descriptions-item>
      <el-descriptions-item label="收款账户">test@example.com</el-descriptions-item>
      <el-descriptions-item label="收款人姓名">Tony</el-descriptions-item>
      <el-descriptions-item label="转账金额">500元</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <BasicForm @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert, ElDescriptions, ElDescriptionsItem, ElDivider } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form'
import { step2Schemas } from './data'

export default defineComponent({
  components: {
    ElAlert,
    ElDescriptions,
    ElDescriptionsItem,
    ElDivider,
    BasicForm,
  },
  emits: ['next', 'prev'],
  setup(_, { emit }) {
    const [register, { validate, setProps }] = useForm({
      labelWidth: 80,
      schemas: step2Schemas,
      actionColOptions: {
        span: 14,
      },
      resetButtonOptions: {
        text: '上一步',
      },
      submitButtonOptions: {
        text: '提交',
      },
      resetFunc: customResetFunc,
      submitFunc: customSubmitFunc,
    })

    async function customResetFunc() {
      emit('prev')
    }

    async function customSubmitFunc() {
      try {
        const values = await validate()
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        })
        setTimeout(() => {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          })
          emit('next', values)
        }, 1500)
      } catch (error) {
        // continue regardless of error
      }
    }

    return { register }
  },
})
</script>
<style lang="scss" scoped>
.step2 {
  width: 450px;
  margin: 0 auto;
}
</style>
