<template>
  <q-banner
    inline-actions
    dense
    rounded
    class="bg-red text-white"
    v-if="error"
  >
    {{ error }}
    <template v-slot:action>
      <q-btn flat round icon="close" @click="clearError" />
    </template>
  </q-banner>
</template>

<script>
export default {
  name: 'ErrorBanner',
  props: {
    error: null
  },
  methods: {
    clearError () {
      this.$store.dispatch('auth/clearError')
    }
  }
}
</script>

<style scoped>

</style>
