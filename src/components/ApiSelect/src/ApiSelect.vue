<template>
  <ElSelect
    v-bind="$attrs"
    v-model:modelValue="innerValueRef"
    clearable
    :no-data-text="getSelectEmpty"
    @visible-change="handleFetch"
  >
    <ElOption
      v-for="item in getOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ElSelect>
</template>

<script lang="ts">
import type { PropType } from 'vue'

import { computed, defineComponent, onMounted, ref, unref, watch, watchEffect } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
import { get, omit } from 'lodash-es'

import type { OptionsItem } from './typing'

export default defineComponent({
  name: 'ApiSelect',
  components: { ElSelect, ElOption },
  inheritAttrs: false,
  props: {
    /**
     * 绑定的值
     */
    modelValue: {
      type: [Array, String, Number],
      default: '',
    },
    /**
     * API函数
     */
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: null,
    },
    /**
     * API参数
     */
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    /**
     * API响应数据的所在的层级，支持多层级如 data.record.list
     */
    resultField: {
      type: String,
      default: '',
    },
    /**
     * 数据项的显示字段
     */
    labelField: {
      type: String,
      default: 'label',
    },
    /**
     * 数据项的值字段
     */
    valueField: {
      type: String,
      default: 'value',
    },
    /**
     * 是否转换数据项的值为字符串
     */
    valueToString: { type: Boolean },
    /**
     * 是否立即请求
     */
    immediate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['optionChange', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const options = ref<Recordable[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const innerValueRef = ref()

    /**
     * 根据 labelField/valueField 字段，对齐合法的 ElOption 数据
     */
    const getOptions = computed(() => {
      const { labelField, valueField, valueToString } = props

      return unref(options).reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: valueToString ? `${value}` : value,
          })
        }
        return prev
      }, [] as OptionsItem[])
    })

    /**
     * 远程请求时的提示
     */
    const getSelectEmpty = computed(() => {
      if (unref(loading)) {
        return '请等待数据加载完成...'
      }
      else {
        return '数据为空'
      }
    })

    watchEffect(() => {
      innerValueRef.value = props.modelValue || ''
      if (props.immediate) {
        fetch()
      }
    })

    watch(
      () => props.params,
      () => {
        if (!unref(isFirstLoad)) {
          fetch()
        }
      },
      { deep: true },
    )

    watch(
      () => unref(innerValueRef),
      (val) => {
        emit('update:modelValue', val)
        emit('change', val)
      },
    )

    /**
     * 请求数据，根据 resultField 对齐合法的数据
     */
    async function fetch() {
      const api = props.api
      if (!api || typeof api !== 'function')
        return

      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          options.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          options.value = get(res, props.resultField) || []
        }
        emitChange()
      }
      catch (error) {
        console.error(error)
      }
      finally {
        loading.value = false
      }
    }

    /**
     * 预加载远程数据
     */
    async function handleFetch() {
      if (!props.immediate && unref(isFirstLoad)) {
        await fetch()
        isFirstLoad.value = false
      }
    }

    /**
     * 选项更新时回调数据
     */
    function emitChange() {
      emit('optionChange', unref(getOptions))
    }

    onMounted(() => {
      handleFetch()
    })

    return {
      innerValueRef,
      getOptions,
      loading,
      getSelectEmpty,
      handleFetch,
    }
  },
})
</script>
