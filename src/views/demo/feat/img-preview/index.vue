<template>
  <PageWrapper title="图片预览示例">
    <div>
      <el-image
        style="width: 100px; height: 100px"
        :src="imgList[0]"
        :preview-src-list="imgList"
        :initial-index="1"
      />
    </div>
    <el-button
      @click="openImg"
      type="primary">无预览图</el-button>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton, ElImage } from 'element-plus'
import { createImgPreview } from '@/components/Preview'
// import { PreviewActions } from '@/components/Preview/src/typing';

const imgList: string[] = [
  'https://picsum.photos/2000',
  'https://picsum.photos/1920/1080',
  'https://picsum.photos/seed/picsum/2160/1440',
]
export default defineComponent({
  components: { ElButton, ElImage },
  setup() {
    function openImg() {
      const onImgLoad = ({ index, url, dom }) => {
        console.info(`第${index + 1}张图片已加载，URL为：${url}`, dom)
      }
      // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
      createImgPreview({ imageList: imgList, rememberState: true, onImgLoad })
    }
    return { imgList, openImg }
  },
})
</script>
