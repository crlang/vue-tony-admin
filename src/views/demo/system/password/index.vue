<template>
  <PageWrapper
    title="修改当前用户密码"
    description="修改成功后会自动退出当前登录！">
    <CollapseContainer
      title="基础示例"
      :canExpan="false">
      <BasicForm
        @register="register"
        @submit="handleSubmit"
        @reset="resetFields" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/Page'
import { BasicForm, useForm } from '@/components/Form'
import { CollapseContainer } from '@/components/Container'

import { formSchema } from './data'

export default defineComponent({
  name: 'ChangePassword',
  components: { BasicForm, PageWrapper, CollapseContainer },
  setup() {
    const [register, { validate, resetFields, getFieldsValue }] = useForm({
      size: 'large',
      labelWidth: 100,
      colProps: { span: 16 },
      schemas: formSchema,
      submitButtonOptions: {
        text: '确认',
      },
      resetButtonOptions: {
        text: '重置',
      },
    })

    async function handleSubmit() {
      try {
        await validate()
        const { passwordOld, passwordNew } = getFieldsValue()

        // TODO custom api
        console.log(passwordOld, passwordNew)
        // const { router } = useRouter();
        // router.push(pageEnum.BASE_LOGIN);
      } catch (error) {
        // continue regardless of error
      }
    }

    return { register, resetFields, handleSubmit }
  },
})
</script>
