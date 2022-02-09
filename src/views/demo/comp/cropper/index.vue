<template>
  <PageWrapper
    title="图片裁剪示例"
    content="需要开启测试接口服务才能进行上传测试！">
    <CollapseContainer title="头像裁剪">
      <CropperAvatar
        uploadName="file"
        :uploadApi="uploadApi"
        :value="avatar" />
    </CollapseContainer>

    <CollapseContainer
      title="矩形裁剪"
      class="my-4">
      <div class="p-4">
        <div class="cropper">
          <CropperImage
            ref="refCropper"
            :realTimePreview="false"
            :src="avatarImg"
            @cropend="handleCropend" />
        </div>
        <img
          :src="cropperImg"
          v-if="cropperImg" />
      </div>
      <p v-if="cropperImg">裁剪后图片信息：{{ info }}</p>
      <Button
        @click="handleCutImg"
        class="mx-4"
        type="success">完成裁剪</Button>
    </CollapseContainer>

    <CollapseContainer title="圆形裁剪">
      <div class="container p-4">
        <div class="cropper">
          <CropperImage
            ref="refCircleCropper"
            :src="avatarImg"
            @cropend="handleCircleCropend"
            circled />
        </div>
        <img
          :src="circleImg"
          class="croppered"
          v-if="circleImg" />
      </div>
      <p v-if="circleImg">裁剪后图片信息：{{ circleInfo }}</p>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { PageWrapper } from '@/components/Page'
import { CollapseContainer } from '@/components/Container'
import { CropperImage, CropperAvatar } from '@/components/Cropper'
import { uploadApi } from '@/api/sys/upload'
import avatarImg from '@/assets/images/header.jpg'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  components: {
    PageWrapper,
    CropperImage,
    CollapseContainer,
    CropperAvatar,
  },
  setup() {
    const info = ref('')
    const cropperImg = ref('')
    const circleInfo = ref('')
    const circleImg = ref('')
    const refCropper = ref()
    const userStore = useUserStore()
    const avatar = ref(userStore.getUserInfo?.avatar || '')

    /**
     * Trigger cropper
     */
    function handleCutImg() {
      unref(refCropper).croppered()
    }
    function handleCropend({ imgBase64, imgInfo }) {
      info.value = imgInfo
      cropperImg.value = imgBase64
    }

    function handleCircleCropend({ imgBase64, imgInfo }) {
      circleInfo.value = imgInfo
      circleImg.value = imgBase64
    }

    return {
      avatarImg,
      info,
      circleInfo,
      cropperImg,
      circleImg,
      refCropper,
      handleCutImg,
      handleCropend,
      handleCircleCropend,
      avatar,
      uploadApi,
    }
  },
})
</script>

<style scoped>
.cropper {
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}

.cropper + img{
  display: inline-block;
}
</style>
