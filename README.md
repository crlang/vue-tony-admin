# Markdown

Currently it is an extension component Markdown Editor, use the documentation reference `Extended Components->Markdown`

## Precautions

In order to prevent abnormal use of components due to inconsistent versions, please strictly follow the specified version numbers below.

## Usage


**1-Download**

Just clone or download to get components quickly

[Download Markdown zip now](https://codeload.github.com/crlang/vue-tony-admin/zip/refs/heads/Markdown)

Or Clone

```bash
git clone -b Markdown https://github.com/crlang/vue-tony-admin.git
```

**2-Migrate**

Copy the `Markdown` folder to the TonyAdmin components directory `src/components`

**3-Install**

```bash
npm install showdown@^1.9.1 vditor@^3.8.10

# Or yarn

yarn add showdown@^1.9.1 vditor@^3.8.10
```

**4-Demo**

```vue
<template>
  <Markdown v-model:modelValue="markdownValue" ref="markDownRef" placeholder="这是占位文本" />
</template>

<script lang="ts">
  import type { MarkdownActionType } from '@/components/Markdown';

  import { defineComponent, ref } from 'vue';
  import { Markdown } from '@/components/Markdown';

  export default defineComponent({
    components: { Markdown },
    setup() {
      const markDownRef = ref<Nullable<MarkdownActionType>>(null);
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
