<template>
  <CollapseContainer title="基本设置" :can-expan="false">
    <ElRow :gutter="24">
      <ElCol :span="14">
        <BasicForm @register="register" />
      </ElCol>
      <ElCol :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <BasicUpload
            :api="ApiUpload"
            :model-value="avatar"
            upload-name="file"
            :show-preview="false"
            :max-size="5"
            :max-number="3"
            show-thumb
            :accept="['png', 'jpg', 'jpeg', 'webp']"
            @change="updateAvatar"
          />
        </div>
      </ElCol>
    </ElRow>
    <ElButton type="primary" @click="handleSubmit">更新基本信息</ElButton>
  </CollapseContainer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { ElButton, ElCol, ElRow } from 'element-plus'
import { baseSetschemas } from './data'
import { BasicForm, useForm } from '@/components/BasicForm'
import { CollapseContainer } from '@/components/CollapseContainer'

import { useMessage } from '@/hooks/web/useMessage'
import { BasicUpload } from '@/components/BasicUpload'

import { accountInfoApi } from '@/api/demo/account'
import { useUserStore } from '@/store/modules/user'
import { ApiUpload } from '@/api/upload'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElButton,
    BasicForm,
    CollapseContainer,
    BasicUpload,
  },
  setup() {
    const { createMessage } = useMessage()
    const userStore = useUserStore()

    const [register, { setFieldsValue }] = useForm({
      labelWidth: 120,
      schemas: baseSetschemas,
      showActionButtonGroup: false,
    })

    onMounted(async () => {
      const data = await accountInfoApi()
      setFieldsValue(data)
    })

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo
      return [avatar]
    })

    function updateAvatar(src: string) {
      const userinfo = userStore.getUserInfo
      userinfo.avatar = src
      userStore.setUserInfo(userinfo)
    }

    return {
      avatar,
      register,
      ApiUpload,
      updateAvatar,
      handleSubmit: () => {
        createMessage.success('更新成功！')
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.change-avatar {
  img {
    display: block;
    margin-bottom: 15px;
    border-radius: 50%;
  }
}
</style>
