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
            v-model="old_password"
            :placeholder="$t('components.update_password.current_pass.placeholder')"
            :rules="[val => !!val || $t('components.update_password.current_pass.rules')]"
          ></password-input>
        </div>

        <div>
          <span class="text-weight-bold">{{ $t('components.update_password.new_pass.label') }}</span>
          <password-input
            v-model="password"
            :placeholder="$t('components.update_password.new_pass.placeholder')"
            :rules="[
              val => val.length >= 8 || $t('components.update_password.new_pass.rules')
            ]"
          ></password-input>
        </div>

        <div>
          <span class="text-weight-bold">{{ $t('components.update_password.confirm_pass.label') }}</span>
          <password-input
            v-model="password_confirmation"
            :placeholder="$t('components.update_password.confirm_pass.placeholder')"
            :rules="[
              val => !!val || '* Required',
              val => val === password || $t('components.update_password.confirm_pass.rules')
            ]"
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
/* eslint-disable camelcase */
export default {
  components: { PasswordInput },

  name: 'UpdatePassword',

  data () {
    return {
      showPassword: false,
      old_password: '',
      password: '',
      password_confirmation: ''
    }
  },

  methods: {
    handleSubmit () {
      this.$refs.changePasswordForm.validate().then(success => {
        if (success) {
          const { password, old_password, password_confirmation } = this.$data

          const payload = {
            old_password: old_password,
            password: password,
            password_confirmation: password_confirmation
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
          this.$store
            .dispatch('security/updatePassword', payload)
            .then(res => {
              // check if successfully changed password
              if (
                res.updatePassword &&
                res.updatePassword.status === 'PASSWORD_UPDATED'
              ) {
                // confirm sign out
                this.$q.notify({
                  type: 'positive',
                  message: this.$t('components.update_password.dialog.success'),
                  position: 'bottom-right'
                })
              }
            })
            .catch(err => {
              this.$q.notify({
                type: 'negative',
                message: err.message,
                position: 'bottom-right'
              })
            })
            .finally(() => this.$q.loading.hide())
        })
    }
  }
}
</script>
