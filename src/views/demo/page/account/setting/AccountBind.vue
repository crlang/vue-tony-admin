<template>
  <CollapseContainer title="账号绑定" :canExpan="false">
    <BasicList>
      <template v-for="item in list" :key="item.key">
        <BasicListItem>
          <template #thumb>
            <SvgIcon
              v-if="item.avatar"
              class="avatar"
              :name="item.avatar"
              :color="item.color" />
          </template>
          <template #title>
            {{ item.title }}
            <el-button
              text
              size="small"
              v-if="item.extra"
              class="extra">
              {{ item.extra }}
            </el-button>
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
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { CollapseContainer } from '@/components/CollapseContainer';
import { SvgIcon } from '@/components/SvgIcon';
import { BasicList, BasicListItem } from '@/components/BasicList';

import { accountBindList } from './data';

export default defineComponent({
  components: {
    ElButton,
    CollapseContainer,
    BasicList,
    BasicListItem,
    SvgIcon,
  },
  setup() {
    return {
      list: accountBindList,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  font-size: 40px !important;
}

.extra {
  float: right;
  margin-top: 10px;
  margin-right: 30px;
  cursor: pointer;
}
</style>
