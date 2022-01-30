<template>
  <q-input
    v-model="model"
    v-test="{ id: 'password' }"
    outlined
    :placeholder="$t('auth.login.password')"
    :type="!passwordVisibility ? 'password' : 'text'"
    :rules="rules"
    :label="label"
    stack-label
    :dense="dense"
    hide-bottom-space
    :dark="dark"
    autocomplete
    :error="error"
    :error-message="errorMessage"
  >
    <template v-slot:prepend>
      <q-icon name="vpn_key"></q-icon>
    </template>
    <template v-slot:append>
      <q-icon
        :name="!passwordVisibility ? 'visibility' : 'visibility_off'"
        @click="passwordVisibility = !passwordVisibility"
        class="cursor-pointer"
      ></q-icon>
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex'
import { AUTH_FIELD } from '@/constants/auth.js'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    rules: {
      type: Array,
      required: false,
      default () {
        return [
          val => !!val || this.$t('rules.required'),
          val => val.length >= AUTH_FIELD.passwordLength || this.$t('auth.password.errors.password_length', { length: AUTH_FIELD.passwordLength })
        ]
      }
    },
    dark: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  name: 'PasswordInput',
  data () {
    return {
      passwordVisibility: false
    }
  }
}
</script>
