<!--https://forum.quasar-framework.org/topic/5596/q-select/12-->
<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }} <mini-refresh v-if="withRefresh" @click="refetch" /></span>
    <q-select
      v-model="model"
      :options="options"
      :option-label="optionlabel"
      :option-value="optionvalue"
      :hint="hint ? hint : void 0"
      :dense="dense"
      :options-dense="$q.screen.lt.md"
      :readonly="readonly"
      :loading="loading"
      :rules="rules"
      :clearable="clearable"
      :error="error"
      :error-message="errorMessage"
      outlined
      behavior="menu"
      label-color="secondary"
      square
      dropdown-icon="unfold_more"
      hide-bottom-space
      map-options
      emit-value
    >
    </q-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MiniRefresh from '../buttons/MiniRefresh'

export default {
  name: 'SingleSelect',
  components: { MiniRefresh },
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array
    },
    optionlabel: {
      type: String,
      default: 'name'
    },
    optionvalue: {
      type: String,
      default: 'id'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    error: Boolean,
    errorMessage: String,
    value: [String, Number, Boolean],
    hint: { type: String },
    rules: Array,
    readonly: Boolean,
    // loading: {
    //   type: Boolean,
    //   default: false
    // },
    withRefresh: Boolean
  },
  data () {
    return {
      loading: false
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
    refetch () {
      this.loading = true
      // console.log('refetch called')
      this.$emit('refetch')
      this.loading = false
    }
  }
}
</script>
