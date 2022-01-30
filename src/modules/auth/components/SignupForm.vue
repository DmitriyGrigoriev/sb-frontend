<template>
  <q-form ref="signupForm" class="q-gutter-md" @submit="handleSubmit" greedy>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <error-banner :error="this.error"/>
    </transition>

    <q-input
      outlined
      :placeholder="$t('auth.register.name')"
      v-model="nickname"
      :rules="required"
      :dense="dense"
      hide-bottom-space
      v-test="{ id: 'nickname' }"
      dark
      :error="hasErrors('nickname')"
      :error-message="getError('nickname')"
    >
      <template v-slot:prepend>
        <q-icon name="alternate_email"></q-icon>
      </template>
    </q-input>
    <email-input
      v-model="email"
      dark
      :error="hasErrors('email')"
      :error-message="getError('email')"
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
        :dense="dense"
      >
        {{ $t('auth.register.register') }}
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { Dialog } from 'quasar'
import { mapGetters, mapState } from 'vuex'
import ErrorBanner from './ErrorBanner'
import PasswordInput from '@/ui/form-inputs/PasswordInput'
import ValidationResponseHandler from '@/mixins/ResponseValidation'
import EmailInput from '@/ui/form-inputs/EmailInput'

export default {
  name: 'SignupForm',
  mixins: [ValidationResponseHandler],
  components: { EmailInput, ErrorBanner, PasswordInput },
  data () {
    return {
      nickname: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      required: [val => !!val || this.$t('rules.required')],
      match: [
        val => !!val || this.$t('rules.required'),
        val => this.passwordMatch(val) || this.$t('auth.errors.password_match')
      ]
    }
  },
  computed: {
    ...mapState('settings', ['dense', 'dark']),
    ...mapState('auth', ['loading']),
    ...mapGetters('auth', ['error'])
  },
  methods: {
    passwordMatch (val) {
      return val === this.password
    },
    handleSubmit () {
      const { nickname, email, password, passwordConfirmation } = this.$data

      this.$refs.signupForm.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('auth/register', {
              nickname: nickname,
              email: email,
              password: password,
              re_password: passwordConfirmation
            })
            .then(res => {
              Dialog.create({
                title: this.$t('auth.register.register_success'),
                message: this.$t('auth.register.account_created'),
                persistent: true,
                ok: true
              })
              this.$emit('gotab', 'login')
            })
            .catch(error => {
              this.responseError(error)
            })
            .finally(() => {
              this.$q.loading.hide()
            })
        }
      })
    }
  }
}
</script>
