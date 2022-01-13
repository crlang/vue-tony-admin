<template>
  <div
    :class="prefixCls"
    class="relative">
    <el-input
      v-if="showInput"
      v-bind="$attrs"
      clearable
      show-password
      v-model="innerValueRef"
      :disabled="disabled"
    />
    <div :class="`${prefixCls}-bar`">
      <div
        :class="`${prefixCls}-bar--fill`"
        :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, unref, watchEffect } from 'vue'
import { zxcvbn } from '@zxcvbn-ts/core'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  name: 'StrengthMeter',
  props: {
    value: propTypes.string,
    showInput: propTypes.bool.def(true),
    disabled: propTypes.bool,
  },
  emits: ['score-change', 'change'],
  setup(props, { emit }) {
    const innerValueRef = ref<string>('')
    const { prefixCls } = useDesign('strength-meter')

    const getPasswordStrength = computed(() => {
      const { disabled } = props
      if (disabled) return -1
      const innerValue = unref(innerValueRef)
      const score = innerValue ? zxcvbn(unref(innerValueRef)).score : -1
      emit('score-change', score)
      return score
    })

    watchEffect(() => {
      innerValueRef.value = props.value || ''
    })

    watch(
      () => unref(innerValueRef),
      (val) => {
        emit('change', val)
      }
    )

    return {
      getPasswordStrength,
      prefixCls,
      innerValueRef,
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-strength-meter';

.#{$prefix-cls} {
  width: 100%;

  &-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    background-color: var(--disabled-color);
    border-radius: 6px;

    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      background-color: transparent;
      border-color: var(--white-color);
      border-style: solid;
      border-width: 0 5px;
      content: '';
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;

      &[data-score='0'] {
        width: 20%;
        background-color: var(--error-color);
      }

      &[data-score='1'] {
        width: 40%;
        background-color: var(--error-color);
      }

      &[data-score='2'] {
        width: 60%;
        background-color: var(--warning-color);
      }

      &[data-score='3'] {
        width: 80%;
        background-color: var(--success-color);
      }

      &[data-score='4'] {
        width: 100%;
        background-color: var(--success-color);
      }
    }
  }
}
</style>
