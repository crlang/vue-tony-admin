<template>
  <PageWrapper>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { BasicTable, useTable } from '@/components/BasicTable';

import { ApiLogsPage } from '@/api/logs';
import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'Logs',
  components: { BasicTable },
  setup() {
    const [registerTable] = useTable({
      api: ApiLogsPage,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      border: true,
      beforeFetchFn(data) {
        if (data?.rangeDate?.length) {
          data.startDate = data.rangeDate[0];
          data.endDate = data.rangeDate[1];
          delete data.rangeDate;
        }
        return data;
      },
    });

    return {
      registerTable,
    };
  },
});
</script>
