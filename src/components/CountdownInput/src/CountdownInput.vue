<template>
  <ElInput v-bind="$attrs" v-model:modelValue="innerValueRef" :class="prefixCls">
    <template #append>
      <ElButton :disabled="isStart" :loading="loading" @click="handleStart">
        {{ getButtonText }}
      </ElButton>
    </template>
  </ElInput>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue'
import { ElButton, ElInput } from 'element-plus'

import { useCountdown } from './useCountdown'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'CountdownInput',
  components: { ElInput, ElButton },
  inheritAttrs: false,
  props: {
    /**
     * 绑定的值
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
     * 倒计时时间(s)
     */
    count: {
      type: Number,
      default: 60,
    },
    /**
     * 验证码的接口方法
     */
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-countdown-input')
    const loading = ref(false)
    const innerValueRef = ref()
    const { currentCount, isStart, start } = useCountdown(props.count)

    /**
     * 监听倒计时文本变化
     */
    const getButtonText = computed(() => {
      return !unref(isStart) ? '获取验证码' : `${unref(currentCount)}秒后重新获取`
    })

    /**
     * 启动计时
     */
    async function handleStart() {
      const { sendCodeApi } = props
      // 如果有api方法，先请求后再启动
      if (typeof sendCodeApi === 'function') {
        loading.value = true
        try {
          const canStart = await sendCodeApi()
          if (canStart) {
            start()
          }
        }
        finally {
          loading.value = false
        }
      }
      else {
        start()
      }
    }

    watchEffect(() => {
      innerValueRef.value = props.modelValue || ''
    })

    watch(
      () => unref(innerValueRef),
      (val) => {
        emit('update:modelValue', val)
        emit('change', val)
      },
    )

    return {
      prefixCls,
      loading,
      isStart,
      innerValueRef,
      getButtonText,
      handleStart,
    }
  },
})
</script>
