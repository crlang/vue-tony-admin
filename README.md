# MarkDown

Currently it is an extension component MarkDown Editor, use the documentation reference `Extended Components->MarkDown`

## Precautions

In order to prevent abnormal use of components due to inconsistent versions, please strictly follow the specified version numbers below.

## Usage


**1-Download**

Just clone or download to get components quickly

[Download MarkDown zip now](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/MarkDown)

Or Clone

```bash
git clone -b MarkDown https://gitee.com/crlang/vue-tony-admin.git
```

**2-Migrate**

Copy the `MarkDown` folder to the TonyAdmin components directory `src/components`

**3-Install**

```bash
npm install tinymce@^5.10.2

# Or yarn

yarn add tinymce@^5.10.2
```

**4-Demo**

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
