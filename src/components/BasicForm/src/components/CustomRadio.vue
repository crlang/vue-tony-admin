<template>
  <ElRadioGroup v-if="group" v-bind="groupProps" v-model:modelValue="state">
    <template v-if="type === 'button'">
      <ElRadioButton
        v-bind="buttonProps"
        v-for="(item, index) in getOptions"
        :key="index"
        :disabled="item.disabled"
        :label="item.value">{{ item.label }}</ElRadioButton>
    </template>
    <template v-else>
      <ElRadio
        v-bind="radioProps"
        v-for="(item, index) in getOptions"
        :key="index"
        :disabled="item.disabled"
        :label="item.value">{{ item.label }}</ElRadio>
    </template>
  </ElRadioGroup>
  <template v-else>
    <ElRadioButton
      v-if="type === 'button'"
      v-bind="buttonProps"
      v-model:modelValue="state"
      :disabled="disabled">{{ label }}</ElRadioButton>
    <ElRadio
      v-else
      v-bind="radioProps"
      v-model:modelValue="state"
      :disabled="disabled">{{ label }}</ElRadio>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed, unref, watch } from 'vue';
import { ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus';
import { get, omit } from 'lodash-es';

import { isFunction } from '@/utils/is';
import { useRuleFormItem } from '@/hooks/component/useFormItem';
import { logError } from '@/utils/log';

interface OptionsItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export default defineComponent({
  name: 'CustomRadio',
  components: {
    ElRadio,
    ElRadioButton,
    ElRadioGroup,
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
    // api params
    params: {
      type: Object,
      default: () => {},
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
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
    groupProps: {
      type: Object,
      default: () => {},
    },
    radioProps: {
      type: Object,
      default: () => {},
    },
    buttonProps: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['options-change', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const optionsRef = ref<OptionsItem[]>([]);
    const loading = ref(false);
    const isFirstLoad = ref(true);
    const emitData = ref<any[]>([]);

    // 嵌入表单中，只需使用钩子绑定即可执行表单验证
    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props, 'modelValue', 'change', emitData);

    const getOptions = computed(() => {
      const { labelField, valueField, disabledField, stringValue } = props;

      const data = unref(optionsRef).reduce((prev, next: any) => {
        if (next) {
          const label = get(next, labelField);
          const value = get(next, valueField);
          const disabled = get(next, disabledField);
          prev.push({
            ...omit(next, [labelField, valueField, disabledField]),
            label,
            disabled,
            value: stringValue ? `${value}` : value,
          });
        }
        return prev;
      }, [] as OptionsItem[]);
      return data.length > 0 ? data : props.options;
    });

    async function fetchData() {
      const { api } = props;
      if (!isFunction(api)) return;

      optionsRef.value = [];
      try {
        loading.value = true;
        const res = await api(props.params);
        if (Array.isArray(res)) {
          optionsRef.value = res;
          emitChange();
          return;
        }
        if (props.resultField) {
          optionsRef.value = get(res, props.resultField) || [];
        }
        emitChange();
      } catch (error) {
        logError(error);
      } finally {
        loading.value = false;
      }
    }

    function emitChange() {
      emit('options-change', unref(getOptions));
    }

    watchEffect(() => {
      fetchData();
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
      getOptions,
      loading,
    };
  },
});
</script>
