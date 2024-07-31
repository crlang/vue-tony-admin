<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <ElSwitch
      v-bind="getBindValue"
      inline-prompt
      :disabled="disabled"
      active-text="开"
      inactive-text="关"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { ElSwitch } from 'element-plus'

import { baseHandler } from '../handler'
import type { HandlerEnum } from '../enum'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'SwitchItem',
  components: { ElSwitch },
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    def: {
      type: Boolean,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-switch-item')

    const getBindValue = computed(() => {
      return props.def ? { modelValue: props.def } : {}
    })
    function handleChange(v: string | number | boolean) {
      if (props.event) {
        baseHandler(props.event, v)
      }
    }
    return {
      prefixCls,
      handleChange,
      getBindValue,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-setting-switch-item';

.#{$prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  color: var(--text-secondary-color);
}
</style>
