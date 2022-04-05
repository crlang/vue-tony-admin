# Markdown

当前是拓展组件 Markdown 编辑器，使用文档参考 `拓展组件->Markdown 编辑器`

## 注意

为了防止版本不一致导致组件使用出现异常，请严格按照下方的指定版本号按照

## 使用


**1-下载**

只需要克隆或者下载即可快速获得组件

[直接下载 Markdown zip包](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/Markdown)

或者通过克隆方式

```bash
git clone -b Markdown https://gitee.com/crlang/vue-tony-admin.git
```

**2-迁移**

复制 `Markdown` 文件夹 到TonyAdmin组件目录 `src/components`

**3-安装依赖**

```bash
npm install showdown@^1.9.1 vditor@^3.8.10

# 或者通过yarn安装

yarn add showdown@^1.9.1 vditor@^3.8.10
```

**4-使用例子**

```vue
<template>
  <MarkDown v-model:modelValue="markdownValue" ref="markDownRef" placeholder="这是占位文本" />
</template>

<script lang="ts">
  import type { MarkDownActionType } from '@/components/Markdown';

  import { defineComponent, ref } from 'vue';
  import { MarkDown } from '@/components/Markdown';

  export default defineComponent({
    components: { MarkDown },
    setup() {
      const markDownRef = ref<Nullable<MarkDownActionType>>(null);
      const markdownValue = ref(`
# title

# content
`);

      return {
        markdownValue,
        markDownRef,
      };
    },
  });
</script>
```
