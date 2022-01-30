<template>
  <q-input
    v-model="model"
    outlined
    :placeholder="$t('auth.login.email')"
    :dense="dense"
    type="email"
    @input="checkEmail"
    :rules="rules"
    hide-bottom-space
    :dark="dark"
    :error="error"
    :error-message="errorMessage"
  >
    <template v-slot:prepend>
      <q-icon name="email"></q-icon>
    </template>
    <template v-slot:append>
      <q-icon
        :name="emailAvailable ? 'done_outline' : 'cancel'"
        :color="emailAvailable ? 'primary' : 'negative'"
        v-show="model && !checkingEmail"
      />
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex'
import { validateEmail } from '@/utils'

export default {
  name: 'EmailInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      required: false,
      default () {
        return [
          val => !!val || this.$t('auth.errors.email_required'),
          val => this.validEmail(val) || this.$t('auth.errors.email')
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
  data () {
    return {
      emailAvailable: false,
      checkingEmail: true
    }
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get () {
        return this.$props.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    validEmail (val) {
      return validateEmail(val)
    },
    checkEmail () {
      const { email } = this.$data
      if (this.validEmail(email)) {
        this.checkingEmail = true
      }
    }
  }
}
// val => !!val || this.$t('auth.errors.email_required'),
// val => validateEmail(val) || this.$t('auth.errors.email')
</script>
