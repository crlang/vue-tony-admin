<template>
  <el-card
    header="最新动态"
    shadow="never"
    v-bind="$attrs">
    <template #header>
      <div class="flex justify-between">
        <span>最新动态</span>
        <el-button
          type="text"
          size="small">更多</el-button>
      </div>
    </template>
    <List>
      <template
        v-for="item in dynamicInfoItems"
        :key="item.title">
        <ListItem style="display: block;">
          <ListItemMeta>
            <template #description>
              {{ item.date }}
            </template>
            <template #title>
              <div class="dync-title">{{ item.name }}</div>
              <div class="dync-desc">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-html="item.desc"></p>
              </div>
            </template>
            <template #avatar>
              <img
                :src="item.avatar"
                :alt="item.name"
                width="32" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </el-card>
</template>

<script lang="ts" setup>
import { dynamicInfoItems } from './data'
import { List, ListItem, ListItemMeta } from '@/components/List'
</script>

<style scoped>
.dync-title {
  margin-bottom: 6px;
  font-size: 20px;
  color: var(--text-primary-color);
}

.dync-desc {
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary-color);

  :deep(a) {
    color: var(--primary-color);
  }
}
</style>
