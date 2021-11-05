<template>
  <single-select
    :label="$t('pages.dictionary.measure.field.code.label')"
    v-model="model"
    :options="measure_options"
    :readonly="readonly"
    :clearable="false"
    :error="error"
    :error-message="errorMessage"
    optionlabel="code"
    @refetch="fetchMeasureData"
  ></single-select>
</template>
<!--:rules="[val => !!val || $t('rules.required')]"-->

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect'
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'

export default {
  name: 'SelectMeasure',
  components: {
    SingleSelect
  },
  props: ['value', 'readonly', 'error', 'errorMessage'],
  computed: {
    model: {
      get () {
        return this.$props.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      measure_options: []
    }
  },
  methods: {
    ...mapActions('measure', ['fetchMeasure']),
    async fetchMeasureData () {
      const response = await this.fetchMeasure()
      setTimeout(() => {
        const data = handleResponse(response)
        this.measure_options = data
      }, 500)
    }
  },
  created () {
    this.fetchMeasureData()
  }
}
</script>

<style scoped>

</style>
