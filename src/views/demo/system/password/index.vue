<template>
  <PageWrapper
    title="修改当前用户密码"
    content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <el-button @click="resetFields"> 重置 </el-button>
        <el-button
          class="!ml-4"
          type="primary"
          @click="handleSubmit"> 确认 </el-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/Page'
import { BasicForm, useForm } from '@/components/Form'

import { formSchema } from './data'
export default defineComponent({
  name: 'ChangePassword',
  components: { BasicForm, PageWrapper },
  setup() {
    const [register, { validate, resetFields, getFieldsValue }] = useForm({
      size: 'large',
      labelWidth: 100,
      showActionButtonGroup: false,
      schemas: formSchema,
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
