<template>
  <ElTree
    ref="TreeSelectRef"
    v-bind="getBindValues"
    v-model:default-checked-keys="state"
    @check-change="handleCheckChange"
    @current-change="handleCurrentChange" />
</template>

<script lang="ts">
import { type PropType, computed, defineComponent, watch, ref, onMounted, unref } from 'vue';
import { ElTree } from 'element-plus';
import { isArray, isFunction } from '@/utils/is';
import { get } from 'lodash-es';
import { logError } from '@/utils/log';
import { useRuleFormItem } from '@/hooks/component/useFormItem';

export default defineComponent({
  name: 'CustomTree',
  components: { ElTree },
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
    afterFetch: { type: Function as PropType<AnyFunction> },
  },
  emits: ['options-change', 'change'],
  setup(props, { attrs, emit }) {
    const optionsRef = ref<Recordable<any>[]>([]);
    const isFirstLoaded = ref<Boolean>(false);
    const loading = ref(false);
    const emitData = ref<any[]>([]);

    // 嵌入表单中，只需使用钩子绑定即可执行表单验证
    // Embedded in the form, just use the hook binding to perform form verification
    const [state, setState] = useRuleFormItem(props, 'modelValue', 'change', emitData);

    const getBindValues = computed(() => {
      const opts = {
        nodeKey: undefined,
        expandOnClickNode: false,
        checkOnClickNode: true,
        showCheckbox: false,
        ...attrs,
        data: unref(optionsRef) || [],
      };

      const aprops: any = attrs?.props;
      if (aprops?.value && !attrs?.nodeKey) {
        opts.nodeKey = aprops.value;
        logError(`CustomTree 的 nodeKey 不存在，已默认修改为${opts.nodeKey}`);
      }

      return opts;
    });

    async function handleFetch() {
      const { api, afterFetch } = props;
      if (!api || !isFunction(api)) return;
      loading.value = true;
      optionsRef.value = [];
      let result;
      try {
        result = await api(props.params);
      } catch (e) {
        console.error(e);
      }
      if (afterFetch && isFunction(afterFetch)) {
        result = afterFetch(result);
      }
      loading.value = false;
      if (!result) return;
      if (!isArray(result)) {
        result = get(result, props.resultField);
      }
      optionsRef.value = (result as Recordable<any>[]) || [];
      isFirstLoaded.value = true;
      emit('options-change', optionsRef.value);
    }

    function handleCheckChange() {
      if (!getBindValues.value?.showCheckbox) {
        return;
      }
    }

    function handleCurrentChange(node) {
      if (getBindValues.value?.showCheckbox) {
        return;
      }
      setState([node.value]);
    }

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoaded) && handleFetch();
      },
      { deep: true },
    );

    watch(
      () => props.immediate,
      (v) => {
        v && !isFirstLoaded.value && handleFetch();
      },
    );

    onMounted(() => {
      props.immediate && handleFetch();
      logError(`CustomTree 组件功能未完善，不建议使用`);
    });

    return { getBindValues, loading, state, handleCheckChange, handleCurrentChange };
  },
});
</script>
