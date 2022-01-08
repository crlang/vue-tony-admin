<template>
  <PageWrapper title="MarkDown组件组合Form示例">
    <CollapseContainer title="MarkDown表单">
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
import { BasicForm, FormSchema } from '@/components/Form/index'
import { CollapseContainer } from '@/components/Container/index'
import { useMessage } from '@/hooks/web/useMessage'
import { MarkDown } from '@/components/Markdown'
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
        defaultValue: '标题',
        rules: [{ required: true }],
      },
      {
        field: 'markdown',
        component: 'ElInput',
        label: 'markdown',
        defaultValue: 'defaultValue',
        rules: [{ required: true, trigger: 'blur' }],
        render: ({ model, field }) => {
          return h(MarkDown, {
            value: model[field],
            onChange: (value: string) => {
              model[field] = value
            },
          })
        },
      },
    ]

    function handleSubmit(values:any) {
      createMessage.success('click search,values:' + JSON.stringify(values))
    }

    return {
      schemas,
      handleSubmit,
    }
  },
})
</script>
