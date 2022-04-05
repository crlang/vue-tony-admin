# Tinymce

Currently it is an extension component Tinymce Rich Text Editor, use the documentation reference `Extended Components->Tinymce`

## Precautions

In order to prevent abnormal use of components due to inconsistent versions, please strictly follow the specified version numbers below.

## Usage


**1-Download**

Just clone or download to get components quickly

[Download Tinymce zip now](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/Tinymce)

Or Clone

```bash
git clone -b Tinymce https://github.com/crlang/vue-tony-admin.git Tinymce
```

**2-Migrate**

Copy the `Tinymce` folder to the TonyAdmin components directory `src/components`

**3-Install**

```bash
npm install tinymce@^5.10.2

# Or yarn

yarn add tinymce@^5.10.2
```

**4-Demo**

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
