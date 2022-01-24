<template>
  <div :class="prefixCls">
    <el-tooltip
      :content="t('layout.header.tooltipErrorLog')"
      placement="bottom">
      <el-badge
        :value="getCount"
        @click="handleToErrorList"
        :max="99">
        <span><Icon icon="ion:bug-outline" /></span>
      </el-badge>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Icon from '@/components/Icon'

import { useI18n } from '@/hooks/web/useI18n'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { PageEnum } from '@/enums/pageEnum'
import { useDesign } from '@/hooks/web/useDesign'

import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorAction',
  components: { Icon },

  setup() {
    const { t } = useI18n()
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
      t,
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

    &__content {
      position: absolute;
      top: -8px;
      right: calc(50% - 16px);
      width: 16px;
      height: 16px;
      padding: 0;
      font-size: 12px;
      line-height: 16px;
      border: none;
      transform: none;
    }
  }
}
</style>
