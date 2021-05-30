<template>
  <div class="col">
    <div class="row text-caption text-weight-bold items-center justify-between">
      {{ label }}
    </div>
    <q-input
      square
      outlined
      clearable
      hide-bottom-space
      label-color="orange-10"
      v-model="model"
      :type="type"
      :dense="$q.screen.lt.md"
      :readonly="readonly"
      :rules="rules"
      :max-length="maxlength"
      :hint="hint"
      :mask="mask"
      :fill-mask="fillMask"
      :placeholder="placeholder"
      :error="error"
      :error-message="errorMessage"
    >
      <!-- Property errorMessage === error-message it's flow from camelCase rule -->
      <template v-slot:append>
        <q-btn
          v-if="withNa"
          flat
          label="N/A"
          @click="model = 'N/A'"
          color="red"
        ></q-btn>
      </template>
    </q-input>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TextInput',
  props: {
    type: String,
    label: String,
    value: [String, Number],
    readonly: Boolean,
    rules: Array,
    maxlength: Number,
    hint: String,
    mask: String,
    fillMask: String,
    placeholder: String,
    error: Boolean,
    errorMessage: String,
    withNa: {
      type: Boolean,
      default: false
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
    },
    na: {
      get () {
        if (this.model && this.model.toLowerCase() === 'N/A') {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style>
.q-textarea .q-field__native {
  resize: none;
}
</style>
