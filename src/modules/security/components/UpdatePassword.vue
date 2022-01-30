<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">{{ $t('components.update_password.text.title') }}</span>
      <p class="text-caption">
        {{ $t('components.update_password.text.subtitle') }}
      </p>
    </div>
    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-form
        ref="changePasswordForm"
        @submit="handleSubmit"
        class="q-gutter-y-sm"
        greedy
      >
        <div>
          <span class="text-weight-bold">{{ $t('components.update_password.current_pass.label') }}</span>
          <password-input
            v-model="current_password"
            :error="hasErrors('current_password')"
            :error-message="getError('current_password')"
          ></password-input>
        </div>

        <div>
          <span class="text-weight-bold">{{ $t('components.update_password.new_pass.label') }}</span>
          <password-input
            v-model="new_password"
            :error="hasErrors('new_password')"
            :error-message="getError('new_password')"
          ></password-input>
        </div>

        <div>
          <span class="text-weight-bold">{{ $t('components.update_password.confirm_pass.label') }}</span>
          <password-input
            v-model="re_new_password"
            :placeholder="$t('components.update_password.confirm_pass.placeholder')"
            :rules="[
              val => !!val || this.$t('rules.required'),
              val => val === new_password || $t('auth.errors.password_match')
            ]"
            :error="hasErrors('re_new_password')"
            :error-message="getError('re_new_password')"
          ></password-input>
        </div>

        <div>
          <q-btn type="submit" :label="$t('components.update_password.buttons.update.label')" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import PasswordInput from '@/ui/form-inputs/PasswordInput'
import ValidationResponseHandler from '@/mixins/ResponseValidation'
import { showSuccessNotification } from '@/functions/function-show-notifications'

/* eslint-disable camelcase */
export default {
  components: { PasswordInput },
  name: 'UpdatePassword',
  mixins: [ValidationResponseHandler],
  data () {
    return {
      showPassword: false,
      current_password: '',
      new_password: '',
      re_new_password: ''
    }
  },

  methods: {
    handleSubmit () {
      this.$refs.changePasswordForm.validate().then(success => {
        if (success) {
          const { new_password, current_password, re_new_password } = this.$data
          const payload = {
            current_password: current_password,
            new_password: new_password,
            re_new_password: re_new_password
          }
          this.updatePasswordDialog(payload)
        } else {

        }
      })
    },

    updatePasswordDialog (payload) {
      this.$q
        .dialog({
          title: this.$t('components.update_password.dialog.title'),
          message: this.$t('components.update_password.dialog.message'),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store.dispatch('auth/updatePassword', payload)
            .then(res => {
              showSuccessNotification(this.$t('auth.password.set_password.success'))
            })
            .catch(error => {
              this.responseError(error)
            })
            .finally(() => {
              this.$q.loading.hide()
            })
          this.reset()
        })
    },

    reset () {
      this.current_password = ''
      this.new_password = ''
      this.re_new_password = ''
    }
  }
}
</script>
