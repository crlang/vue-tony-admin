# Excel

当前是拓展组件 Excel 表格导入导出，使用文档参考 `拓展组件->Excel 表格导入导出`

## 注意

为了防止版本不一致导致组件使用出现异常，请严格按照下方的指定版本号按照

## 使用


**1-下载**

只需要克隆或者下载即可快速获得组件

[直接下载 Excel zip包](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/Excel)

或者通过克隆方式

```bash
git clone -b Excel https://github.com/crlang/vue-tony-admin.git Excel
```

**2-迁移**

复制 `Excel` 文件夹 到TonyAdmin组件目录 `src/components`

**3-安装依赖**

```bash
npm install xlsx@^0.17.4

# 或者通过yarn安装

yarn add xlsx@^0.17.4
```

**4-使用例子**

```vue
<template>
  <ImpExcel @success="loadDataSuccess">
    <Button>导入Excel</Button>
  </ImpExcel>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ImpExcel, ExcelData } from '@/components/Excel';

  export default defineComponent({
    components: { ImpExcel },
    setup() {
      function loadDataSuccess(excelDataList: ExcelData[]) {
        console.table(excelDataList);
      }

      return {
        loadDataSuccess,
      };
    },
  });
</script>
```
