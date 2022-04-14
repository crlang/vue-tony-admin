<template>
  <PageWrapper title="二维码组件使用示例">
    <el-row class="text-center">
      <el-col :span="6">
        <div>基础示例</div>
        <QrCode :value="qrCodeUrl" />
      </el-col>

      <el-col :span="6">
        <div>渲染成img标签示例</div>
        <QrCode
          :value="qrCodeUrl"
          tag="img" />
      </el-col>

      <el-col :span="6">
        <div>配置样式示例</div>
        <QrCode
          :value="qrCodeUrl"
          :options="{
            color: { dark: '#ff0'}
          }" />
      </el-col>

      <el-col :span="6">
        <div>本地logo示例</div>
        <QrCode
          :value="qrCodeUrl"
          :logo="LogoImg" />
      </el-col>

      <el-col :span="6">
        <div>在线logo示例</div>
        <QrCode
          :value="qrCodeUrl"
          logo="https://pic1.zhimg.com/v2-4d6524e63c84050c11af67b965a28874.png"
          :options="{
            color: { dark: '#55D187' }
          }" />
      </el-col>

      <el-col :span="6">
        <div>logo配置示例</div>
        <QrCode
          :value="qrCodeUrl"
          :logo="{
            src: 'https://pic1.zhimg.com/v2-4d6524e63c84050c11af67b965a28874.png',
            logoSize: 0.2,
            borderSize: 0.05,
            borderRadius: 50,
            bgColor: 'blue'
          }" />
      </el-col>

      <el-col :span="6">
        <div>下载示例</div>
        <QrCode
          :value="qrCodeUrl"
          ref="qrRef"
          :logo="LogoImg" />
        <el-button
          class="my-2"
          type="primary"
          @click="download">下载</el-button>
        <div class="msg">在线logo会导致图片跨域</div>
      </el-col>

      <el-col :span="6">
        <div>扩展绘制示例</div>
        <QrCode
          :value="qrCodeUrl"
          :width="200"
          :options="{ margin: 5 }"
          ref="qrDiyRef"
          :logo="LogoImg"
          @done="onQrcodeDone" />
        <el-button
          class="y-2"
          type="primary"
          @click="downloadDiy">下载</el-button>
        <div class="msg">要进行扩展绘制则不能将tag设为img</div>
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { ElButton, ElRow, ElCol } from 'element-plus'
import { QrCode, QrCodeActionType } from '@/components/QrCode'
import LogoImg from '@/assets/images/logo.png'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { ElButton, ElRow, ElCol, QrCode, PageWrapper },
  setup() {
    const qrCodeUrl = 'https://www.crlang.com'
    const qrRef = ref<Nullable<QrCodeActionType>>(null)
    const qrDiyRef = ref<Nullable<QrCodeActionType>>(null)

    function download() {
      const qrEl = unref(qrRef)
      if (!qrEl) return
      qrEl.download('文件名')
    }

    function downloadDiy() {
      const qrEl = unref(qrDiyRef)
      if (!qrEl) return
      qrEl.download('QrCode')
    }

    function onQrcodeDone({ ctx }: any) {
      if (ctx instanceof CanvasRenderingContext2D) {
        // 额外绘制
        ctx.fillStyle = 'black'
        ctx.font = '16px "微软雅黑"'
        ctx.textBaseline = 'bottom'
        ctx.textAlign = 'center'
        ctx.fillText('Tony Admin', 100, 195, 200)
      }
    }
    return {
      onQrcodeDone,
      qrCodeUrl,
      LogoImg,
      download,
      downloadDiy,
      qrRef,
      qrDiyRef,
    }
  },
})
</script>
