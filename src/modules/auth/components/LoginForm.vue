<template>
  <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit" greedy>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <error-banner :error="this.error"/>
    </transition>

    <email-input
      v-model="username"
      dark
    ></email-input>

    <password-input
      v-model="password"
      :rules="required"
      dark
    ></password-input>

    <div class="row">
      <q-btn
        class="full-width"
        type="submit"
        :color="dark ? 'purple-1' : 'primary'"
        unelevated
        :loading="loading"
        v-test="{ id: 'login' }"
      >
        {{ $t('auth.login.enter')}}
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Loading } from 'quasar'
import ErrorBanner from './ErrorBanner'
import PasswordInput from '@/ui/form-inputs/PasswordInput'
import EmailInput from '@/ui/form-inputs/EmailInput'
import { handleError } from '@/utils'

export default {
  name: 'LoginForm',
  components: { ErrorBanner, EmailInput, PasswordInput },
  data () {
    return {
      username: 'tnvedru@gmail.com',
      password: 'MyAwessomePassword124',
      required: [val => !!val || this.$t('rules.required')]
    }
  },
  computed: {
    ...mapState('settings', ['dark']),
    ...mapGetters('auth', ['loading', 'error', 'user'])
  },
  watch: {
    user (value) {
      // if user is logged in, redirect to homepage
      if (value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleSubmit () {
      // validate the form before calling login method
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const { username, password } = this.$data

          const payload = {
            username: username,
            password: password
          }

          Loading.show({
            message: 'Проверка учётных данных'
          })

          this.$store.dispatch('auth/signinUser', payload)
            .catch(err => {
              handleError(err)
            })
        }
      })
    }
  }
}
</script>
