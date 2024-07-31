<template>
  <ScrollContainer>
    <div :class="prefixCls">
      <ElTabs tab-position="left">
        <template v-for="item in settingList" :key="item.key">
          <ElTabPane :label="item.name">
            <component :is="item.component" />
          </ElTabPane>
        </template>
      </ElTabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import { settingList } from './data'
import BaseSetting from './BaseSetting.vue'
import SecureSetting from './SecureSetting.vue'
import AccountBind from './AccountBind.vue'
import MsgNotify from './MsgNotify.vue'
import { ScrollContainer } from '@/components/ScrollContainer'

export default defineComponent({
  components: {
    ElTabs,
    ElTabPane,
    ScrollContainer,
    BaseSetting,
    SecureSetting,
    AccountBind,
    MsgNotify,
  },
  setup() {
    return {
      prefixCls: 'account-setting',
      settingList,
    }
  },
})
</script>

<style lang="scss">
.account-setting {
  margin: 12px;
  background-color: var(--background-primary-color);

  .base-title {
    padding-left: 0;
  }

  .el-tabs__item.is-active {
    background-color: #e3f4fc;
  }
}
</style>
