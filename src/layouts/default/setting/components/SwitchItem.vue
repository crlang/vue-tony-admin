<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <ElSwitch
      v-bind="getBindValue"
      @change="handleChange"
      inline-prompt
      :disabled="disabled"
      :active-text="t('layout.setting.on')"
      :inactive-text="t('layout.setting.off')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { baseHandler } from '../handler'
import { HandlerEnum } from '../enum'
import { ElSwitch } from 'element-plus'

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
    const { t } = useI18n()

    const getBindValue = computed(() => {
      return props.def ? { modelValue: props.def } : {}
    })
    function handleChange(v: string | number | boolean) {
      props.event && baseHandler(props.event, v)
    }
    return {
      prefixCls,
      t,
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
