<template>
  <single-select
    :label="$t('pages.dictionary.servicetype.field.code.label')"
    v-model="model"
    :options="service_options"
    :loading="loading"
    :readonly="readonly"
    :clearable="false"
    :error="error"
    :error-message="errorMessage"
    optionlabel="code"
    @refetch="fetchServiceType"
  ></single-select>
</template>
<!--:rules="[val => !!val || $t('rules.required')]"-->

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect'
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'

export default {
  name: 'SelectServiceType',
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
      service_options: []
    }
  },
  methods: {
    ...mapActions('measure', ['fetchServiceType']),
    async fetchServiceTypeData () {
      this.loading = true
      const response = await this.fetchServiceType()
      setTimeout(() => {
        const data = handleResponse(response)
        this.service_options = data
      }, 500)
      this.loading = false
    }
  },
  created () {
    this.fetchServiceTypeData()
  }
}
</script>

<style scoped>

</style>
