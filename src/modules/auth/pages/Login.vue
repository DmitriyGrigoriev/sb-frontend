<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center">
        <q-card bordered flat class="my-card bg-info" dark square>
          <div class="row q-pa-md text-weight-light text-h6">
            {{
              tab === 'login'
                ? $t('auth.login.login')
                : $t('auth.login.create')
            }}
          </div>

          <q-separator color="white" spaced />

          <q-card-section class="q-pa-md">
            <login-form v-if="tab === 'login'"></login-form>
            <!--The goTab event switch to login component after success registration process-->
            <signup-form @gotab="goTab" v-else></signup-form>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <div class="text-center">
              <span
                class="text-blue text-weight-lighter cursor-pointer"
                v-if="tab === 'login'"
                @click="showForgotPasswordDialog"
              >
                {{ $t('auth.login.password_forgot') }}
              </span>
            </div>
            <div class="text-center" v-if="tab === 'login'">
              {{ $t('auth.register.no_account') }}
              <span
                class="text-blue text-wight-bolder cursor-pointer"
                @click="goTab('signup')"
                >{{ $t('auth.register.register') }}</span
              >
            </div>
            <div class="text-center" v-else>
              {{ $t('auth.register.already_registered') }}
              <span
                class="text-blue text-weight-bolder cursor-pointer"
                @click="goTab('login')"
              >
                {{ $t('auth.login.enter') }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
// import { validateNick } from '@/utils'

export default {
  name: 'PageLogin',
  components: { SignupForm, LoginForm },
  data () {
    return {
      tab: 'login'
    }
  },
  computed: {
    ...mapState('settings', ['dark'])
  },
  methods: {
    ...mapActions('auth', ['forgotPassword', 'checkNickName', 'register', 'clearError']),
    showForgotPasswordDialog () {
      this.$q
        .dialog({
          title: this.$t('auth.password.forgot.header'),
          message: this.$t('auth.password.forgot.email'),
          prompt: {
            model: '',
            type: 'text'
          },
          cancel: true,
          persistent: true
        })
        .onOk(nickname => {
          this.forgotPassword(nickname)
          // const email = this.checkNickName(nickname)
          // if (email) {
          //   this.forgotPassword(email)
          // }
        })
      // isValid: val => validateNick(val)
    },
    goTab (val) {
      this.clearError()
      this.tab = val
    }
  }
}
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}

.fab.fa-google {
  color: #f44336;
}
</style>
