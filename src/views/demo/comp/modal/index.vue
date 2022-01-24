<template>
  <PageWrapper title="modal组件使用示例">
    <el-alert
      content="使用 useModal 进行弹窗操作，默认可以拖动，可以通过 draggable
    参数进行控制是否可以拖动/全屏，并演示了在Modal内动态加载内容并自动调整高度"
      show-icon
    />
    <el-button
      type="primary"
      @click="openModalLoading">
      打开弹窗,加载动态数据并自动调整高度(默认可以拖动/全屏)
    </el-button>

    <el-alert
      content="内外同时同时显示隐藏"
      show-icon />
    <el-button
      type="primary"
      @click="openModal2"> 打开弹窗 </el-button>
    <el-alert
      content="自适应高度"
      show-icon />
    <el-button
      type="primary"
      @click="openModal3"> 打开弹窗 </el-button>

    <el-alert
      content="内外数据交互"
      show-icon />
    <el-button
      type="primary"
      @click="send"> 打开弹窗并传递数据 </el-button>

    <Modal1 @register="register1" />
    <Modal2 @register="register2" />
    <Modal3 @register="register3" />
    <Modal4 @register="register4" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElAlert, ElButton } from 'element-plus'
import { useModal } from '@/components/Modal'
import Modal1 from './Modal1.vue'
import Modal2 from './Modal2.vue'
import Modal3 from './Modal3.vue'
import Modal4 from './Modal4.vue'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { ElAlert, ElButton, Modal1, Modal2, Modal3, Modal4, PageWrapper },
  setup() {
    const [register1, { openModal: openModal1, setModalProps }] = useModal()
    const [register2, { openModal: openModal2 }] = useModal()
    const [register3, { openModal: openModal3 }] = useModal()
    const [register4, { openModal: openModal4 }] = useModal()
    const userData = ref<any>(null)

    function send() {
      openModal4(true, {
        data: 'content',
        info: 'Info',
      })
    }

    function openModalLoading() {
      openModal1(true)
      setModalProps({ loading: true })
      setTimeout(() => {
        setModalProps({ loading: false })
      }, 2000)
    }

    return {
      register1,
      openModal1,
      register2,
      openModal2,
      register3,
      openModal3,
      register4,
      openModal4,
      userData,
      send,
      openModalLoading,
    }
  },
})
</script>
