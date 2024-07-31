<template>
  <PageWrapper>
    <template v-for="src in imgList" :key="src">
      <img v-show="false" :src="src">
    </template>
    <BasicTable class="error-handle-table" @register="register">
      <template #toolbar>
        <ElButton type="primary" @click="fireVueError">
          点击触发vue错误
        </ElButton>
        <ElButton type="primary" @click="fireResourceError">
          点击触发资源加载错误
        </ElButton>
        <ElButton type="primary" @click="fireAjaxError">
          点击触发ajax错误
        </ElButton>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue'
import { ElButton } from 'element-plus'
import { cloneDeep } from 'lodash-es'

import { getLogColumns } from './data'
import { useMessage } from '@/hooks/web/useMessage'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { fireErrorApi } from '@/api/demo/error'
import { BasicTable, useTable } from '@/components/BasicTable'

export default defineComponent({
  name: 'ErrorLog',
  components: { ElButton, BasicTable },
  setup() {
    const imgList = ref<string[]>([])

    const errorLogStore = useErrorLogStore()
    const [register, { setTableData }] = useTable({
      title: '错误日志列表',
      columns: getLogColumns(),
    })

    const { createMessage } = useMessage()
    if (import.meta.env.DEV) {
      createMessage.info('只在`/src/settings/projectSetting.ts` 内的useErrorHandle=true时生效')
    }

    function fireVueError() {
      throw new Error('fire vue error!')
    }

    function fireResourceError() {
      imgList.value.push(`${new Date().getTime()}.png`)
    }

    async function fireAjaxError() {
      await fireErrorApi()
    }

    watch(
      () => errorLogStore.getErrorLogInfoList,
      (list) => {
        nextTick(() => {
          setTableData(cloneDeep(list))
        })
      },
      {
        immediate: true,
      },
    )

    return {
      register,
      fireVueError,
      fireResourceError,
      fireAjaxError,
      imgList,
    }
  },
})
</script>
