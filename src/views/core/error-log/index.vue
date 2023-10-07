<template>
  <PageWrapper>
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" />
    </template>
    <BasicTable @register="register" class="error-handle-table">
      <template #toolbar>
        <el-button @click="fireVueError" type="primary">点击触发vue错误</el-button>
        <el-button @click="fireResourceError" type="primary">点击触发资源加载错误</el-button>
        <el-button @click="fireAjaxError" type="primary">点击触发ajax错误</el-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, watch, ref, nextTick } from 'vue';
import { ElButton } from 'element-plus';
import { cloneDeep } from 'lodash-es';

import { useMessage } from '@/hooks/web/useMessage';
import { useErrorLogStore } from '@/store/modules/errorLog';
import { fireErrorApi } from '@/api/demo/error';
import { BasicTable, useTable } from '@/components/BasicTable';

import { getLogColumns } from './data';

export default defineComponent({
  name: 'ErrorLog',
  components: { ElButton, BasicTable },
  setup() {
    const imgList = ref<string[]>([]);

    const errorLogStore = useErrorLogStore();
    const [register, { setTableData }] = useTable({
      title: '错误日志列表',
      columns: getLogColumns(),
    });

    const { createMessage } = useMessage();
    if (import.meta.env.DEV) {
      createMessage.info('只在`/src/settings/projectSetting.ts` 内的useErrorHandle=true时生效');
    }

    function fireVueError() {
      throw new Error('fire vue error!');
    }

    function fireResourceError() {
      imgList.value.push(`${new Date().getTime()}.png`);
    }

    async function fireAjaxError() {
      await fireErrorApi();
    }

    watch(
      () => errorLogStore.getErrorLogInfoList,
      (list) => {
        nextTick(() => {
          setTableData(cloneDeep(list));
        });
      },
      {
        immediate: true,
      },
    );

    return {
      register,
      fireVueError,
      fireResourceError,
      fireAjaxError,
      imgList,
    };
  },
});
</script>
