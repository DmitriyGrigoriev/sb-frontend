<template>
  <q-layout view="lHr LpR lfr">
<!--    <q-header elevated class="bg-black">-->
<!--      <app-header @click="toggleDrawer"/>-->
<!--      <q-separator color="secondary" class="header-separator" />-->
<!--    </q-header>-->

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :mini-state="miniState"
      :breakpoint="500"
      bordered
      content-class="bg-grey-1"
    >

      <q-scroll-area style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd">
        <app-menu/>
<!--        <app-menu :user="getCurrentUser" />-->
      </q-scroll-area>

      <user-info v-if="!miniState"></user-info>

      <div class="q-mini-drawer-hide absolute" style="top: 60px; right: -17px; z-index: 999">
        <q-btn
          dense
          round
          unelevated
          color="secondary"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>

    </q-drawer>

    <q-footer
      bordered
      class="text-lowercase items-center"
    >
      <app-footer></app-footer>
    </q-footer>

    <q-page-container
      @page-container-menu="toggleDrawer"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import AppHeader from '@/ui/components/AppHeader'
import AppFooter from '@/ui/components/Footer'
import AppMenu from '@/ui/components/Menu'
import UserInfo from '@/ui/components/UserInfo'
// import AppSidebar from '@/ui/components/Sidebar'
// import RouteTabs from '@/ui/components/RouteTabs'
// import gql from 'graphql-tag';
// import { handleError } from '@/utils'

export default {
  components: {
    AppFooter,
    // AppHeader,
    // AppSidebar,
    // RouteTabs
    AppMenu,
    UserInfo
  },
  name: 'AppLayout',
  data () {
    return {
      drawer: false,
      miniState: false,
      appTitle: process.env.APP_SHORTNAME,
      appTitleFooter: process.env.APP_NAME,
      copyright: process.env.COPYRIGHT,
      showAbout: false,
      errors: null
    }
  },
  computed: {
    ...mapGetters('auth', ['user', 'avatar', 'isAdmin', 'isEncoder']),
    ...mapState('settings', ['dark']),
    darkMode () {
      return this.$q.dark.isActive
    }
    // mini () {
    //   return this.$q.screen.sm
    // }
  },
  created () {
    this.errors = {}
  },
  methods: {
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    /**
     * Sets the sidebar expansion state to mini
     */
    collapseDrawer () {
      this.drawer = false
    },
    /**
     * Sets the sidebar expansion state to expanded
     */
    expandDrawer () {
      if (this.miniState) {
        this.miniState = false
      }
      this.drawer = true
    },
    /**
     * Toggles the sidebar expansion state
     */
    toggleDrawer () {
      if (this.drawer) {
        this.collapseDrawer()
      } else {
        this.expandDrawer()
      }
    }
  },
  mounted () {
    this.$bus.$on('page-title-menu', () => {
      this.toggleDrawer()
    })
  }
}
</script>

<style>
hr.q-separator.header-separator {
  height: 3px;
}
</style>
