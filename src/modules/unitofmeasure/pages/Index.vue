<template>
  <page-container>
    <template v-slot:title>
      <page-title :title="$t('pages.dictionary.title')" icon="fas fa-snowflake"></page-title>
    </template>
    <div class="q-pa-md">
      <measure-table/>
    </div>

  </page-container>
</template>

<script>
import MeasureTable from './MeasureTable'
import PageContainer from '@/ui/page/PageContainer.vue'
import PageTitle from '@/ui/page/PageTitle.vue'

export default {
  name: 'Index',
  components: { MeasureTable, PageContainer, PageTitle }
}
</script>

<style scoped>

</style>
