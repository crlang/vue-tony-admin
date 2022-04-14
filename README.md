# QrCode

Currently it is an extension component QrCode, use the documentation reference `Extended Components->QrCode`

## Precautions

In order to prevent abnormal use of components due to inconsistent versions, please strictly follow the specified version numbers below.

## Usage


**1-Download**

Just clone or download to get components quickly

[Download QrCode zip now](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/QrCode)

Or Clone

```bash
git clone -b QrCode https://github.com/crlang/vue-tony-admin.git QrCode
```

**2-Migrate**

Copy the `QrCode` folder to the TonyAdmin components directory `src/components`

**3-Install**

```bash
npm install qrcode@^1.5.0
npm install -D @types/qrcode@^1.4.2

# Or yarn

yarn add qrcode@^1.5.0
yarn add -D @types/qrcode@^1.4.2
```

**4-Demo**

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
