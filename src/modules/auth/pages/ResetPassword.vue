<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center">
        <q-card bordered flat class="my-card bg-info" dark square>
          <div class="row q-pa-md text-weight-light text-h6">
            {{ $t('auth.password.reset.header') }}
          </div>

          <q-separator color="white" spaced />

          <q-card-section class="q-pa-md">
            <reset-form/>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <div class="text-center">
              {{ $t('auth.password.reset.remembered') }}
              <span
                class="text-blue text-weight-bolder cursor-pointer"
                @click="goToLogin"
                >{{ $t('auth.login.enter') }}</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script>
import { showError } from '@/utils'
import ResetForm from '../components/ResetForm'

export default {
  name: 'ResetPassword',
  components: { ResetForm },
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      token: ''
    }
  },
  methods: {
    goToLogin () {
      this.$router.replace({ name: 'login' })
    },
    updateForgottenPassword () {
      this.$refs.passwordReset.validate().then(success => {
        if (success) {
          const payload = {
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: this.token
          }

          this.$q.loading.show()

          this.$store
            .dispatch('auth/updateForgottenPassword', payload)
            .then(res => {
              const { status, message } = res.updateForgottenPassword
              if (status === 'PASSWORD_UPDATED') {
                this.$q.notify({
                  type: 'positive',
                  message: 'Password updated!'
                })
                this.$q
                  .dialog({
                    title: 'Password Updated',
                    message: 'You may now login using your new password.',
                    persistent: true,
                    transitionShow: 'jump-down',
                    transitionHide: 'jump-up'
                  })
                  .onDismiss(() => this.$router.replace('/login'))
              } else {
                this.$q.notify({
                  type: 'negative',
                  message: message
                })
              }
            })
            .catch(showError)
            .finally(() => this.$q.loading.hide())
        } else {
          alert('Please check form inputs.')
        }
      })
    }
  },
  created () {
    // reset-password?token={token}&email={email}
    // const email = this.$route.query.email
    // if (typeof email === 'undefined') {
    //   alert('Email is required.')
    // } else {
    //   this.email = this.$route.query.email
    //   this.token = this.$route.params.token
    // }
  }
}
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
