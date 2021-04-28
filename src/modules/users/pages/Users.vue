<template>
  <page-container>
    <page-title title="Manage Users"></page-title>

    <!-- Search Field -->
    <search-component
      v-model="searchField"
      placeholder="Filter Users"
    ></search-component>

    <div class="q-pa-sm">
      <!-- Loading -->
      <template v-if="loading">
        <q-inner-loading :showing="loading">
          <q-spinner-tail size="50px" color="primary" />
        </q-inner-loading>
      </template>

      <template v-else>
        <!-- User List -->
        <template v-if="!filteredUsers">
          <no-item message="No users to show"></no-item>
        </template>
        <template v-else>
          <div class="col">
            <q-list separator bordered>
              <template v-for="(user, index) in filteredUsers">
                <user :key="index" :user="user"></user>
              </template>
            </q-list>
          </div>
        </template>
      </template>
    </div>
  </page-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import User from '../components/User'
import PageTitle from '@/ui/page/PageTitle'
import PageContainer from '@/ui/page/PageContainer'
import SearchComponent from '@/ui/components/SearchComponent'
import NoItem from '@/ui/components/NoItem'

export default {
  components: { PageContainer, PageTitle, User, SearchComponent, NoItem },
  name: 'PageUsers',
  // apollo: {
  //   users: {
  //     query: ALL_USERS
  //   }
  // },
  data () {
    return {
      loading: false,
      assignRoleDialog: false,
      searchField: ''
    }
  },
  mounted () {
    this.$store.dispatch('users/fetchUsers')
  },
  computed: {
    ...mapState('settings', ['dark']),
    ...mapGetters('users', ['users']),
    filteredUsers () {
      let filteredUsers = []

      const userList = this.users

      const search = this.searchField.trim().toLowerCase()

      if (search) {
        console.log(search)

        filteredUsers = userList.filter(
          user =>
            user.full_name.toLowerCase().includes(search)
            // ||
            // user.role.name.toLowerCase() === search
        )

        filteredUsers = Object.filter(userList, user => user.name.toLowerCase().includes(search))

        return filteredUsers
      }

      filteredUsers = userList

      return filteredUsers
    },
    avatarColor () {
      return this.dark ? 'pink-13' : 'primary'
    }
  }
}
</script>
