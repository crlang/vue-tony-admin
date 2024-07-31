<template>
  <ElButton v-bind="getBindValues" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <div :class="`${prefixCls}__inner`">
        <SvgIcon v-if="preIcon" :name="preIcon" :size="iconSize" />
        <slot v-bind="data || {}"></slot>
        <SvgIcon v-if="sufIcon" :name="sufIcon" :size="iconSize" />
      </div>
    </template>
  </ElButton>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { ElButton } from 'element-plus'
import { omit } from 'lodash-es'
import { basicProps, customProps } from './props'
import type { EleButton } from '@/components/ElementPlus'

import { SvgIcon } from '@/components/SvgIcon'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicButton',
  components: { ElButton, SvgIcon },
  props: basicProps,
  setup(props, { attrs }) {
    const { prefixCls } = useDesign('basic-button')

    const getButtonClass = computed(() => {
      const { disabled, shadow } = props
      return [
        prefixCls,
        {
          [`is-disabled`]: disabled,
          [`is-shadow`]: shadow,
        },
      ]
    })

    const getBindValues = computed(() => {
      const opts = { ...props, ...unref(attrs) }
      // 绑定组件Porps前，移除自定义附加项
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleButton
    })

    return {
      prefixCls,
      getButtonClass,
      getBindValues,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-button';

.#{$prefix-cls} {
  &__inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > .eleicon {
      &:first-child {
        margin-right: 4px;
      }

      &:last-child {
        margin-left: 4px;
      }
    }
  }

  &.is-shadow {
    box-shadow: 0 6px 7px -1px rgb(80 86 175 / 30%);
  }
}
</style>
