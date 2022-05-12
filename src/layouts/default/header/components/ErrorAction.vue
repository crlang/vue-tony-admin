<template>
  <div :class="prefixCls">
    <ElTooltip
      content="错误日志"
      placement="bottom">
      <span @click="handleToErrorList">
        <ElBadge
          :value="getCount"
          :max="99">
          <Icon name="ion:bug-outline" />
        </ElBadge>
      </span>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElTooltip, ElBadge } from 'element-plus'
import Icon from '@/components/Icon'

import { useErrorLogStore } from '@/store/modules/errorLog'
import { PageEnum } from '@/enums/pageEnum'
import { useDesign } from '@/hooks/web/useDesign'

import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorAction',
  components: { ElTooltip, ElBadge, Icon },

  setup() {
    const { push } = useRouter()
    const errorLogStore = useErrorLogStore()
    const { prefixCls } = useDesign('header-error-action')

    const getCount = computed(() => errorLogStore.getErrorLogListCount)

    function handleToErrorList() {
      push(PageEnum.ERROR_LOG_PAGE).then(() => {
        errorLogStore.setErrorLogListCount(0)
      })
    }

    return {
      prefixCls,
      getCount,
      handleToErrorList,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-error-action';
.#{$prefix-cls} {
  .el-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    // &__content {
    //   position: absolute;
    //   top: 2px;
    //   right: calc(50% - 16px);
    //   width: 16px;
    //   height: 16px;
    //   padding: 0;
    //   font-size: 12px;
    //   line-height: 16px;
    //   border: none;
    //   transform: none;
    // }
  }
}
</style>
