<template>
  <q-toolbar class="bg-dark text-white">
    <!-- will be visible only if screen is lather than sm -->
    <q-btn class="lt-sm" flat @click="$bus.$emit('page-title-menu')" round dense icon="menu"></q-btn>

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
<!--  <div class="q-mb-md">-->
<!--    <q-separator />-->
<!--  </div>-->
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['title', 'icon']
}
</script>
