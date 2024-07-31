<template>
  <PageWrapper title="动画组件示例">
    <ElRow :gutter="16">
      <ElCol v-for="item in transitionList" :key="item" :span="6">
        <component :is="`${item}Transition`">
          <div class="box">
            <div>{{ item }}</div>
          </div>
        </component>
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton, ElCol, ElRow } from 'element-plus'

import {
  ExpandTransition,
  ExpandXTransition,
  FadeBottomTransition,
  FadeScaleTransition,
  FadeSlideTransition,
  FadeTopTransition,
  FadeTransition,
  ScaleRotateTransition,
  ScaleTransition,
  ScrollReverseTransition,
  ScrollTransition,
  ScrollXReverseTransition,
  ScrollXTransition,
  SlideReverseTransition,
  SlideTransition,
  SlideXReverseTransition,
  SlideXTransition,
  ZoomFadeTransition,
  ZoomOutTransition,
} from '@/components/Transition'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElButton,

    FadeTransition,
    FadeSlideTransition,
    FadeBottomTransition,
    FadeScaleTransition,
    FadeTopTransition,
    ScaleTransition,
    ScaleRotateTransition,
    SlideTransition,
    SlideXTransition,
    SlideReverseTransition,
    SlideXReverseTransition,
    ScrollTransition,
    ScrollXTransition,
    ScrollReverseTransition,
    ScrollXReverseTransition,
    ZoomFadeTransition,
    ZoomOutTransition,
    ExpandTransition,
    ExpandXTransition,
  },
  setup() {
    const show = ref(true)
    const transitionList = [
      'Fade',
      'FadeSlide',
      'FadeBottom',
      'FadeScale',
      'FadeTop',
      'Scale',
      'ScaleRotate',
      'Slide',
      'SlideX',
      'SlideReverse',
      'SlideXReverse',
      'Scroll',
      'ScrollX',
      'ScrollReverse',
      'ScrollXReverse',
      'ZoomFade',
      'ZoomOut',
      'Expand',
      'ExpandX',
    ]

    function start() {
      show.value = !show.value
    }

    setInterval(start, 3e3)
    return { transitionList, show }
  },
})
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  background-color: #7eaaec;
}
</style>
