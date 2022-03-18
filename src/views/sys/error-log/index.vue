<template>
  <div class="p-4">
    <template
      v-for="src in imgList"
      :key="src">
      <img
        :src="src"
        v-show="false" />
    </template>
    <BasicTable
      @register="register"
      class="error-handle-table">
      <template #toolbar>
        <el-button
          @click="fireVueError"
          type="primary">
          {{ t('sys.errorLog.fireVueError') }}
        </el-button>
        <el-button
          @click="fireResourceError"
          type="primary">
          {{ t('sys.errorLog.fireResourceError') }}
        </el-button>
        <el-button
          @click="fireAjaxError"
          type="primary">
          {{ t('sys.errorLog.fireAjaxError') }}
        </el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import { ElButton } from 'element-plus'
import { useMessage } from '@/hooks/web/useMessage'
import { useI18n } from '@/hooks/web/useI18n'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { fireErrorApi } from '@/api/demo/error'
import { getLogColumns } from './data'
import { BasicTable, useTable } from '@/components/Table'
import { cloneDeep } from 'lodash-es'

const imgList = ref<string[]>([])

const { t } = useI18n()
const errorLogStore = useErrorLogStore()
const [register, { setTableData }] = useTable({
  title: t('sys.errorLog.tableTitle'),
  columns: getLogColumns(),
})

watch(
  () => errorLogStore.getErrorLogInfoList,
  (list) => {
    nextTick(() => {
      setTableData(cloneDeep(list))
    })
  },
  {
    immediate: true,
  }
)
const { createMessage } = useMessage()
if (import.meta.env.DEV) {
  createMessage.info(t('sys.errorLog.enableMessage'))
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
</script>
