<template>
  <q-img
    class="absolute-top"
    src="~assets/UserInfo.svg"
    style="height: 200px; z-index: 1;"
  >
    <div class="absolute-bottom bg-transparent text-center text-black">
      <q-avatar size="56px" class="q-mb-sm">
        <img alt="user_avatar" :src="user ? user.avatar : ''" />
      </q-avatar>
      <div class="text-weight-bold text-uppercase">
        {{ user ? user.full_name : '' }}
      </div>
      <div>{{ user ? user.email : '' }}</div>
      <div>
        {{ user && user.position ? user.position : '' }}
      </div>
      <div>
        <q-badge>
          {{ user && user.role ? user.role.name : 'No role.' }}
        </q-badge>
      </div>
    </div>
  </q-img>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'UserInfo',
  computed: {
    ...mapState('settings', ['dark']),
    ...mapGetters('auth', ['user'])
  },
  methods: {
    // refetch() {
    //   this.$apollo.queries.getCurrentUser.refetch()
    // }
  }
}
</script>
