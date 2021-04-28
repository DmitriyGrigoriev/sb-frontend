<template>
  <q-toolbar>
    <q-avatar>
      <q-img
        src="icons/favicon-192x192.png"
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer"
      />
    </q-avatar>

    <q-toolbar-title class="text-white">
      <span class="gt-md">{{ appName }}</span>
      <span class="lt-md">{{ appShortname }}</span>
    </q-toolbar-title>
    <q-space />

<!--    <header-search class="q-mr-md"></header-search>-->

    <notification-button></notification-button>

    <q-btn flat round>
      <user-avatar :src="avatar"></user-avatar>

      <dropdown-menu/>
    </q-btn>
  </q-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
import DropdownMenu from '@/ui/components/Dropdown'
import UserAvatar from '@/ui/components/UserAvatar'
import NotificationButton from '@/ui/components/NotificationButton'
// import HeaderSearch from '@/ui/components/HeaderSearch'
// import { GET_CURRENT_USER } from '@/graphql/queries';

export default {
  components: {
    DropdownMenu,
    NotificationButton,
    UserAvatar
    // HeaderSearch
  },
  name: 'AppHeader',
  computed: {
    ...mapGetters('auth', ['user', 'avatar'])
  },
  data () {
    return {
      menu: false,
      notificationsDropdown: false,
      markingAllAsRead: false,
      showSearch: false,
      appName: process.env.APP_NAME,
      appShortname: process.env.APP_SHORTNAME
    }
  }
}
</script>
