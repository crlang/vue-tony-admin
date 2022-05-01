<template>
  <PageWrapper title="Icon组件示例">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card
          header="图标选择器(Iconify)"
          class="text-center"><IconPicker copy /></el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          header="图标选择器(Svg)"
          class="text-center"><IconPicker mode="svg" /></el-card>
      </el-col>
    </el-row>

    <CardGrid
      header="element-plus Icon使用 (直接按需引入相应组件即可)"
      class="my-6"
      :rows="3"
      center>
      <CardGridItem><ArrowDownBold :style="{ width: '2rem' }" /></CardGridItem>
      <CardGridItem><ArrowLeftBold :style="{ width: '2rem' }" /></CardGridItem>
      <CardGridItem><ArrowRightBold :style="{ width: '2rem' }" /></CardGridItem>
    </CardGrid>

    <CardGrid
      header="IconIfy 组件使用"
      :rows="3"
      center>
      <CardGridItem><Icon
        icon="ep:arrow-down"
        :size="30" /></CardGridItem>
      <CardGridItem><Icon
        icon="ep:arrow-left"
        :size="30" /></CardGridItem>
      <CardGridItem><Icon
        icon="ep:arrow-right"
        :size="30" /></CardGridItem>
    </CardGrid>

    <CardGrid
      header="SVG 文件图标"
      class="my-6"
      :rows="3"
      center>
      <CardGridItem>
        <SvgIcon
          name="sun"
          size="32" />
      </CardGridItem>
      <CardGridItem>
        <SvgIcon
          name="moon"
          size="32" />
      </CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElCard } from 'element-plus'
import { ArrowDownBold, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons'

import { Icon, SvgIcon } from '@/components/Icon'
import { IconPicker } from '@/components/IconPicker'
import { PageWrapper } from '@/components/Page'
import { CardGrid, CardGridItem } from '@/components/CardGrid'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    PageWrapper,
    IconPicker,
    ArrowDownBold,
    ArrowLeftBold,
    ArrowRightBold,
    Icon,
    CardGrid,
    CardGridItem,
    SvgIcon,
  },
  setup() {
    return {
    }
  },
})
</script>
