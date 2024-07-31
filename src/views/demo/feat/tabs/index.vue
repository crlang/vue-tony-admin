<template>
  <PageWrapper title="标签页操作示例">
    <CollapseContainer title="在下面输入框输入文本,切换后回来内容会保存">
      <ElAlert show-icon type="info" title="该操作不会影响页面标题，仅修改Tab标题" />
      <div class="mt-2 flex flex-grow-0">
        <ElButton class="mr-2" type="primary" @click="setTabTitle">设置Tab标题</ElButton>
        <ElInput v-model="title" placeholder="请输入" class="mr-4 w-12" />
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="标签页操作">
      <ElButton plain class="mr-2" @click="closeAll">关闭所有</ElButton>
      <ElButton plain class="mr-2" @click="closeLeft">关闭左侧</ElButton>
      <ElButton plain class="mr-2" @click="closeRight">关闭右侧</ElButton>
      <ElButton plain class="mr-2" @click="closeOther">关闭其他</ElButton>
      <ElButton plain class="mr-2" @click="closeCurrent">关闭当前</ElButton>
      <ElButton plain class="mr-2" @click="refreshPage">刷新当前</ElButton>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElAlert, ElButton, ElInput } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useTabs } from '@/hooks/web/useTabs'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'TabsDemo',
  components: { ElInput, ElAlert, ElButton, CollapseContainer },
  setup() {
    const title = ref<string>('')
    const { closeAll, closeLeft, closeRight, closeOther, closeCurrent, refreshPage, setTitle } = useTabs()
    const { createMessage } = useMessage()
    function setTabTitle() {
      if (title.value) {
        setTitle(title.value)
      }
      else {
        createMessage.error('请输入要设置的Tab标题！')
      }
    }
    return {
      closeAll,
      closeLeft,
      closeRight,
      closeOther,
      closeCurrent,
      refreshPage,
      setTabTitle,
      title,
    }
  },
})
</script>
