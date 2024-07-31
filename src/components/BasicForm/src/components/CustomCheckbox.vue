<template>
  <ElCheckboxGroup v-if="group" v-bind="groupProps" v-model:modelValue="state">
    <template v-if="type === 'button'">
      <ElCheckboxButton
        v-for="(item, index) in getOptions"
        v-bind="buttonProps"
        :key="index"
        :disabled="item.disabled"
        :label="item.value"
      >
        {{ item.label }}
      </ElCheckboxButton>
    </template>
    <template v-else>
      <ElCheckbox
        v-for="(item, index) in getOptions"
        v-bind="checkboxProps"
        :key="index"
        :disabled="item.disabled"
        :label="item.value"
      >
        {{ item.label }}
      </ElCheckbox>
    </template>
  </ElCheckboxGroup>
  <template v-else>
    <ElCheckbox
      v-if="type === 'checkbox'"
      v-bind="checkboxProps"
      v-model:modelValue="state"
      :disabled="disabled"
    >
      {{ label }}
    </ElCheckbox>
    <ElCheckboxButton
      v-else-if="type === 'button'"
      v-bind="buttonProps"
      v-model:modelValue="state"
      :disabled="disabled"
    >
      {{ label }}
    </ElCheckboxButton>
    <ElCheckTag
      v-else-if="type === 'tag'"
      v-bind="tagProps"
      v-model:checked="state"
      :disabled="disabled"
    >
      {{ label }}
    </ElCheckTag>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue'
import { ElCheckTag, ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus'
import { get, omit } from 'lodash-es'

import { isFunction } from '@/utils/is'
import { useRuleFormItem } from '@/hooks/component/useFormItem'
import { logError } from '@/utils/log'

interface OptionsItem {
  label: string
  value: string
  disabled?: boolean
}

export default defineComponent({
  name: 'CustomCheckbox',
  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckTag,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Array, Object, String, Number],
    },
    stringValue: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<'checkbox' | 'button' | 'tag'>,
      default: 'checkbox',
    },
    group: {
      type: Boolean,
      default: true,
    },
    /**
     * 适用于单标签显示名称(group为false)
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * 适用于单标签显示禁用状态(group为false)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<OptionsItem[]>>,
      default: null,
    },
    // api 参数
    params: {
      type: Object,
      default: () => {},
    },
    // 支持 xxx.xxx.xx
    resultField: {
      type: String,
      default: '',
    },
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
    disabledField: {
      type: String,
      default: 'disabled',
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
    groupProps: {
      type: Object,
      default: () => {},
    },
    checkboxProps: {
      type: Object,
      default: () => {},
    },
    buttonProps: {
      type: Object,
      default: () => {},
    },
    tagProps: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['optionsChange', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const optionsRef = ref<OptionsItem[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const emitData = ref<any[]>([])

    // 嵌入表单中，只需使用钩子绑定即可执行表单验证
    const [state] = useRuleFormItem(props, 'modelValue', 'change', emitData)

    const getOptions = computed(() => {
      const { labelField, valueField, disabledField, stringValue } = props

      const data = unref(optionsRef).reduce((prev, next: any) => {
        if (next) {
          const value = get(next, valueField)
          prev.push({
            ...omit(next, [labelField, valueField, disabledField]),
            label: get(next, labelField),
            disabled: get(next, disabledField),
            value: stringValue ? `${value}` : value,
          })
        }
        return prev
      }, [] as OptionsItem[])
      return data.length > 0 ? data : props.options
    })

    async function fetchData() {
      const { api } = props
      if (!isFunction(api))
        return

      optionsRef.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          optionsRef.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          optionsRef.value = get(res, props.resultField) || []
        }
        emitChange()
      }
      catch (error) {
        logError(error)
      }
      finally {
        loading.value = false
      }
    }

    function emitChange() {
      emit('optionsChange', unref(getOptions))
    }

    watchEffect(() => {
      fetchData()
    })

    watch(
      () => state.value,
      (v) => {
        emit('update:modelValue', v)
      },
    )

    watch(
      () => props.params,
      () => {
        if (!unref(isFirstLoad)) {
          fetchData()
        }
      },
      { deep: true },
    )

    return {
      state,
      getOptions,
      loading,
    }
  },
})
</script>
