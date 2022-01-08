<template>
  <el-button
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
  </el-button>
</template>

<script lang="ts">
import { computed, unref, defineComponent } from 'vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { buttonProps } from './props'
import { omit } from 'lodash-es'
import { EleButton } from '@/components/ElementPlus'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'Button',
  components: { Icon },
  props: buttonProps,
  setup(props, { attrs }) {
    const { prefixCls } = useDesign('basic-button')

    const getButtonClass = computed(() => {
      const { disabled } = props
      return [
        prefixCls,
        {
          [`is-disabled`]: disabled,
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
$prefix-cls: '#{$namespace}-basic-button';

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
}
</style>
