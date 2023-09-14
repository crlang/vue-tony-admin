<template>
  <ElTreeSelect
    ref="TreeSelectRef"
    v-bind="getBindValues"
    v-model:model-value="state"
    @check-change="handleCheckChange"
    @current-change="handleCurrentChange" />
</template>

<script lang="ts">
import { type PropType, computed, defineComponent, watch, ref, unref, watchEffect } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { isArray, isFunction } from '@/utils/is';
import { get } from 'lodash-es';
import { EleTreeSelect } from '@/components/ElementPlus';
import { useRuleFormItem } from '@/hooks/component/useFormItem';
import { logError } from '@/utils/log';

interface OptionsItem {
  value: string;
  label: string;
  children?: OptionsItem[];
}

export default defineComponent({
  name: 'CustomTreeSelect',
  components: { ElTreeSelect },
  props: {
    modelValue: {
      type: [Array, String, Number, Object],
    },
    api: { type: Function as PropType<(arg?: Recordable<any>) => Promise<Recordable<any>>> },
    params: { type: Object },
    immediate: {
      type: Boolean,
      default: true,
    },
    resultField: {
      type: String,
      default: '',
    },
    remote: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['options-change', 'change', 'update:modelValue'],
  setup(props, { attrs, emit }) {
    const optionsRef = ref<OptionsItem[]>([]);
    const isFirstLoad = ref<Boolean>(false);
    const loading = ref(false);
    const emitData = ref<any[]>([]);
    const TreeSelectRef = ref();

    // 嵌入表单中，只需使用钩子绑定即可执行表单验证
    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props, 'modelValue', 'change', emitData);

    const getBindValues = computed(() => {
      // if (attrs?.showCheckbox) {
      //   logError('CustomTreeSelect 暂不支持多选');
      // }

      const opts: EleTreeSelect = {
        expandOnClickNode: false,
        checkOnClickNode: true,
        ...attrs,
        data: unref(optionsRef) || [],
        // showCheckbox: false,
      };

      const aprops: any = attrs?.props;
      if (aprops?.value && !attrs?.nodeKey) {
        opts.nodeKey = aprops.value;
        logError(`CustomTreeSelect 的 nodeKey 不存在，已默认修改为${opts.nodeKey}`);
      }

      return opts;
    });

    async function fetchData() {
      const { api } = props;
      if (!isFunction(api)) return;
      loading.value = true;
      optionsRef.value = [];
      let result;
      try {
        result = await api(props.params);
      } catch (e) {
        console.error(e);
      }
      loading.value = false;
      if (!result) return;
      if (!isArray(result)) {
        result = get(result, props.resultField);
      }
      optionsRef.value = (result as OptionsItem[]) || [];
      isFirstLoad.value = true;
      emit('options-change', optionsRef.value);
    }

    function handleCheckChange() {
      if (!getBindValues.value?.showCheckbox) {
        return;
      }
    }

    function handleCurrentChange() {
      if (getBindValues.value?.showCheckbox) {
        return;
      }
    }

    watchEffect(() => {
      optionsRef.value = (props.options || []) as OptionsItem[];
      if (props.remote) {
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
      TreeSelectRef,
      state,
      getBindValues,
      loading,
      handleCheckChange,
      handleCurrentChange,
    };
  },
});
</script>
