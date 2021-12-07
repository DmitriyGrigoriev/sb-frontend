<template>
  <q-toolbar class="bg-dark text-white">
    <!-- will be visible only if screen is lather than sm -->
    <q-btn class="lt-sm" flat @click="$emit('click')" round dense icon="menu"></q-btn>

    <q-avatar v-if="$route.fullPath !== '/dashboard'">
      <q-btn icon="chevron_left" flat round dark @click="$router.back()" />
    </q-avatar>
    <q-avatar v-if="icon">
      <q-icon :name="icon"></q-icon>
    </q-avatar>
    <!-- will be visible only if screen is greater than sm -->
    <q-toolbar-title class="gt-sm text-uppercase">{{ title }}</q-toolbar-title>

    <q-space />

    <slot></slot>
  </q-toolbar>
</template>

<script>

export default {
  name: 'AppHeader',
  props: ['title', 'icon'],
  components: {},
  computed: {},
  data () {
    return {
      appName: process.env.APP_NAME,
      appShortname: process.env.APP_SHORTNAME
    }
  },
  methods: {
    mini () {
      return this.$q.screen.sm
    }
  }
}
</script>
