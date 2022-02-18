<template>
  <PageWrapper title="富文本嵌入表单示例">
    <CollapseContainer title="富文本表单">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { BasicForm, FormSchema } from '@/components/Form'
import { CollapseContainer } from '@/components/Container'
import { useMessage } from '@/hooks/web/useMessage'
import { Tinymce } from '@/components/Tinymce'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { CollapseContainer, PageWrapper, BasicForm },
  setup() {
    const { createMessage } = useMessage()

    const schemas: FormSchema[] = [
      {
        field: 'title',
        component: 'ElInput',
        label: 'title',
        defaultValue: 'defaultValue',
        rules: [{ required: true }],
      },
      {
        field: 'tinymce',
        component: 'ElInput',
        label: 'tinymce',
        defaultValue: 'defaultValue',
        rules: [{ required: true }],
        render: ({ model, field }) => {
          return h(Tinymce, {
            modelValue: model[field],
            onChange: (value: string) => {
              model[field] = value
            },
          })
        },
      },
    ]

    function handleSubmit(values:any) {
      createMessage.success(JSON.stringify(values))
    }

    return {
      schemas,
      handleSubmit,
    }
  },
})
</script>
