<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { storageService } from '@/services/storage.service'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('settings', ['dark'])
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
