<template>
  <ScrollContainer>
    <div
      ref="wrapperRef"
      :class="prefixCls">
      <el-tabs tab-position="left">
        <template
          v-for="item in settingList"
          :key="item.key">
          <el-tab-pane :label="item.name">
            <component :is="item.component" />
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ScrollContainer } from '@/components/Container/index'
import { settingList } from './data'
import BaseSetting from './BaseSetting.vue'
import SecureSetting from './SecureSetting.vue'
import AccountBind from './AccountBind.vue'
import MsgNotify from './MsgNotify.vue'

export default defineComponent({
  components: {
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
  background-color: var(--background-secondary-color);

  .base-title {
    padding-left: 0;
  }

  .el-tabs__item.is-active {
    background-color: #e3f4fc;
  }
}
</style>
