<template>
  <div :class="prefixCls">
    <ElInput
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
import { ElInput } from 'element-plus'
import { zxcvbn, ZxcvbnResult } from '@zxcvbn-ts/core'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  name: 'StrengthMeter',
  components: { ElInput },
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
      const zxc = zxcvbn(unref(innerValueRef)) as ZxcvbnResult
      const score = innerValue ? zxc.score : -1
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

<style lang="scss">
$prefix-cls: '#{$tonyname}-strength-meter';

.#{$prefix-cls} {
  position: relative;
  width: 100%;

  &-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    background-color: rgba(0, 0, 0, 0.1);
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
        background-color: var(--el-color-primary);
      }

      &[data-score='1'] {
        width: 40%;
        background-color: var(--el-color-danger);
      }

      &[data-score='2'] {
        width: 60%;
        background-color: var(--el-color-warning);
      }

      &[data-score='3'] {
        width: 80%;
        background-color: var(--el-color-info);
      }

      &[data-score='4'] {
        width: 100%;
        background-color: var(--el-color-success);
      }
    }
  }
}
</style>
