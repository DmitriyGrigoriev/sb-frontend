<template>
  <measure-form
    ref="measure"
    @submit="submitForm"
  >
    <template v-slot:header>
      <section-header :sectionTitle="$t('pages.dictionary.measure.mode.edit.title')" />
    </template>

    <template v-slot:action>
      <reset-button :label="$t('buttons.reset.label')" @click="$emit('confirmReset')" />
      <submit-button :label="$t('buttons.submit.label')" />
    </template>
  </measure-form>
</template>

<script>
import {
  showSuccessNotification
} from '@/functions/function-show-notifications'
import ResetButton from '@/ui/buttons/ResetButton'
import SubmitButton from '@/ui/buttons/SubmitButton'
import MeasureForm from './forms/MeasureForm'
import SectionHeader from '@/ui/components/SectionHeader'
import { handleResponse } from '@/utils'

export default {
  name: 'EditMeasure',
  components: {
    SectionHeader,
    MeasureForm,
    SubmitButton,
    ResetButton
  },
  methods: {
    submitForm () {
      const payload = {
        id: this.$route.params.id,
        code: this.$refs.measure.code,
        okei_code: this.$refs.measure.okei_code,
        description: this.$refs.measure.description
      }
      // Show loading message
      this.$bus.$emit('loading')
      this.$store.dispatch('measure/putMeasure', payload)
        .then(res => {
          if (res) {
            showSuccessNotification()
          }
          this.handleSaved()
        })
        .catch(error => {
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    /* Ask user before reset input fields */
    confirmReset () {
      this.$emit('reset')
    },
    handleSaved () {
      this.saved()
      this.$bus.$emit('goto')
    },
    // Fetch current record
    fetchData () {
      // Show loading message
      this.$emit('loading')
      // Loading record by id and show it.
      this.$store
        .dispatch('measure/getMeasure', this.$route.params.id)
        .then(res => {
          const data = handleResponse(res)
          this.$refs.measure.code = data.code
          this.$refs.measure.okei_code = data.okei_code
          this.$refs.measure.description = data.description
        })
        .catch(error => {
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    saved () {
      this.$emit('saved')
    },
    responseError (error) {
      this.$bus.$emit('response-error', error)
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>
