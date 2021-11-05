<template>
  <q-banner class="q-pa-md">
    <template v-slot:avatar>
      <q-icon name="info" color="secondary" />
    </template>
    {{ bannerText }}
    <template v-slot:action>
      <reset-button :label="bannerButtonLabel" @click="showBlocked" />
    </template>
  </q-banner>
</template>

<script>
import ResetButton from '@/ui/buttons/ResetButton'

export default {
  name: 'BlockedSeriesBanner',
  components: {
    ResetButton
  },
  data () {
    return {
      blocked: false
    }
  },
  computed: {
    bannerText () {
      if (!this.blocked) {
        return this.$t('pages.dictionary.noseriesline.banner.blocked.text')
      } else {
        return this.$t('pages.dictionary.noseriesline.banner.unblocked.text')
      }
    },
    bannerButtonLabel () {
      if (!this.blocked) {
        return this.$t('pages.dictionary.noseriesline.banner.blocked.button.label')
      } else {
        return this.$t('pages.dictionary.noseriesline.banner.unblocked.button.label')
      }
    }
  },
  methods: {
    showBlocked () {
      this.blocked = !this.blocked
      this.$emit('showblocked', this.blocked)
    }
  }
}
</script>

<style scoped>

</style>
