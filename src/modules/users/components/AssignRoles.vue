<template>
  <q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
    <q-toolbar class="bg-info text-white">
      <q-toolbar-title class="absolute-center text-subtitle1"
        >{{ $t('pages.users.manage.title.assignRoles') }}</q-toolbar-title
      >
      <q-space />
      <q-btn flat round dense icon="close" @click="$emit('close')"></q-btn>
    </q-toolbar>

    <q-separator />

    <div class="q-pa-md">
      <q-item-label class="q-mb-md">{{ $t('pages.users.manage.title.selectRoles') }}</q-item-label>
      <q-option-group :options="roles" v-model="model" type="checkbox" />
    </div>

    <q-card-actions align="right">
      <q-btn flat :label="$t('buttons.cancel.label')" @click="$emit('close')" />
      <q-btn
        :label="$t('buttons.submit.label')"
        color="primary"
        @click="saveRoles"
        :loading="loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AssignRoles',
  props: ['id', 'role'],
  computed: {
    ...mapGetters('users', ['users', 'roles'])
  },
  data () {
    return {
      panel: 'role',
      model: [],
      loading: false
    }
  },
  methods: {
    ...mapActions('users', ['assignRole']),
    saveRoles () {
      this.loading = true
      const payload = {
        user_id: this.$props.id,
        role_ids: this.model
      }

      this.assignRole(payload).then(() => {
        this.loading = false
        this.$emit('close')
      })
    // .catch(err => console.error(err))
    }
  },
  beforeCreate () {
    // Getting available roles
    this.$store.dispatch('users/getRoles')
  },
  mounted () {
    // Assigned roles Ids
    this.model = this.role
  }
}
</script>
