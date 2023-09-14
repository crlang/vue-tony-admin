<template>
  <ElSelect v-bind="getBindValues" @visible-change="handleFetch" v-model:model-value="state">
    <template v-if="groupOption">
      <ElOptionGroup
        v-for="(group, gindex) in getOptions"
        :label="group.label"
        :disabled="group.disabled"
        :key="`group-${gindex}`">
        <ElOption
          v-for="(item, index) in group.options"
          :key="`option-${index}`"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled" />
      </ElOptionGroup>
    </template>
    <template v-else>
      <ElOption
        v-for="(item, index) in getOptions"
        :key="`option-${index}`"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled" />
    </template>
  </ElSelect>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect, computed, unref, watch } from 'vue';
import { ElSelect, ElOption, ElOptionGroup } from 'element-plus';
import { isFunction, isNumber, isObject, isString } from '@/utils/is';
import { useRuleFormItem } from '@/hooks/component/useFormItem';
import { get } from 'lodash-es';
import { EleSelect } from '@/components/ElementPlus';
import { logError } from '@/utils/log';
// import { Loading } from '@element-plus/icons-vue';

interface OptionsItem {
  label: string;
  value: string | number | boolean | Record<string, any>;
  disabled?: boolean;
  options?: OptionsItem[];
}

export default defineComponent({
  name: 'CustomSelect',
  components: {
    ElSelect,
    ElOption,
    ElOptionGroup,
    // Loading,
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
    api: {
      type: Function as PropType<(arg?: any) => Promise<OptionsItem[]>>,
      default: null,
    },
    // api params
    params: {
      type: [Object, String, Number],
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
    disabledField: {
      type: String,
      default: 'disabled',
    },
    childrenField: {
      type: String,
      default: 'options',
    },
    immediate: {
      type: Boolean,
      default: true,
    },
    alwaysLoad: {
      type: Boolean,
      default: false,
    },
    groupOption: {
      type: Boolean,
      default: false,
    },
    remoteParamsKey: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['options-change', 'change', 'update:modelValue'],
  setup(props, { emit, attrs }) {
    const optionsRef = ref<OptionsItem[]>([]);
    const loading = ref(false);
    const isFirstLoad = ref(true);
    const emitData = ref<any[]>([]);
    const filterKeyword = ref('');

    // 嵌入表单中，只需使用钩子绑定即可执行表单验证
    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props, 'modelValue', 'change', emitData);

    const getBindValues = computed((): EleSelect => {
      const opts = {
        clearable: true,
        filterable: !attrs?.remote,
        ...attrs,
        remoteMethod: getRemoteMethod,
      };

      return opts;
    });

    const getOptions = computed(() => {
      const { labelField = 'label', valueField = 'value', disabledField = 'disabled', childrenField = 'options', stringValue } = props;

      const data: OptionsItem[] = [];
      const list = unref(optionsRef);
      if (list?.length) {
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          const value = isString(item) || isNumber(item) ? item : get(item, valueField);
          const label = isString(item) || isNumber(item) ? item : get(item, labelField);
          const disabled = get(item, disabledField);
          const options: OptionsItem[] | undefined = get(item, childrenField);

          if (options?.length) {
            options.forEach((k) => {
              k.label = k[labelField];
              k.value = stringValue ? `${k[valueField]}` : k[valueField];
              k.disabled = k[disabledField];
            });
          }

          data.push({
            label,
            disabled,
            options,
            value: stringValue ? `${value}` : value,
          });
        }
      }

      return data;
    });

    async function fetchData() {
      const { api, params = null, remoteParamsKey, resultField } = props;
      if (!isFunction(api)) return;

      let apiParams: Object | String | undefined;
      if (attrs?.remote) {
        if (remoteParamsKey) {
          apiParams = (isObject(params) ? { ...params } : params) || {};
          apiParams[remoteParamsKey] = filterKeyword.value;
        } else {
          apiParams = filterKeyword.value;
        }
      } else {
        if (params) {
          apiParams = isObject(params) ? { ...params } : params;
        }
      }

      optionsRef.value = [];
      try {
        loading.value = true;
        const res = await api(apiParams);
        if (Array.isArray(res)) {
          optionsRef.value = res;
        } else {
          if (resultField) {
            optionsRef.value = get(res, resultField) || [];
          }
        }

        emitChange();
      } catch (error) {
        optionsRef.value = [];
        logError(error);
      } finally {
        loading.value = false;
      }
    }

    async function handleFetch(visible) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetchData();
        } else if (!props.immediate && unref(isFirstLoad)) {
          await fetchData();
          isFirstLoad.value = false;
        }
      }
    }

    function getRemoteMethod(query) {
      const { remote } = unref(getBindValues);
      if (!remote) return;

      if (query === '') {
        optionsRef.value = [];
        return;
      }

      filterKeyword.value = query;

      fetchData();
    }

    function emitChange() {
      emit('options-change', unref(getOptions));
    }

    watchEffect(() => {
      optionsRef.value = props.options || [];
      // todo 处理 alwaysLoad
      if (props.immediate && !props.alwaysLoad) {
        fetchData();
      }
    });

    watch(
      () => state.value,
      (v) => {
        emit('update:modelValue', v);
      },
    );

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetchData();
      },
      { deep: true },
    );

    return {
      state,
      getBindValues,
      getOptions,
      loading,
      handleFetch,
    };
  },
});
</script>
