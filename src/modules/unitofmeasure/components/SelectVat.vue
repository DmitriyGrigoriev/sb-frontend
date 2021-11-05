<template>
  <single-select
    :label="$t('pages.dictionary.vat.field.code.label')"
    v-model="model"
    :options="vat_options"
    :readonly="readonly"
    :clearable="false"
    :error="error"
    :error-message="errorMessage"
    optionlabel="code"
    @refetch="fetchVatData"
  ></single-select>

</template>
<!--:rules="[val => !!val || $t('rules.required')]"-->

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect'
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'

export default {
  name: 'SelectVat',
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
      vat_options: []
    }
  },
  methods: {
    ...mapActions('measure', ['fetchVat']),
    async fetchVatData () {
      const response = await this.fetchVat()
      setTimeout(() => {
        const data = handleResponse(response)
        this.vat_options = data
      }, 500)
    }
  },
  created () {
    this.fetchVatData()
  }
}
</script>

<style scoped>

</style>
