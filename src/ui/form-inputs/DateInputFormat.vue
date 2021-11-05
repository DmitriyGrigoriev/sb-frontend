<template>
  <q-input
    :value="computedDate"
    :label="label"
    :dense="dense"
    :hint="hint"
    stack-label
    :outlined="outlined"
    label-color="secondary"
    :rules="rules"
    :error="error"
    :error-message="errorMessage"
  >
<!--    :readonly="readOnly"-->
<!--    @focus="verplaatsFocus"-->
    <template v-slot:append>
      <q-icon name="event" color="secondary" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
<!--          @show="readOnly = true"-->
<!--          @hide="readOnly = false"-->
          <q-date
            color="secondary"
            v-model="displayValue"
            :readonly="readonly"
            @input="$refs.qDateProxy.hide()"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'DateInputFormat',
  props: {
    label: String,
    hint: String,
    value: String,
    rules: Array,
    readonly: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    error: Boolean,
    errorMessage: String
  },
  // data: () => ({
  //   readOnly: this.readonly
  // }),
  computed: {
    ...mapState('settings', ['dense']),
    computedDate: {
      get: function () {
        return this.formatComputedDate(this.displayValue)
      },
      set: function () {
        this.displayValue = null
      }
    },
    displayValue: {
      get: function () {
        return date.formatDate(this.value, 'YYYY/MM/DD')
      },
      set: function (val) {
        this.$emit('input', date.formatDate(val, 'YYYY-MM-DD'))
      }
    }
  },
  methods: {
    // verplaatsFocus () {
    //   document.activeElement.blur()
    //   this.$refs.qDateProxy.show()
    // },
    formatComputedDate (val) {
      return date.formatDate(val, 'DD/MM/YYYY')
    }
  }
}
</script>

<style scoped>

</style>
