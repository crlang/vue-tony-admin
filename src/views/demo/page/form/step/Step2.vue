<template>
  <div class="step2">
    <ElAlert type="error" title="确认转账后，资金将直接打入对方账户，无法退回。" show-icon />
    <div class="step2-msg">
      <ElDescriptions :column="1">
        <ElDescriptionsItem label="付款账户">test@alipay.com</ElDescriptionsItem>
        <ElDescriptionsItem label="收款账户">test@example.com</ElDescriptionsItem>
        <ElDescriptionsItem label="收款人姓名">Tony</ElDescriptionsItem>
        <ElDescriptionsItem label="转账金额">500元</ElDescriptionsItem>
      </ElDescriptions>
    </div>
    <BasicDivider />
    <BasicForm @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert, ElDescriptions, ElDescriptionsItem } from 'element-plus'

import { step2Schemas } from './data'
import { BasicDivider } from '@/components/Basic'
import { BasicForm, useForm } from '@/components/BasicForm'

export default defineComponent({
  components: {
    ElAlert,
    ElDescriptions,
    ElDescriptionsItem,
    BasicDivider,
    BasicForm,
  },
  emits: ['next', 'prev'],
  setup(_, { emit }) {
    const [register, { validate, setFormProps }] = useForm({
      labelWidth: 80,
      schemas: step2Schemas,
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 14,
      },
      resetButtonOptions: {
        btnText: '上一步',
      },
      submitButtonOptions: {
        btnText: '提交',
      },
      resetFn: customResetFunc,
      submitFn: customSubmitFunc,
    })

    async function customResetFunc() {
      emit('prev')
    }

    async function customSubmitFunc() {
      try {
        const values = await validate()
        setFormProps({
          submitButtonOptions: {
            loading: true,
            btnText: '提交',
          },
        })
        setTimeout(() => {
          setFormProps({
            submitButtonOptions: {
              loading: false,
              btnText: '提交',
            },
          })
          emit('next', values)
        }, 1500)
      }
      catch {
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

  &-msg {
    padding: 24px;
    background: var(--background-main-color);
  }

  .el-descriptions {
    --el-fill-color-blank: none;
  }
}
</style>
