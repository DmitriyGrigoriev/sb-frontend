<template>
  <q-page padding>
    <div class="column">
      <div class="row items-center q-pb-xl full-page">
        <div class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12">
          <div class="col-6 q-gutter-y-lg text-white text-center justify-center">

            <div class="text-h4 text-weight-bold">
              {{ message }} <br />
            </div>
            <div class="text-h5 text-weight-bold">
              {{ errorMessage }} <br />
            </div>
          </div>

          <div class="row">
            <div class="offset-4 col-4">
              <br />
              <q-separator color="secondary" />
              <br />
            </div>
          </div>

          <div class="row justify-center q-gutter-md">
            <q-btn
              size="lg"
              class="text-capitalize text-weight-bolder"
              color="primary"
              style="width: 220px;"
              to="/login"
            >
              {{ $t('auth.login.enter')}}
            </q-btn>
          </div>

        </div>

      </div>

    </div>
  </q-page>

</template>

<script>
import { HandleErrorClass } from '@/utils'

export default {
  name: 'Activate',
  data () {
    return {
      message: this.$t('auth.activation.activation_message'),
      errorMessage: null,
      uid: null,
      token: null
    }
  },
  methods: {
    async ActivateUserProfile () {
      this.$store
        .dispatch('auth/ActivateUser', {
          uid: this.uid,
          token: this.token
        })
        .then(res => {
          this.message = this.$t('auth.activation.activation_success')
        })
        .catch(error => {
          this.message = this.$t('auth.activation.activation_failed')
          const errorMessage = new HandleErrorClass(error).message
          if (errorMessage) {
            this.errorMessage = this.$t('auth.activation.activation_reason') + errorMessage
          } else {
            this.errorMessage = null
          }
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    }
  },
  created () {
    // activate/:uid/:token/
    this.uid = this.$route.params.uid
    this.token = this.$route.params.token
    this.ActivateUserProfile()
  }
}
</script>

<style scoped>

</style>
