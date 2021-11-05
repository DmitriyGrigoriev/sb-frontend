<template id="menu">
  <q-list dense>
    <menu-item :label="$t('shortcuts.dashboard.label')" @click="selectElement({ name: 'dashboard' })" icon="fas fa-tachometer-alt" />
<!--    <menu-item label="Programs" @click="selectElement({ name: 'programs' })" icon="fas fa-list" v-if="!isReviewer" />-->
<!--    <menu-item label="Projects" @click="selectElement({ name: 'projects' })" icon="fas fa-tasks" v-if="!isReviewer" />-->
<!--    <menu-item label="Review Programs" @click="selectElement({ name: 'review' })" icon="fas fa-list" v-if="isReviewer" />-->
<!--    <menu-item label="Review Projects" @click="selectElement({name: 'projects' })" icon="fas fa-tasks" v-if="isReviewer" />-->
    <menu-item :label="$t('shortcuts.service.label')" @click="selectElement({ name: 'service' })" icon="fas fa-layer-group" />
<!--    <menu-item label="Deleted Projects" @click="selectElement({ name: 'deleted-projects' })" icon="fas fa-trash-alt" />-->
    <q-separator />
    <menu-item :label="$t('shortcuts.profile.label')" @click="selectElement({ name: 'profile' })" icon="fas fa-id-card" />
    <menu-item :label="$t('shortcuts.admin.label')" @click="selectElement({ name: 'admin' })" icon="fas fa-user-shield" />
    <menu-item :label="$t('shortcuts.security.label')" @click="selectElement({ name: 'security' })" icon="fas fa-fingerprint" />
    <menu-item :label="$t('shortcuts.settings.label')" @click="selectElement({ name: 'settings' })" icon="fas fa-cog" />
    <q-separator />
    <menu-item
      :label="$t('shortcuts.askhelp.label')"
      icon="fab fa-slack"
      @click="openURL($t('shortcuts.askhelp.url'))"
      type="a"
      target="_blank"
    />
    <q-separator></q-separator>
    <menu-item :label="$t('shortcuts.logout.label')" icon="exit_to_app" @click="handleSignoutUser"></menu-item>
  </q-list>
</template>

<script>
import { openURL } from 'quasar'
import MenuItem from './MenuItem'

export default {
  name: 'AppMenu',
  components: { MenuItem },
  computed: {
    isReviewer () {
      return this.$store.getters['auth/isReviewer']
    }
  },
  methods: {
    selectElement (name) {
      this.pushRoute(name)
    },
    handleSignoutUser () {
      this.$q
        .dialog({
          title: 'Logout',
          message: 'Are you sure you want to log out?',
          cancel: true
        })
        .onOk(() => this.$store.dispatch('auth/signoutUser'))
    },
    openURL,
    // Compare the $route.matched against the desired route
    // https://stackoverflow.com/questions/62462276/how-to-solve-avoided-redundant-navigation-to-current-location-error-in-vue
    pushRoute (route) {
      // if sending path:
      if (typeof (route) === 'string') {
        if (this.$route.path !== route) {
          this.$router.push(route)
        }
      } else { // if sending a {name: '', ...}
        if (this.$route.name === route.name) {
          if ('params' in route) {
            let routesMatched = true
            for (const key in this.$route.params) {
              const value = this.$route.params[key]
              if (value === null || value === undefined) {
                if (key in route.params) {
                  if (route.params[key] !== undefined && route.params[key] !== null) {
                    routesMatched = false
                    break
                  }
                }
              } else {
                if (key in route.params) {
                  if (this.$route.params[key] !== value) {
                    routesMatched = false
                    break
                  }
                } else {
                  routesMatched = false
                  break
                }
              }
              if (!routesMatched) {
                this.$router.push(route)
              }
            }
          } else {
            if (Object.keys(this.$route.params).length !== 0) {
              this.$router.push(route)
            }
          }
        } else {
          this.$router.push(route)
        }
      }
    }
  }
}
</script>
