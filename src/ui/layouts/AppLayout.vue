<template>
  <q-layout view="lHr LpR lfr">
    <q-header bordered class="bg-accent">
      <app-header></app-header>

      <q-separator color="secondary" class="header-separator" />
    </q-header>

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
      class="bg-info text-secondary text-lowercase items-center"
    >
      <app-footer></app-footer>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AppHeader from '@/ui/components/Header'
import AppFooter from '@/ui/components/Footer'
import AppMenu from '@/ui/components/Menu'
import UserInfo from '@/ui/components/UserInfo'
// import AppSidebar from '@/ui/components/Sidebar'
// import RouteTabs from '@/ui/components/RouteTabs'
// import gql from 'graphql-tag';

export default {
  components: {
    AppFooter,
    AppHeader,
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
      tabs: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard'
        },
        {
          label: 'Add Project',
          icon: 'add_box',
          to: '/projects/add'
        },
        {
          label: 'Projects',
          icon: 'view_list',
          to: '/projects'
        },
        {
          label: 'Profile',
          icon: 'tune',
          to: '/profile'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['user', 'avatar', 'isAdmin', 'isEncoder']),
    ...mapState('settings', ['dark']),
    darkMode () {
      return this.$q.dark.isActive
    },
    filteredTabs () {
      // This function hides the users tab if the user is not admin or superadmin
      let filteredTabs = []

      if (this.isEncoder) {
        return this.tabs
      }

      filteredTabs = this.tabs.filter(tab => tab.label !== 'Add Project')

      return filteredTabs
    },
    mini () {
      return this.$q.screen.sm
    }
    // isAdmin () {
    //   return this.$store.getters['auth/isAdmin']
    // },
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
    }
  }
  // apollo: {
  //   processing_statuses: {
  //     query: gql`
  //       query {
  //         processing_statuses {
  //           id
  //           name
  //           count_projects
  //         }
  //       }
  //     `,
  //     variables: {},
  //     result({ data }) {
  //       this.tabs.map(tab => {
  //         if (tab.label === 'Projects') {
  //           tab.children = data.processing_statuses;
  //         }
  //         return tab
  //       })
  //     }
  //   }
  // }
}
</script>

<style>
hr.q-separator.header-separator {
  height: 3px;
}
</style>
