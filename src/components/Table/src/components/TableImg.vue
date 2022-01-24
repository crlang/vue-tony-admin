<template>
  <div
    :class="[prefixCls,{'simple-show':simpleShow}]"
    v-if="imgList?.length"
    :style="getWrapStyle">
    <ElBadge
      :value="imgList.length"
      v-if="simpleShow">
      <div :class="`${prefixCls}__preview`">
        <ElImage
          :width="size"
          :fit="fit"
          :src="imgList[index]"
          :preview-src-list="imgList" />
      </div>
    </ElBadge>
    <div
      :class="`${prefixCls}__thumbs`"
      v-else>
      <template
        v-for="img in imgList"
        :key="img">
        <ElImage
          :width="size"
          :fit="fit"
          :src="img" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { ElBadge, ElImage } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  name: 'TableImage',
  components: { ElBadge, ElImage },
  props: {
    imgList: propTypes.arrayOf(propTypes.string),
    fit: propTypes.string.def(''),
    index: propTypes.number.def(0),
    size: propTypes.number.def(40),
    // 是否简单显示（只显示第一张图片）
    simpleShow: propTypes.bool,
    // 简单模式下是否显示图片数量的badge
    showBadge: propTypes.bool.def(true),
  },
  setup(props) {
    const getWrapStyle = computed((): CSSProperties => {
      const { size } = props
      const s = `${size}px`
      return { height: s, width: s }
    })

    const { prefixCls } = useDesign('basic-table-img')
    return { prefixCls, getWrapStyle }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table-img';

.#{$prefix-cls} {
  &.simple-show {
    padding-top: 8px;
  }

  &__preview {
    line-height: 0;
  }

  &__thumbs {
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    >.el-image {
      display: inline-block;
      margin-right: 4px;
    }
  }
}
</style>
