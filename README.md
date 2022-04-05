# Tinymce

当前是拓展组件 Tinymce 富文本编辑器，使用文档参考 `拓展组件->Tinymce 富文本编辑器`

## 注意

为了防止版本不一致导致组件使用出现异常，请严格按照下方的指定版本号按照

## 使用


**1-下载**

只需要克隆或者下载即可快速获得组件

[直接下载 Tinymce zip包](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/main)

或者通过克隆方式

```bash
git clone -b Tinymce https://gitee.com/crlang/vue-tony-admin.git
```

**2-迁移**

复制 `Tinymce` 文件夹 到TonyAdmin组件目录 `src/components`

**3-安装依赖**

```bash
npm install tinymce@^5.10.2

# 或者通过yarn安装

yarn add tinymce@^5.10.2
```

**4-使用例子**

```vue
<template>
  <Tinymce v-model:modelValue="value" @change="handleChange" width="100%" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tinymce } from '@/components/Tinymce';

  export default defineComponent({
    components: { Tinymce },
    setup() {
      const value = ref('hello world!');
      function handleChange(value: string) {
        console.table(value);
      }
      return { handleChange, value };
    },
  });
</script>
```
