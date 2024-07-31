<template>
  <PageWrapper title="基础表单" content-background description="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
    <ElRow>
      <ElCol
        :xl="{ span: 10, offset: 7 }"
        :lg="{ span: 12, offset: 6 }"
        :md="{ span: 16, offset: 4 }"
        :sm="{ span: 24, offset: 0 }"
      >
        <BasicForm @register="register" />
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { ElCol, ElRow } from 'element-plus'
import { defineComponent } from 'vue'
import { schemas } from './data'
import { BasicForm, useForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'FormBasicPage',
  components: { ElRow, ElCol, BasicForm },
  setup() {
    const { createMessage } = useMessage()
    const [register, { validate, setFormProps }] = useForm({
      labelWidth: 160,
      colProps: {
        span: 24,
      },
      schemas,
      actionColProps: {
        offset: 8,
        span: 12,
      },
      submitButtonOptions: {
        btnText: '提交',
      },
      submitFn: customSubmitFunc,
    })

    async function customSubmitFunc() {
      try {
        await validate()
        setFormProps({
          submitButtonOptions: {
            loading: true,
          },
        })
        setTimeout(() => {
          setFormProps({
            submitButtonOptions: {
              loading: false,
            },
          })
          createMessage.success('提交成功！')
        }, 2000)
      }
      catch {
      }
    }

    return { register }
  },
})
</script>

<style lang="scss" scoped>
.form-wrap {
  padding: 24px;
  background-color: var(--background-primary-color);
}
</style>
