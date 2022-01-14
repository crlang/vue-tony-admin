<template>
  <CardGrid
    center
    shadow="always">
    <template #header><div class="el-card__header--title">快捷导航</div></template>
    <CardGridItem
      vertical
      v-for="(item,index) in navItems"
      :key="index">
      <Icon
        :icon="item.icon"
        :color="item.color"
        size="20" />
      <span class="text-md mt-2">{{ item.title }}</span>
    </CardGridItem>
  </CardGrid>
</template>

<script lang="ts" setup>
import { CardGrid, CardGridItem } from '@/components/CardGrid'
import { navItems } from './data'
import { Icon } from '@/components/Icon'
</script>
