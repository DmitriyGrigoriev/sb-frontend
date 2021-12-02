<template>
  <data-form
    @fetch="fetchForm"
    @reset="resetForm"
    @put="putForm"
    @post="postForm"
    @clearerrors="clearErrors"
    :confirm-next-step="requiredConfirm"
  >
    <template v-slot:form-data>
      <q-card flat square>
        <q-card-section class="q-gutter-sm">
          <text-input
            v-model.trim="code"
            :label="$t('pages.dictionary.service.field.code.label')"
            :hint="$t('pages.dictionary.service.field.code.hint')"
            :error="hasErrors('code')"
            :error-message="getError('code')"
          >
          </text-input>

          <div class="column">
            <select-prices
              @fetch="getPrices"
              :service="getServiceId"
              :error="hasErrors('prices')"
              :error-message="getError('prices')"
            />
          </div>

          <div class="column">
            <text-input
              v-model="description"
              :label="$t('pages.dictionary.service.field.description.label')"
              :hint="$t('pages.dictionary.service.field.description.hint')"
              :error="hasErrors('description')"
              :error-message="getError('description')"
            />
          </div>

          <div class="column">
            <with-text :label="$t('pages.dictionary.service.field.full_name.label')">
              <q-editor v-model.trim="full_name" min-height="5rem" />
            </with-text>
          </div>

          <div class="column">
            <select-service-type
              v-model="service_type"
              :error="hasErrors('service_type')"
              :error-message="getError('service_type')"
            ></select-service-type>
          </div>

          <div class="column">
            <select-measure
              v-model="unit_of_measure"
              :error="hasErrors('unit_of_measure')"
              :error-message="getError('unit_of_measure')"
            ></select-measure>
          </div>

          <div class="column">
            <select-vat
              v-model="vat_posting_group"
              :error="hasErrors('vat_posting_group')"
              :error-message="getError('vat_posting_group')"
            ></select-vat>
          </div>

          <div class="column">
            <text-input
              v-model="external_service_code"
              :label="$t('pages.dictionary.service.field.external_service_code.label')"
              :hint="$t('pages.dictionary.service.field.external_service_code.hint')"
              :error="hasErrors('external_service_code')"
              :error-message="getError('external_service_code')"
            />
          </div>

        </q-card-section>

        <q-card-actions align="right">
          <slot name="action"></slot>
        </q-card-actions>

      </q-card>

    </template>

  </data-form>

</template>

<script>
import DataForm from './DataForm'
import WithText from '../WithText'
import SelectServiceType from '../SelectServiceType'
import SelectMeasure from '../SelectMeasure'
import SelectVat from '../SelectVat'
import SelectPrices from '../SelectPrices'
import TextInput from '@/ui/form-inputs/TextInput'
import DataFormMixin from '../../mixins/DataForm'
import { handleResponse } from '@/utils'

export default {
  name: 'AppServiceForm',
  mixins: [DataFormMixin],
  components: {
    SelectPrices,
    SelectMeasure,
    SelectVat,
    DataForm,
    TextInput,
    WithText,
    SelectServiceType
  },
  data () {
    return {
      code: '',
      description: null,
      full_name: '',
      service_type: null,
      unit_of_measure: null,
      vat_posting_group: null,
      unit_price: null,
      price_date: null,
      external_service_code: null,
      version: 0,
      prices: []
    }
  },
  computed: {
    getServiceId () {
      if (Object.prototype.hasOwnProperty.call(this.$route.params, 'id')) {
        // edit-service
        return this.$route.params.id
      }
      return '0'
    }
  },
  methods: {
    // Fetch current record
    fetchForm () {
      // Show loading message
      // this.$emit('loading')
      // Loading record by id and show it.
      this.$store
        .dispatch('measure/getService', this.getServiceId)
        .then(res => {
          const data = handleResponse(res)
          this.code = data.code
          this.description = data.description
          this.full_name = data.full_name
          this.service_type = data.service_type
          this.unit_of_measure = data.unit_of_measure
          this.vat_posting_group = data.vat_posting_group
          this.unit_price = data.unit_price
          this.price_date = data.price_date
          // this.prices = data.prices
          this.external_service_code = data.external_service_code
          this.version = data.version
        })
        .catch(error => {
          // call mixin method
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    resetForm () {
      this.code = ''
      this.description = null
      this.full_name = ''
      this.service_type = null
      this.unit_of_measure = null
      this.vat_posting_group = null
      this.unit_price = null
      this.external_service_code = null
      this.prices = []
    },
    putForm () {
      const payload = this.getPayload()
      payload.id = this.$route.params.id
      // Show loading message
      // this.$bus.$emit('loading')
      this.$store.dispatch('measure/putService', payload)
        .then(res => {
          // call mixin method
          this.success()
          // route to IndexPage
          this.$emit('goto')
        })
        .catch(error => {
          // call mixin method
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    postForm () {
      const payload = this.getPayload()
      // Show loading message
      // this.$bus.$emit('loading')
      // Add new measure
      this.$store
        .dispatch('measure/postService', payload)
        .then(res => {
          this.success()
          // Call method: nextStep() from component DataForm
          // this.requiredConfirm = true
        })
        .catch(error => {
          this.responseError(error)
        })
        .finally(() => {
          // this.requiredConfirm = false
          this.$q.loading.hide()
        })
    },
    getPayload () {
      const payload = {
        code: this.code,
        description: this.description,
        full_name: this.full_name,
        service_type: this.service_type,
        unit_of_measure: this.unit_of_measure,
        vat_posting_group: this.vat_posting_group,
        unit_price: this.unit_price,
        prices: [],
        external_service_code: this.external_service_code,
        version: this.version
      }
      this.prices.forEach((price) => {
        payload.prices.push({
          id: price.id,
          service: price.service,
          price: price.price,
          start_date: price.start_date,
          deleted: price.deleted,
          version: price.version
        })
      })
      return payload
    },
    getPrices (newPrices) {
      this.prices = newPrices
    }
  }
}
</script>

<style scoped>

</style>
