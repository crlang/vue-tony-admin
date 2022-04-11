<template>
  <PageWrapper title="表单增删示例">
    <CollapseContainer title="表单增删">
      <BasicForm
        @register="register"
        @submit="handleSubmit">
        <template #add="{ field }">
          <Button
            v-if="Number(field) === 0"
            @click="add">+</Button>
          <Button
            v-if="field > 0"
            @click="del(field)">-</Button>
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BasicForm, useForm } from '@/components/Form'
import { CollapseContainer } from '@/components/Container'
import { PageWrapper } from '@/components/Page'
import { Button } from '@/components/Button'

export default defineComponent({
  components: { CollapseContainer, PageWrapper, BasicForm, Button },
  setup() {
    const [register, { appendSchemaByField, removeSchemaByField, validate }] = useForm({
      schemas: [
        {
          field: 'field0a',
          component: 'ElInput',
          label: '字段0',
          colProps: {
            span: 8,
          },
          required: true,
        },
        {
          field: 'field0b',
          component: 'ElInput',
          label: '字段0',
          colProps: {
            span: 8,
          },
          required: true,
        },
        {
          field: '0',
          component: 'ElInput',
          label: ' ',
          colProps: {
            span: 8,
          },
          slot: 'add',
        },
      ],
      labelWidth: 100,
      actionColOptions: { span: 24 },
    })

    async function handleSubmit() {
      try {
        await validate()
      } catch (e) {
        // --
      }
    }

    const n = ref(1)

    function add() {
      appendSchemaByField(
        {
          field: `field${n.value}a`,
          component: 'ElInput',
          label: '字段' + n.value,
          colProps: {
            span: 8,
          },
          required: true,
        },
        ''
      )
      appendSchemaByField(
        {
          field: `field${n.value}b`,
          component: 'ElInput',
          label: '字段' + n.value,
          colProps: {
            span: 8,
          },
          required: true,
        },
        ''
      )

      appendSchemaByField(
        {
          field: `${n.value}`,
          component: 'ElInput',
          label: ' ',
          colProps: {
            span: 8,
          },
          slot: 'add',
        },
        ''
      )
      n.value++
    }

    function del(field) {
      removeSchemaByField([`field${field}a`, `field${field}b`, `${field}`])
      n.value--
    }

    return { register, handleSubmit, add, del }
  },
})
</script>
