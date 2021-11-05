<template>
  <page-container>
    <template v-slot:title>
      <page-title :title="$t('shortcuts.dashboard.label')" icon="fas fa-tachometer-alt"></page-title>
    </template>

    <q-banner class="bg-red-1" v-if="env === 'STAGING'">
      This is the staging version of the System. For the live production version, please click the link below.
      <template v-slot:action>
        <q-btn flat color="negative" label="GO" @click="openURL(prodUrl)" />
      </template>
    </q-banner>

    <div class="row q-pa-md q-gutter-y-md q-col-gutter-md">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
        <short-cuts></short-cuts>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <announcement-component />

        <releases-component />

        <useful-links></useful-links>
      </div>
    </div>
  </page-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PageTitle from '@/ui/page/PageTitle.vue'
import PageContainer from '@/ui/page/PageContainer.vue'
import ShortCuts from '../components/ShortCuts.vue'
import ReleasesComponent from '../components/Releases'
import UsefulLinks from '../components/UsefulLinks'
import { openURL } from 'quasar'
import AnnouncementComponent from '../components/AnnouncementComponent'

export default {
  name: 'PageIndex',
  components: {
    ShortCuts,
    AnnouncementComponent,
    UsefulLinks,
    ReleasesComponent,
    PageContainer,
    PageTitle
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isEncoder'])
  },
  data () {
    return {
      env: process.env.APP_ENV,
      prodUrl: process.env.PROD_ENDPOINT
    }
  },

  methods: {
    openURL
  }
}
</script>
