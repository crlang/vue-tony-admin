import type { BasicFormSchema, FormActionMethods, BasicProps } from './types/form'
import type { CSSProperties } from 'vue'
import type { TableActionMethods } from '@/components/BasicTable'
import type { EleButton, EleCol, EleRow } from '@/components/ElementPlus'
import type dayjs from 'dayjs'

import { EleFormProps } from '@/components/ElementPlus'

export const basicFormActionProps = {
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  actionColOptions: {
    type: Object as PropType<Partial<EleCol>>,
    default: () => ({}),
  },
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  submitButtonOptions: {
    type: Object as PropType<EleButton>,
    default: () => {},
  },
  showResetButton: {
    type: Boolean,
    default: true,
  },
  resetButtonOptions: {
    type: Object as PropType<EleButton>,
    default: () => {},
  },
  showAdvancedButton: { type: Boolean },
}

export const customProps = {
  ...basicFormActionProps,

  schemas: {
    type: [Array] as PropType<BasicFormSchema[]>,
    default: () => [],
  },
  rowProps: {
    type: Object as PropType<Partial<EleRow>>,
  },
  rowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  colProps: {
    type: Object as PropType<Partial<EleCol>>,
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  autoSetPlaceHolder: {
    type: Boolean,
    default: true,
  },
  autoSubmitOnEnter: { type: Boolean },
  submitOnReset: { type: Boolean },
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true,
  },
  alwaysShowLines: {
    type: Number,
    default: 1,
  },
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date instanceof dayjs ? date?.format('YYYY-MM-DD HH:mm:ss') : date
    },
  },
  tableAction: {
    type: Object as PropType<TableActionMethods>,
  },
}

export const basicProps = {
  ...EleFormProps,
  ...customProps,
}

export const formActionProps = {
  ...basicFormActionProps,
  actionSpan: {
    type: Number,
    default: 6,
  },
  isAdvanced: { type: Boolean },
  hideAdvanceBtn: { type: Boolean },
}

export const basicFormItemProps = {
  schema: {
    type: Object as PropType<BasicFormSchema>,
    default: () => ({}),
  },
  formProps: {
    type: Object as PropType<BasicProps>,
    default: () => ({}),
  },
  defaultValues: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  formModel: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  setFormModel: {
    type: Function as PropType<(key: string, value: any) => void>,
    default: null,
  },
  tableAction: {
    type: Object as PropType<TableActionMethods>,
  },
  formActionType: {
    type: Object as PropType<FormActionMethods>,
  },
}
