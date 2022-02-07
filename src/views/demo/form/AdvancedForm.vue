<template>
  <PageWrapper title="可折叠表单示例">
    <CollapseContainer title="基础收缩示例">
      <BasicForm @register="register" />
    </CollapseContainer>

    <CollapseContainer
      title="超过3行自动收起，折叠时保留2行"
      class="mt-4">
      <BasicForm @register="register1" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicForm, FormSchema, useForm } from '@/components/Form'
import { CollapseContainer } from '@/components/Container'
import { PageWrapper } from '@/components/Page'

import { UseSchemas } from './data'

export default defineComponent({
  components: { BasicForm, CollapseContainer, PageWrapper },
  setup() {
    const [register] = useForm({
      labelWidth: 120,
      schemas: UseSchemas,
      actionColOptions: {
        span: 24,
      },
      compact: true,
      showAdvancedButton: true,
    })
    const extraSchemas: FormSchema[] = []
    for (let i = 14; i < 30; i++) {
      extraSchemas.push({
        field: 'field' + i,
        component: 'ElInput',
        label: '字段' + i,
        colProps: {
          span: 8,
        },
      })
    }
    const [register1] = useForm({
      labelWidth: 120,
      schemas: [
        ...UseSchemas,
        { field: '', component: 'ElDivider', label: '更多字段' },
        ...extraSchemas,
      ],
      actionColOptions: {
        span: 24,
      },
      compact: true,
      showAdvancedButton: true,
      alwaysShowLines: 2,
    })
    return {
      register,
      register1,
    }
  },
})
</script>
