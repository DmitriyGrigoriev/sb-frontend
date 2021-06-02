<template id="menu">
  <q-list dense>
    <menu-item :label="$t('menus.dashboard.label')" @click="selectElement({ name: 'dashboard' })" icon="fas fa-tachometer-alt" />
    <menu-item label="Programs" @click="selectElement({ name: 'programs' })" icon="fas fa-list" v-if="!isReviewer" />
    <menu-item label="Projects" @click="selectElement({ name: 'projects' })" icon="fas fa-tasks" v-if="!isReviewer" />
    <menu-item label="Review Programs" @click="selectElement({ name: 'review' })" icon="fas fa-list" v-if="isReviewer" />
    <menu-item label="Review Projects" @click="selectElement({name: 'projects' })" icon="fas fa-tasks" v-if="isReviewer" />
    <menu-item label="Consolidators" @click="selectElement({ name: 'consolidates' })" icon="fas fa-layer-group" />
    <menu-item label="Deleted Projects" @click="selectElement({ name: 'deleted-projects' })" icon="fas fa-trash-alt" />
    <q-separator />
    <menu-item :label="$t('menus.profile.label')" @click="selectElement({ name: 'profile' })" icon="fas fa-id-card" />
    <menu-item :label="$t('menus.admin.label')" @click="selectElement({ name: 'admin' })" icon="fas fa-user-shield" />
    <menu-item :label="$t('menus.security.label')" @click="selectElement({ name: 'security' })" icon="fas fa-fingerprint" />
    <menu-item :label="$t('menus.settings.label')" @click="selectElement({ name: 'settings' })" icon="fas fa-cog" />
    <q-separator />
    <menu-item
      :label="$t('menus.askhelp.label')"
      icon="fab fa-slack"
      @click="openURL($t('menus.askhelp.url'))"
      type="a"
      target="_blank"
    />
    <q-separator></q-separator>
    <menu-item :label="$t('menus.logout.label')" icon="exit_to_app" @click="handleSignoutUser"></menu-item>
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
      this.$router.push(name)
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
    openURL
  }
}
</script>
