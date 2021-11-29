<template>
  <page-container>
    <template v-slot:title>
      <page-title :title="$t('shortcuts.setup.label')"></page-title>
    </template>

    <setup-series></setup-series>

<!--    <div class="row q-pa-sm">-->
<!--      <div class="col-lg-4 col-md-6 col-xs-12">-->
<!--        <span-->
<!--          class="text-subtitle1"-->
<!--          :class="dark ? 'text-purple' : 'text-primary'"-->
<!--        >Серия номеров по умолчанию</span-->
<!--        >-->
<!--        <p class="text-caption">-->
<!--          Lists features and bug fixes made for past versions of the application-->
<!--        </p>-->
<!--      </div>-->
<!--      <div class="col-lg-8 col-md-6 col-xs-12 q-pl-md">-->
<!--        <q-btn outline label="VIEW" @click="changeLogDialog = true"></q-btn>-->
<!--      </div>-->
<!--    </div>-->
    <q-separator inset />

  </page-container>

</template>

<script>
import PageContainer from '@/ui/page/PageContainer'
import PageTitle from '@/ui/page/PageTitle'
import { mapState } from 'vuex'
import SetupSeries from '../components/SetupSeries'

export default {
  name: 'AppSetupPage',
  components: {
    SetupSeries,
    PageTitle,
    PageContainer
  },
  computed: {
    ...mapState('settings', ['dark', 'dense'])
  }
}
</script>

<style scoped>

</style>
