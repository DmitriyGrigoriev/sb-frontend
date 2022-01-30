<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-info text-white">
      <corporate-logo/>
    </q-header>

    <q-page-container class="bg-info text-white">
      <router-view />
    </q-page-container>

    <q-footer class="bg-info">
      <corporate-footer/>
    </q-footer>

  </q-layout>
</template>

<script>
import CorporateLogo from './components/CorporateLogo'
import CorporateFooter from './components/CorporateFooter'

export default {
  components: {
    CorporateLogo,
    CorporateFooter
  },
  data () {
    return {
      tab: 'login'
    }
  }
}
</script>
