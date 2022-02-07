import { ElTag } from 'element-plus'
import { BasicColumn } from '@/components/Table'
import { ErrorTypeEnum } from '@/enums/exceptionEnum'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export function getColumns(): BasicColumn[] {
  return [
    {
      prop: 'type',
      label: t('sys.errorLog.tableColumnType'),
      width: 80,
      customRender: ({ text }) => {
        const color =
          text === ErrorTypeEnum.VUE
            ? 'success'
            : text === ErrorTypeEnum.RESOURCE
              ? 'warning'
              : text === ErrorTypeEnum.PROMISE
                ? 'primary'
                : ErrorTypeEnum.AJAX
                  ? 'danger'
                  : 'info'

        return <ElTag type={color}>{() => text}</ElTag>
      },
    },
    {
      prop: 'url',
      label: 'URL',
      width: 200,
    },
    {
      prop: 'time',
      label: t('sys.errorLog.tableColumnDate'),
      width: 160,
    },
    {
      prop: 'file',
      label: t('sys.errorLog.tableColumnFile'),
      width: 200,
    },
    {
      prop: 'name',
      label: 'Name',
      width: 200,
    },
    {
      prop: 'message',
      label: t('sys.errorLog.tableColumnMsg'),
      width: 300,
    },
    {
      prop: 'stack',
      label: t('sys.errorLog.tableColumnStackMsg'),
    },
  ]
}

export function getDescSchema(): any {
  return getColumns().map((column) => {
    return {
      field: column.dataIndex!,
      label: column.title,
    }
  })
}
