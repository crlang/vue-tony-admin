<template>
  <PageWrapper
    title="代码编辑器组件示例"
    contentFullHeight
    fixedHeight
    contentBackground>
    <template #footer>
      <el-space size="medium">
        <el-button
          @click="showData"
          type="primary">获取数据</el-button>
        <el-radio-group
          button-style="solid"
          v-model="modeValue"
          @change="handleModeChange">
          <el-radio label="application/json">json数据</el-radio>
          <el-radio label="htmlmixed">html代码</el-radio>
          <el-radio label="javascript">javascript代码</el-radio>
        </el-radio-group>
      </el-space>
    </template>
    <CodeEditor
      v-model="value"
      :mode="modeValue" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref, h } from 'vue'
import { ElButton, ElSpace, ElRadio, ElRadioGroup } from 'element-plus'
import { CodeEditor, JsonPreview, MODE } from '@/components/CodeEditor'
import { PageWrapper } from '@/components/Page'
import { useMessage } from '@/hooks/web/useMessage'

const jsonData =
  '{"name":"BeJson","url":"http://www.xxx.com","page":88,"isNonProfit":true,"address":{"street":"科技园路.","city":"江苏苏州","country":"中国"},"links":[{"name":"Google","url":"http://www.xxx.com"},{"name":"Baidu","url":"http://www.xxx.com"},{"name":"SoSo","url":"http://www.xxx.com"}]}'

const jsData = `
      (() => {
        var htmlRoot = document.getElementById('htmlRoot');
        var theme = window.localStorage.getItem('__APP__DARK__MODE__');
        if (htmlRoot && theme) {
          htmlRoot.setAttribute('data-theme', theme);
          theme = htmlRoot = null;
        }
      })();
  `

const htmlData = `
     <!DOCTYPE html>
<html lang="en" id="htmlRoot">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0"
    />
    <title><%= title %></title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="app">
    </div>
  </body>
</html>
  `
export default defineComponent({
  components: {
    ElSpace,
    ElButton,
    ElRadio,
    ElRadioGroup,
    CodeEditor,
    PageWrapper,
  },

  setup() {
    const modeValue = ref<MODE>(MODE.JSON)
    const value = ref(jsonData)
    const { createInfoModal } = useMessage()

    function handleModeChange(e: ChangeEvent) {
      const mode = e.target.value
      if (mode === MODE.JSON) {
        value.value = jsonData
        return
      }
      if (mode === MODE.HTML) {
        value.value = htmlData
        return
      }
      if (mode === MODE.JS) {
        value.value = jsData
        return
      }
    }

    function showData() {
      if (unref(modeValue) === 'application/json') {
        createInfoModal({
          title: '编辑器当前值',
          content: h(JsonPreview, { data: JSON.parse(value.value) }),
        })
      } else {
        createInfoModal({ title: '编辑器当前值', content: value.value })
      }
    }

    return { value, modeValue, handleModeChange, showData }
  },
})
</script>
