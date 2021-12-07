<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">{{ $t('components.verify_email.text.title') }}</span>
      <div class="text-caption">
        {{ $t('components.verify_email.text.subtitle') }}
      </div>
    </div>

    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-btn
        :label="$t('components.verify_email.buttons.resend.label')"
        @click="verifyEmail"
        color="primary"
        v-if="!isVerified"
      ></q-btn>
      <span v-else>VERIFIED</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'VerifyEmail',

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isVerified'])
  },

  methods: {
    verifyEmail () {
      this.resendingEmail = true

      const payload = {
        email: this.user.email
      }

      this.$q.loading.show({ message: this.$t('components.verify_email.text.message') })

      this.$store
        .dispatch('auth/resendEmailVerification', payload)
        .then(() =>
          this.$q.notify({
            type: 'positive',
            message: this.$t('components.verify_email.notify.message'),
            position: 'bottom-right'
          })
        )
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.message,
            position: 'bottom-right'
          })
        })
        .finally(() => this.$q.loading.hide())
    }
  }
}
</script>
