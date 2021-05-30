<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { storageService } from '@/services/storage.service'
import { mapState } from 'vuex'
// import { GET_CURRENT_USER } from './graphql/queries'
// import {
//   ASSIGNED_ROLE,
//   ASSIGNED_OPERATING_UNIT_TO_REVIEW,
//   TRANSFERRED_PROJECT
// } from '@/graphql/subscriptions'

export default {
  name: 'App',
  computed: {
    ...mapState('settings', ['dark'])
  //   ...mapGetters('auth', ['user']),
  //   user_id () {
  //     return this.user ? this.user.id : null
  //   }
  },
  created () {
    const token = storageService.getToken()
    if (token) {
      this.$store.dispatch('auth/getCurrentUser')
    }
    this.$q.dark.set(this.dark)
  }
}
</script>
