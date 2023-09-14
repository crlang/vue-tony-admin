<template>
  <PageWrapper title="表单联动示例" contentFullHeight>
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #clashA="{ model, field }">
        <el-select
          multiple
          v-model:modelValue="model[field]"
          @change="valueSelectA = model[field]"
          clearable>
          <el-option
            v-for="item in optionsA"
            :key="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :value="item.value" />
        </el-select>
      </template>
      <template #clashB="{ model, field }">
        <el-select
          :options="optionsB"
          multiple
          v-model:modelValue="model[field]"
          @change="valueSelectB = model[field]"
          clearable>
          <el-option
            v-for="item in optionsB"
            :key="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :value="item.value" />
        </el-select>
      </template>
    </BasicForm>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import { cloneDeep } from 'lodash-es';

import { BasicForm, useForm } from '@/components/BasicForm';
import { logLog } from '@/utils/log';
import { useMessage } from '@/hooks/web/useMessage';

import { optionsListApi } from '@/api/demo/select';
import { basicSchemas } from './LinkageForm-data';
import { optionListData } from './formdata';

export default defineComponent({
  components: { ElSelect, ElOption, BasicForm },
  setup() {
    const { createMessage } = useMessage();
    const valueSelectA = ref<string[]>([]);
    const valueSelectB = ref<string[]>([]);

    const [register] = useForm({
      schemas: basicSchemas,
      labelWidth: 200,
      colProps: { span: 16, xl: 12 },
      actionColProps: { span: 16, xl: 12 },
    });

    const optionsA = computed(() => {
      return cloneDeep(unref(optionListData)).map((op) => {
        op.disabled = op.disabled || unref(valueSelectB).indexOf(op.value) !== -1;
        return op;
      });
    });

    const optionsB = computed(() => {
      return cloneDeep(unref(optionListData)).map((op) => {
        op.disabled = op.disabled || unref(valueSelectA).indexOf(op.value) !== -1;
        return op;
      });
    });

    return {
      register,
      basicSchemas,
      optionsListApi,
      optionsA,
      optionsB,
      valueSelectA,
      valueSelectB,
      handleReset: () => {},
      handleSubmit: (values) => {
        logLog(values);
        createMessage.success('提交成功，提交内容请查看控制台');
      },
    };
  },
});
</script>
