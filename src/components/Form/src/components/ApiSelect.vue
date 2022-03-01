<template>
  <ElSelect
    @visible-change="handleFetch"
    v-bind="$attrs"
    clearable
    @change="handleChange"
    :suffix-icon="getSelectIcon"
    :no-data-text="getSelectEmpty"
    v-model:modelValue="state">
    <ElOption
      v-for="item in getOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </ElSelect>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect, computed, unref, watch, onMounted } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { isFunction } from '@/utils/is'
import { useRuleFormItem } from '@/hooks/component/useFormItem'
import { get, omit } from 'lodash-es'
import { ArrowUp, Loading } from '@element-plus/icons'
import { useI18n } from '@/hooks/web/useI18n'

type OptionsItem = { label: string; value: string; disabled?: boolean }

export default defineComponent({
  name: 'ApiSelect',
  components: { ElSelect, ElOption },
  inheritAttrs: false,
  props: {
    modelValue: [Array, Object, String, Number],
    numberToString: { type: Boolean },
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
      default: null,
    },
    // api params
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    // support xxx.xxx.xx
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
    immediate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['option-change', 'change'],
  setup(props, { emit }) {
    const options = ref<OptionsItem[]>([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    const emitValue = ref<any>('')
    const { t } = useI18n()

    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props)

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props

      return unref(options).reduce((prev, next: Recordable) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value,
          })
        }
        return prev
      }, [] as OptionsItem[])
    })
    const getSelectIcon = computed(() => {
      if (unref(loading)) {
        return Loading
      } else {
        return ArrowUp
      }
    })
    const getSelectEmpty = computed(() => {
      if (unref(loading)) {
        return t('component.form.apiSelectNotFound')
      } else {
        return t('common.emptyText')
      }
    })

    watchEffect(() => {
      props.immediate && fetch()
    })

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true }
    )

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api)) return
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
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
      }
    }

    async function handleFetch() {
      if (!props.immediate && unref(isFirstLoad)) {
        await fetch()
        isFirstLoad.value = false
      }
    }

    function emitChange() {
      emit('option-change', unref(getOptions))
    }

    function handleChange(v) {
      emitValue.value = v
    }

    onMounted(() => {
      handleFetch()
    })

    return { state, getOptions, loading, getSelectIcon, getSelectEmpty, t, handleFetch, handleChange }
  },
})
</script>
