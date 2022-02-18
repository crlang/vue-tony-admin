<template>
  <PageWrapper title="二维码组件使用示例">
    <CardGrid
      center
      :rows="4">
      <CardGridItem>
        <div>基础示例</div>
        <QrCode :value="qrCodeUrl" />
      </CardGridItem>

      <CardGridItem>
        <div>渲染成img标签示例</div>
        <QrCode
          :value="qrCodeUrl"
          tag="img" />
      </CardGridItem>

      <CardGridItem>
        <div>配置样式示例</div>
        <QrCode
          :value="qrCodeUrl"
          :options="{
            color: { dark: '#ff0'}
          }" />
      </CardGridItem>

      <CardGridItem>
        <div>本地logo示例</div>
        <QrCode
          :value="qrCodeUrl"
          :logo="LogoImg" />
      </CardGridItem>

      <CardGridItem>
        <div>在线logo示例</div>
        <QrCode
          :value="qrCodeUrl"
          logo="https://pic1.zhimg.com/v2-4d6524e63c84050c11af67b965a28874.png"
          :options="{
            color: { dark: '#55D187' }
          }" />
      </CardGridItem>

      <CardGridItem>
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
      </CardGridItem>

      <CardGridItem>
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
      </CardGridItem>

      <CardGridItem>
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
      </CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { QrCode, QrCodeActionType } from '@/components/Qrcode'
import LogoImg from '@/assets/images/logo.png'
import { PageWrapper } from '@/components/Page'
import { CardGrid, CardGridItem } from '@/components/CardGrid'

const qrCodeUrl = 'https://www.crlang.com'
export default defineComponent({
  components: { ElButton, QrCode, PageWrapper, CardGrid, CardGridItem },
  setup() {
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
      qrEl.download('Qrcode')
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
