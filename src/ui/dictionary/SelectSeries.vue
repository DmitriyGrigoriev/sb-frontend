<template>
  <single-select
    :label="$t('pages.dictionary.noseriesline.field.series_no.label')"
    v-model="model"
    :options="series_options"
    :rules="[val => !!val || this.$t('rules.required')]"
    :loading="loading"
    :readonly="readonly"
    :clearable="false"
    :error="error"
    :error-message="errorMessage"
    optionlabel="code"
    @refetch="fetchSeriesNo"
  ></single-select>
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect'
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'

export default {
  name: 'SelectSeries',
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
      // series_code: null,
      series_options: []
      // series: []
    }
  },
  methods: {
    ...mapActions('measure', ['fetchSeries']),
    async fetchSeriesNo () {
      this.loading = true
      const response = await this.fetchSeries()
      setTimeout(() => {
        const data = handleResponse(response)
        this.series_options = data
      }, 500)
      this.loading = false
    }
  },
  created () {
    this.fetchSeriesNo()
  }
}
</script>

<style scoped>

</style>
