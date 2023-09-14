<template>
  <ElColorPicker v-bind="getBindValues" v-model:modelValue="state" />
</template>

<script lang="ts">
import { defineComponent, computed, watch, watchEffect, ref, unref } from 'vue';
import { ElColorPicker } from 'element-plus';

import { useRuleFormItem } from '@/hooks/component/useFormItem';
import { isFunction, isObject } from '@/utils/is';
import { get } from 'lodash-es';

export default defineComponent({
  name: 'CustomColorPicker',
  components: { ElColorPicker },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<string[]>>,
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
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    immediate: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change', 'options-change'],
  setup(props, { attrs, emit }) {
    const optionsRef = ref<string[]>([]);
    const isFirstLoad = ref(true);

    const [state] = useRuleFormItem(props, 'modelValue', 'change');

    const getBindValues = computed(() => {
      const opts = {
        ...attrs,
        predefine: attrs?.predefine || optionsRef.value || undefined,
      };

      return opts;
    });

    async function fetchData() {
      const { api, params = null, resultField } = props;
      if (!isFunction(api)) return;

      let apiParams: Object | String | undefined;
      if (params) {
        apiParams = isObject(params) ? { ...params } : params;
      }

      optionsRef.value = [];
      try {
        const res = await api(apiParams);
        if (Array.isArray(res)) {
          optionsRef.value = res;
          emitChange();
          return;
        }
        if (resultField) {
          optionsRef.value = get(res, resultField) || [];
        }
        emitChange();
      } catch (error) {
        optionsRef.value = [];
      }
    }

    function emitChange() {
      emit('options-change', unref(optionsRef));
    }

    watchEffect(() => {
      optionsRef.value = props.options || [];
      if (props.immediate) {
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

    return { getBindValues, state };
  },
});
</script>
