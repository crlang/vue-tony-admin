<template>
  <ElButton
    v-bind="getBindValue"
    :class="getButtonClass"
    @click="onClick">
    <template #default="data">
      <div :class="`${prefixCls}__inner`">
        <Icon
          :icon="preIcon"
          v-if="preIcon"
          :size="iconSize" />
        <slot v-bind="data || {}"></slot>
        <Icon
          :icon="sufIcon"
          v-if="sufIcon"
          :size="iconSize" />
      </div>
    </template>
  </ElButton>
</template>

<script lang="ts">
import { computed, unref, defineComponent } from 'vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { buttonProps } from './props'
import { omit } from 'lodash-es'
import { useDesign } from '@/hooks/web/useDesign'
import type { EleButton } from '@/components/ElementPlus'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Button',
  components: { Icon, ElButton },
  props: buttonProps,
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

    const getBindValue = computed(():EleButton => {
      const opt = { ...props, ...unref(attrs) }
      return omit(opt, 'preIcon', 'sufIcon', 'iconSize')
    })

    return {
      prefixCls,
      getButtonClass,
      getBindValue,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-button';

.#{$prefix-cls} {
  &__inner {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    > .eleicon {
      &:first-child {
        margin-right: 2px;

      }

      &:last-child {
        margin-left: 2px;
      }
    }
  }

  &.is-shadow {
    box-shadow: 0 6px 7px -1px rgba(80, 86, 175, 0.3);
  }
}
</style>
