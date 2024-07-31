<template>
  <PageWrapper title="WebSocket 示例">
    <ElRow :gutter="24" class="pb-4">
      <ElCol :span="8">
        <ElCard class="mb-4">
          <template #header>
            <div class="flex items-center">
              <span class="mr-4">连接状态:</span>
              <ElTag :type="getTagColor">{{ status }}</ElTag>
            </div>
          </template>
          <ElInput v-model="server" placeholder="Please input" class="input-with-select">
            <template #prepend>服务地址</template>
            <template #append>
              <ElButton :type="getIsOpen ? 'danger' : 'primary'" :loading="status === 'CONNECTING'" @click="toggle">
                {{ getIsOpen ? '关闭连接' : status === 'CONNECTING' ? '连接中...' : '开启连接' }}
              </ElButton>
            </template>
          </ElInput>
        </ElCard>

        <ElCard header="测试">
          <ElInput
            v-model="sendValue"
            maxlength="30"
            placeholder="需要发送到服务器的内容"
            :disabled="!getIsOpen"
            show-word-limit
            :rows="5"
            type="textarea"
          />
          <ElButton
            type="primary"
            block
            class="mt-4"
            :disabled="!getIsOpen"
            @click="handlerSend"
          >
            发送
          </ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="16">
        <ElCard header="消息记录">
          <div class="min-h-85 overflow-auto">
            <ul>
              <li v-for="item in getList" :key="item.time" class="mt-2">
                <div class="flex items-center">
                  <span class="mr-2 text-primary">收到消息:</span>
                  <span>{{ formatToDateTime(item.time) }}</span>
                </div>
                <div>
                  {{ item.res }}
                </div>
              </li>
            </ul>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { ElButton, ElCard, ElCol, ElInput, ElRow, ElTag } from 'element-plus'
import { useWebSocket } from '@vueuse/core'
import { formatToDateTime } from '@/utils/dateUtil'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElInput,
    ElCard,
    ElButton,
    ElTag,
  },
  setup() {
    const state = reactive({
      server: 'ws://localhost:3300/test',
      sendValue: '',
      recordList: [] as { id: number, time: number, res: string }[],
    })

    const { status, data, send, close, open } = useWebSocket(state.server, {
      autoReconnect: false,
      heartbeat: true,
    })

    watchEffect(() => {
      if (data.value) {
        try {
          const res = JSON.parse(data.value)
          state.recordList.push(res)
        }
        catch {
          state.recordList.push({
            res: data.value,
            id: Math.ceil(Math.random() * 1000),
            time: new Date().getTime(),
          })
        }
      }
    })

    const getIsOpen = computed(() => status.value === 'OPEN')
    const getTagColor = computed(() => (getIsOpen.value ? 'success' : 'danger'))

    const getList = computed(() => {
      return [...state.recordList].reverse()
    })

    function handlerSend() {
      send(state.sendValue)
      state.sendValue = ''
    }

    function toggle() {
      if (getIsOpen.value) {
        close()
      }
      else {
        open()
      }
    }
    return {
      status,
      formatToDateTime,
      ...toRefs(state),
      handlerSend,
      getList,
      toggle,
      getIsOpen,
      getTagColor,
    }
  },
})
</script>
