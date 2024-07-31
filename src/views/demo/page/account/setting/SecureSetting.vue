<template>
  <CollapseContainer title="安全设置" :can-expan="false">
    <BasicList>
      <template v-for="item in list" :key="item.key">
        <BasicListItem>
          <template #title>
            {{ item.title }}
            <div v-if="item.extra" class="extra">
              {{ item.extra }}
            </div>
          </template>
          <template #description>
            <div>{{ item.description }}</div>
          </template>
        </BasicListItem>
      </template>
    </BasicList>
  </CollapseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { secureSettingList } from './data'
import { CollapseContainer } from '@/components/CollapseContainer'
import { BasicList, BasicListItem } from '@/components/BasicList'

export default defineComponent({
  components: {
    CollapseContainer,
    BasicList,
    BasicListItem,
  },
  setup() {
    return {
      list: secureSettingList,
    }
  },
})
</script>

<style lang="scss" scoped>
.extra {
  float: right;
  margin-top: 10px;
  margin-right: 30px;
  font-weight: normal;
  color: #1890ff;
  cursor: pointer;
}
</style>
