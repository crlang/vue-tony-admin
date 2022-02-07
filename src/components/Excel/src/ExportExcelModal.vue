<template>
  <BasicModal
    :visible="visibleRef"
    :title="t('component.excel.exportModalTitle')"
    :width="600"
    @close="visibleRef = false">
    <BasicForm
      :labelWidth="100"
      :schemas="schemas"
      :showActionButtonGroup="false"
      @register="registerForm"
    />
    <template #footer>
      <ElButton @click="visibleRef = false">关闭</ElButton>
      <ElButton
        type="primary"
        @click="handleOk">提交</ElButton>
    </template>
  </BasicModal>
</template>

<script lang="ts">
import type { ExportModalResult } from './typing'

import { defineComponent, ref, watch, watchEffect } from 'vue'
import { ElButton } from 'element-plus'
import { BasicModal } from '@/components/Modal'
import { useI18n } from '@/hooks/web/useI18n'
import { BasicForm, FormSchema, useForm } from '@/components/Form'

export default defineComponent({
  components: { ElButton, BasicModal, BasicForm },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['success', 'update:visible', 'register'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const visibleRef = ref(false)
    const [registerForm, { validateField, getFieldsValue }] = useForm()

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

    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    watch(
      () => visibleRef.value,
      (v) => {
        emit('update:visible', v)
      },
      {
        immediate: false,
      }
    )

    async function handleOk() {
      const res = (await validateField()) as ExportModalResult
      if (!res) return

      const { filename, bookType } = getFieldsValue()
      emit('success', {
        filename: `${filename.split('.').shift()}.${bookType}`,
        bookType,
      })

      visibleRef.value = false
    }

    return {
      visibleRef,
      schemas,
      registerForm,
      handleOk,
      t,
    }
  },
})
</script>
