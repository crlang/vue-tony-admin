<template>
  <div v-if="datainfo" class="dashboard-analysis">
    <AnaCard :loading="loading" :datainfo="datainfo.cardInfo || []" />
    <AnaSite :loading="loading" :datainfo="datainfo.viewsInfo || null" />
    <AnaOrder :loading="loading" :datainfo="datainfo.orderInfo || null" />
    <AnaProduct :loading="loading" :datainfo="datainfo.productInfo || null" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import anaCard from './components/anaCard.vue'
import anaSite from './components/anaSite.vue'
import anaOrder from './components/anaOrder.vue'
import anaProduct from './components/anaProduct.vue'
import { ApiHomeStat } from '@/api/dashboard'

export default defineComponent({
  components: { AnaCard: anaCard, AnaSite: anaSite, AnaOrder: anaOrder, AnaProduct: anaProduct },
  setup() {
    const loading = ref(false)
    const datainfo = ref()

    function initData() {
      loading.value = true
      ApiHomeStat({})
        .then((res) => {
          datainfo.value = res
          setTimeout(() => {
            loading.value = false
          }, 500)
        })
        .catch(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      initData()
    })

    return {
      loading,
      datainfo,
    }
  },
})
</script>

<style lang="scss">
.dashboard-analysis {
  padding: var(--container-gutter-base);

  .el-card {
    --el-card-padding: 0;

    padding: 2rem;

    &__header {
      border: none;
    }
  }

  &__title {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    font-weight: bold;
  }
}
</style>
