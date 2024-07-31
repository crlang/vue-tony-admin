<template>
  <ElCascaderPanel
    v-if="isPanel"
    v-bind="getPanelBindValues"
    v-model:model-value="state"
    :props="lazyProps"
    :options="getOptions"
  />
  <ElCascader
    v-else
    v-bind="getBindValues"
    v-model:model-value="state"
    :options="getOptions"
    :props="lazyProps"
    @visible-change="handleVisibleChange"
  />
</template>

<script lang="ts">
import type { CascaderOption } from 'element-plus'
import type { PropType } from 'vue'

import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue'
import { ElCascader, ElCascaderPanel } from 'element-plus'
import { get, omit } from 'lodash-es'
import type { EleCascader, EleCascaderPanel } from '@/components/ElementPlus'
import { isFunction, isObject } from '@/utils/is'
import { useRuleFormItem } from '@/hooks/component/useFormItem'
import { logError } from '@/utils/log'

interface OptionsItem extends CascaderOption {
  value: string
  label: string
  loading?: boolean
  leaf?: boolean
  disabled?: boolean
  children?: OptionsItem[]
}

export default defineComponent({
  name: 'CustomCascader',
  components: {
    ElCascader,
    ElCascaderPanel,
  },
  props: {
    modelValue: {
      type: Array,
    },
    api: {
      type: Function as PropType<(arg?: Recordable<any>) => Promise<OptionsItem[]>>,
      default: null,
    },
    // api 参数
    params: {
      type: [Object, String, Number],
      default: null,
    },
    isPanel: {
      type: Boolean,
      default: false,
    },
    stringValue: {
      type: Boolean,
      default: false,
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
    childrenField: {
      type: String,
      default: 'children',
    },
    leafField: {
      type: String,
      default: 'leaf',
    },
    remote: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyParamsKey: {
      type: String,
      default: '',
    },
    lazyValueKey: {
      type: String,
      default: '',
    },
    // 是否有下级，默认是
    isLeaf: {
      type: Function as PropType<(arg: Recordable<any>) => boolean>,
      default: null,
    },
    displayRenderArray: {
      type: Array,
    },
  },
  emits: ['change', 'optionsChange', 'update:modelValue'],
  setup(props, { emit, attrs }) {
    const optionsRef = ref<OptionsItem[]>([])
    const loading = ref<boolean>(false)
    const emitData = ref<any[]>([])
    const isFirstLoad = ref(true)
    const isFirstShow = ref(false)

    // 嵌入表单中，只需使用钩子绑定即可执行表单验证
    const [state] = useRuleFormItem(props, 'modelValue', 'change', emitData)

    const getBindValues = computed((): EleCascader => {
      const opts = {
        clearable: true,
        ...attrs,
        options: [],
        props: undefined,
      }

      return opts
    })

    const getPanelBindValues = computed(() => {
      const opts = {
        ...attrs,
        props: unref(getBindValues),
      }

      return opts as EleCascaderPanel
    })

    const lazyProps = {
      lazy: true,
      lazyLoad(node, resolve) {
        const { lazyValueKey } = props
        if (!lazyValueKey) {
          logError('When remote of CustomCascader is true, lazyValueKey is required.')
        }
        loadApiData(node[lazyValueKey])
          .then((res) => {
            resolve(res)
          })
          .catch(() => {
            resolve(undefined)
          })
        node.loading = false
      },
    }

    const getOptions = computed(() => {
      let data: OptionsItem[] = []
      const list = unref(optionsRef)
      if (list?.length) {
        data = generatorOptions(list)
      }

      return data
    })

    function generatorOptions(options: any[]): OptionsItem[] {
      const { labelField, valueField, stringValue, childrenField, disabledField, leafField, isLeaf } = props
      return options.reduce((prev, next: Recordable<any>) => {
        if (next) {
          const label = next[labelField]
          const value = next[valueField]
          const leaf = isFunction(isLeaf) ? isLeaf(next) : next[leafField] || false
          const disabled = next[disabledField]
          const item = {
            ...omit(next, [labelField, valueField]),
            label,
            leaf,
            disabled,
            value: stringValue ? `${value}` : value,
          }
          const children = Reflect.get(next, childrenField)
          if (children) {
            Reflect.set(item, childrenField, generatorOptions(children))
          }
          prev.push(item)
        }
        return prev
      }, [] as OptionsItem[])
    }

    async function fetchData() {
      const { api, params = null, resultField } = props
      if (!isFunction(api))
        return

      let apiParams: object | string | undefined
      if (params) {
        apiParams = isObject(params) ? { ...params } : params
      }

      optionsRef.value = []
      try {
        loading.value = true
        const res = await api(apiParams)

        if (Array.isArray(res)) {
          optionsRef.value = res
          emitChange()
          return
        }
        if (resultField) {
          optionsRef.value = get(res, resultField) || []
        }
        emitChange()
      }
      catch (error) {
        optionsRef.value = []
        logError(error)
      }
      finally {
        loading.value = false
      }
    }

    async function loadApiData(lvk) {
      const { api, params = null, resultField, lazyParamsKey } = props
      let nodes: OptionsItem[] | undefined

      if (!isFunction(api)) {
        return nodes
      }

      let apiParams: object | string | undefined

      if (lazyParamsKey) {
        apiParams = (isObject(params) ? { ...params } : params) || {}
        apiParams[lazyParamsKey] = lvk
      }
      else {
        apiParams = lvk
      }

      try {
        const res = await api(apiParams)
        if (Array.isArray(res)) {
          nodes = generatorOptions(res)
        }
        else {
          if (resultField) {
            nodes = generatorOptions(get(res, resultField) || [])
          }
        }
      }
      catch (e) {
        nodes = []
        logError(e)
      }

      return nodes
    }

    function emitChange() {
      emit('optionsChange', unref(getOptions))
    }

    function handleVisibleChange(v) {
      if (v) {
        isFirstShow.value = true
      }
    }

    watchEffect(() => {
      optionsRef.value = (attrs.options || []) as OptionsItem[]
      if (props.remote && !props.lazy) {
        fetchData()
      }
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
      getBindValues,
      getPanelBindValues,
      lazyProps,
      getOptions,
      loading,
      handleVisibleChange,
    }
  },
})
</script>
