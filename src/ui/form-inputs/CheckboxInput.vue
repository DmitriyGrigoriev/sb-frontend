<template>
  <q-checkbox
    v-model="model"
    :label="label"
    :dense="dense"
    :hint="hint"
    :disable="disable"
    @input="handleInput"
    stack-label
    outlined
    readonly
    color="primary"
    :val="true"
  />
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: {
    label: String,
    hint: String,
    dense: {
      type: Boolean,
      default: false
    },
    disable: Boolean,
    value: Boolean
  },
  data () {
    return {
      model: null
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.model)
    }
  },
  mounted () {
    this.model = this.value
  }
}
</script>
