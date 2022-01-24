<template>
  <CollapseContainer
    title="基本设置"
    :canExpan="false">
    <el-row :gutter="24">
      <el-col :span="14">
        <BasicForm @register="register" />
      </el-col>
      <el-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </el-col>
    </el-row>
    <el-button
      type="primary"
      @click="handleSubmit"> 更新基本信息 </el-button>
  </CollapseContainer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { ElRow, ElCol, ElButton } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form/index'
import { CollapseContainer } from '@/components/Container'
import { CropperAvatar } from '@/components/Cropper'

import { useMessage } from '@/hooks/web/useMessage'

import headerImg from '@/assets/images/header.jpg'
import { accountInfoApi } from '@/api/demo/account'
import { baseSetschemas } from './data'
import { useUserStore } from '@/store/modules/user'
import { uploadApi } from '@/api/sys/upload'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElButton,
    BasicForm,
    CollapseContainer,
    CropperAvatar,
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
      return avatar || headerImg
    })

    function updateAvatar(src: string) {
      const userinfo = userStore.getUserInfo
      userinfo.avatar = src
      userStore.setUserInfo(userinfo)
    }

    return {
      avatar,
      register,
      uploadApi: uploadApi as any,
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
