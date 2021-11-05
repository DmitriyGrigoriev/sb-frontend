<template>
  <div class="col">
    <span v-if="labeled" class="text-caption text-weight-bold">{{ label }}</span>
    <q-input
      v-model="model"
      :dense="dense"
      :readonly="readonly"
      :rules="rules"
      :hint="hint"
      :clearable="clearable"
      labeled
      type="number"
      mask="#.##"
      fill-mask="#"
      :outlined="outlined"
      label-color="orange-10"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DecimalInput',
  props:
    {
      label: String,
      labeled: {
        type: Boolean,
        default: true
      },
      outlined: {
        type: Boolean,
        default: true
      },
      clearable: {
        type: Boolean,
        default: true
      },
      value: [String, Number],
      readonly: Boolean,
      rules: Array,
      hint: String
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
  }
}
</script>

<style scoped>

</style>
