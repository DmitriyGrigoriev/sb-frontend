<template>
  <q-form ref="passwordReset" class="q-gutter-md" @submit="updateForgottenPassword" greedy>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <error-banner :error="this.error"/>
    </transition>

<!--    <q-input-->
<!--      outlined-->
<!--      :placeholder="$t('auth.register.name')"-->
<!--      v-model="nickname"-->
<!--      :rules="required"-->
<!--      hide-bottom-space-->
<!--      v-test="{ id: 'nickname' }"-->
<!--      dark-->
<!--      :error="hasErrors('nickname')"-->
<!--      :error-message="getError('nickname')"-->
<!--    >-->
<!--      <template v-slot:prepend>-->
<!--        <q-icon name="alternate_email"></q-icon>-->
<!--      </template>-->
<!--    </q-input>-->
    <email-input
      v-model="username"
      dark
      :error="hasErrors('username')"
      :error-message="getError('username')"
    >
    </email-input>
    <password-input
      v-model="password"
      v-test="{ id: 'password' }"
      dark
      :error="hasErrors('password')"
      :error-message="getError('password')"
    />
    <password-input
      :placeholder="$t('auth.register.repeat_password')"
      v-model="passwordConfirmation"
      :rules="match"
      v-test="{ id: 'passwordConfirmation' }"
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
        {{ $t('auth.password.reset.enter') }}
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
import ValidationResponseHandler from '@/mixins/ResponseValidation'

export default {
  name: 'ResetForm',
  components: { ErrorBanner, EmailInput, PasswordInput },
  mixins: [ValidationResponseHandler],
  data () {
    return {
      nickname: '',
      username: '',
      password: '',
      passwordConfirmation: null,
      required: [val => !!val || this.$t('rules.required')],
      match: [
        val => !!val || this.$t('rules.required'),
        val => this.passwordMatch(val) || this.$t('auth.errors.password_match')
      ]
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
    updateForgottenPassword () {
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

<style scoped>

</style>
