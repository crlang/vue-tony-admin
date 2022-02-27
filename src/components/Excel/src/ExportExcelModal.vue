<template>
  <BasicModal
    v-bind="$attrs"
    :title="t('component.excel.exportModalTitle')"
    @ok="handleOk"
    @register="registerModal">
    <div class="p-4">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :showActionButtonGroup="false"
        @register="registerForm" />
    </div>
  </BasicModal>
</template>

<script lang="ts">
import type { ExportModalResult } from './typing'

import { defineComponent } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import { useI18n } from '@/hooks/web/useI18n'
import { BasicForm, FormSchema, useForm } from '@/components/Form'
const { t } = useI18n()

export default defineComponent({
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const [registerForm, { validateField, getFieldsValue }] = useForm()
    const [registerModal, { closeModal }] = useModalInner()

    const schemas: FormSchema[] = [
      {
        field: 'filename',
        component: 'ElInput',
        label: t('component.excel.fileName'),
        rules: [{ required: true }],
      },
      {
        field: 'bookType',
        component: 'ElSelect',
        label: t('component.excel.fileType'),
        defaultValue: 'xlsx',
        rules: [{ required: true }],
        componentProps: {
          options: [
            {
              label: 'xlsx',
              value: 'xlsx',
              key: 'xlsx',
            },
            {
              label: 'html',
              value: 'html',
              key: 'html',
            },
            {
              label: 'csv',
              value: 'csv',
              key: 'csv',
            },
            {
              label: 'txt',
              value: 'txt',
              key: 'txt',
            },
          ],
        },
      },
    ]
    async function handleOk() {
      await validateField()
      const res = (getFieldsValue()) as ExportModalResult
      const { filename, bookType } = res
      console.log('res++++', res)
      emit('success', {
        filename: `${filename.split('.').shift()}.${bookType}`,
        bookType,
      })
      closeModal()
    }

    return {
      schemas,
      handleOk,
      registerForm,
      registerModal,
      t,
    }
  },
})
</script>
