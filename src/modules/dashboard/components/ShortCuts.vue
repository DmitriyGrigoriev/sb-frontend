<template>
  <div>
    <div class="row">
      <q-item-label header class="q-px-none">{{ $t('components.shortcuts.label') }}</q-item-label>
    </div>

    <div class="row">
      <template v-for="(link, index) in filteredLinks">
        <div class="col-6" :key="index">
          <q-card flat square class="fit" bordered>
            <q-item clickable @click="selectElement(link.name)" v-ripple>
              <q-item-section>
                <q-item-label class="text-uppercase"
                  >{{ link.label }} {{ link.visible }}</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-icon :name="link.icon" size="xl" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ShortCuts',
  computed: {
    ...mapGetters('auth', ['role', 'isEncoder']),
    filteredLinks: function () {
      let filteredLinks = []
      const role = this.role
      let name = ''

      if (role) {
        filteredLinks = this.links.filter(link => {
          if (link.hasAccess.length === 0) {
            return true
          }
          name = ''
          Object.keys(role).forEach(key => {
            if (link.hasAccess.includes(role[key].name)) {
              if (name === '') {
                name = role[key].name
              }
            }
          })
          return link.hasAccess.includes(name)
        })
      } else {
        filteredLinks = []
      }
      return filteredLinks
    }
  },
  methods: {
    selectElement (name) {
      this.$router.push(name)
    }
  },
  data () {
    return {
      links: [
        // {
        //   label: 'Projects',
        //   icon: 'list',
        //   name: { name: 'projects' },
        //   color: 'blue',
        //   hasAccess: ['encoder']
        // },
        // {
        //   label: 'Add Project',
        //   icon: 'playlist_add',
        //   name: { name: 'add-project' },
        //   color: 'secondary',
        //   hasAccess: ['encoder'],
        //   encoder: true
        // },
        // {
        //   label: 'Review Projects',
        //   icon: 'list',
        //   name: { name: 'projects' },
        //   color: 'blue',
        //   hasAccess: ['reviewer']
        // },
        // {
        //   label: 'Deleted Projects',
        //   icon: 'delete',
        //   name: { name: 'deleted-projects' },
        //   color: 'red',
        //   hasAccess: ['encoder']
        // },
        // {
        //   label: 'Programs',
        //   icon: 'view_module',
        //   name: { name: 'programs' },
        //   color: 'secondary',
        //   hasAccess: ['encoder'],
        //   encoder: true
        // },
        // {
        //   label: 'Review Programs',
        //   icon: 'rate_review',
        //   name: { name: 'review' },
        //   color: 'secondary',
        //   reviewer: true,
        //   hasAccess: ['reviewer']
        // },
        {
          label: this.$t('shortcuts.service.label'),
          icon: 'pageview',
          name: { name: 'service' },
          hasAccess: ['encoder']
        },
        {
          label: this.$t('pages.dictionary.title'),
          icon: 'ac_unit',
          name: { name: 'measure' },
          color: 'pink',
          hasAccess: []
        },
        {
          label: this.$t('shortcuts.profile.label'),
          icon: 'tune',
          name: { name: 'profile' },
          color: 'primary',
          hasAccess: []
        },
        {
          label: this.$t('shortcuts.security.label'),
          icon: 'vpn_key',
          name: { name: 'security' },
          color: 'red',
          hasAccess: []
        },
        {
          label: this.$t('shortcuts.setup.label'),
          icon: 'settings',
          name: { name: 'setup' },
          color: 'pink',
          hasAccess: []
        }
      ]
    }
  }
}
</script>
