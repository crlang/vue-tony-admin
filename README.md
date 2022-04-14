# Excel

Currently it is an extension component Excel, use the documentation reference `Extended Components->Excel`

## Precautions

In order to prevent abnormal use of components due to inconsistent versions, please strictly follow the specified version numbers below.

## Usage


**1-Download**

Just clone or download to get components quickly

[Download Excel zip now](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/Excel)

Or Clone

```bash
git clone -b Excel https://github.com/crlang/vue-tony-admin.git Excel
```

**2-Migrate**

Copy the `Excel` folder to the TonyAdmin components directory `src/components`

**3-Install**

```bash
npm install xlsx@^0.17.4

# Or yarn

yarn add xlsx@^0.17.4
```

**4-Demo**

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
