<template>
  <q-layout view="hhh lpR fff" class="bg-info">
    <q-header class="bg-info text-white">
      <div class="row q-pa-sm items-center justify-between">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div class="row q-gutter-sm items-center">

            <img alt="favicon" src="icons/favicon-96x96.png" style="height: 40px;" />

            <div class="gt-xs">
              {{ $t('app.product.descr1') }} &amp; {{ $t('app.product.descr3') }}
            </div>

            <q-space />

            <q-btn
              type="a"
              flat
              stretch
              :href="DOCS_LINKS.gettingStarted"
              target="_blank"
              >{{ $t('buttons.getStarted') }}</q-btn
            >

            <q-separator vertical color="white"></q-separator>

            <q-btn
              flat
              :label="$t('buttons.gotoApp')"
              stretch
              to="/dashboard"
              v-if="isLoggedIn"
            ></q-btn>

            <q-btn
              :label="$t('auth.login.enter')"
              stretch
              to="/login"
              color="primary"
              v-if="!isLoggedIn"
            ></q-btn>
          </div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

<!--    <q-footer class="bg-accent text-secondary">-->
<!--      <q-separator />-->
<!--      <app-footer></app-footer>-->
<!--    </q-footer>-->
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
// import AppFooter from '@/ui/components/Footer'
import { DOCS_LINKS } from '@/constants/docs'

export default {
  components: { AppFooter },
  name: 'LandingLayout',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  data () {
    return {
      DOCS_LINKS
    }
  }
}
</script>
