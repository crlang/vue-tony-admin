# QrCode

当前是拓展组件 QrCode 二维码生成器，使用文档参考 `拓展组件->QrCode 二维码生成器`

## 注意

为了防止版本不一致导致组件使用出现异常，请严格按照下方的指定版本号按照

## 使用


**1-下载**

只需要克隆或者下载即可快速获得组件

[直接下载 QrCode zip包](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/QrCode)

或者通过克隆方式

```bash
git clone -b QrCode https://github.com/crlang/vue-tony-admin.git QrCode
```

**2-迁移**

复制 `QrCode` 文件夹 到TonyAdmin组件目录 `src/components`

**3-安装依赖**

```bash
npm install qrcode@^1.5.0
npm install -D @types/qrcode@^1.4.2

# 或者通过yarn安装

yarn add qrcode@^1.5.0
yarn add -D @types/qrcode@^1.4.2
```

**4-使用例子**

```vue
<template>
  <QrCode :value="qrCodeUrl" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { QrCode } from '@/components/Qrcode';

  export default defineComponent({
    components: { QrCode },
    setup() {
      const qrCodeUrl = 'https://www.crlang.com';

      return {
        qrCodeUrl,
      };
    },
  });
</script>
```
