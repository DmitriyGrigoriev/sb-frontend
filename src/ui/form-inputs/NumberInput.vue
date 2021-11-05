<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-input
      v-model="model"
      :dense="dense"
      :readonly="readonly"
      :rules="rules"
      :hint="hint"
      clearable
      type="number"
      :suffix="suffix"
      outlined
      label-color="orange-10"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NumberInput',
  props: ['label', 'value', 'readonly', 'rules', 'hint', 'suffix'],
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
