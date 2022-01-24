<template>
  <PageWrapper title="动画组件示例">
    <div class="flex">
      <el-select
        v-model="value"
        placeholder="选择动画"
        :style="{ width: '150px' }">
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        class="ml-4"
        @click="start">start</el-button>
    </div>
    <component :is="`${value}Transition`">
      <div
        class="box"
        v-show="show"></div>
    </component>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElSelect, ElOption, ElButton } from 'element-plus'
import { PageWrapper } from '@/components/Page'
import {
  FadeTransition,
  ScaleTransition,
  SlideYTransition,
  ScrollYTransition,
  SlideYReverseTransition,
  ScrollYReverseTransition,
  SlideXTransition,
  ScrollXTransition,
  SlideXReverseTransition,
  ScrollXReverseTransition,
  ScaleRotateTransition,
  ExpandXTransition,
  ExpandTransition
} from '@/components/Transition'

const transitionList = [
  'Fade',
  'Scale',
  'SlideY',
  'ScrollY',
  'SlideYReverse',
  'ScrollYReverse',
  'SlideX',
  'ScrollX',
  'SlideXReverse',
  'ScrollXReverse',
  'ScaleRotate',
  'ExpandX',
  'Expand',
]
const options = transitionList.map((item) => ({
  label: item,
  value: item,
  key: item,
}))

export default defineComponent({
  components: {
    ElSelect,
    ElOption,
    ElButton,
    PageWrapper,
    FadeTransition,
    ScaleTransition,
    SlideYTransition,
    ScrollYTransition,
    SlideYReverseTransition,
    ScrollYReverseTransition,
    SlideXTransition,
    ScrollXTransition,
    SlideXReverseTransition,
    ScrollXReverseTransition,
    ScaleRotateTransition,
    ExpandXTransition,
    ExpandTransition,
  },
  setup() {
    const value = ref('Fade')
    const show = ref(true)
    function start() {
      show.value = false
      setTimeout(() => {
        show.value = true
      }, 300)
    }
    return { options, value, start, show }
  },
})
</script>

<style lang="scss" scoped>
.box {
  width: 236px;
  height: 236px;
  margin-top: 20px;
  background-color: #7eaaec;
}
</style>
