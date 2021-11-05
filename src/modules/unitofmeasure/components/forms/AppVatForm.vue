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
            v-model="code"
            :label="$t('pages.dictionary.vat.field.code.label')"
            :hint="$t('pages.dictionary.vat.field.code.hint')"
            :error="hasErrors('code')"
            :error-message="getError('code')"
          >
          </text-input>

          <div class="column">
            <text-input
              v-model='vat'
              :label="$t('pages.dictionary.vat.field.vat.label')"
              mask="##.##"
              fill-mask="00.00"
              :hint="$t('pages.dictionary.vat.field.vat.hint')"
              :error="hasErrors('vat')"
              :error-message="getError('vat')"
            />
          </div>
          <div class="column">
            <text-input
              v-model="description"
              :label="$t('pages.dictionary.vat.field.description.label')"
              :hint="$t('pages.dictionary.vat.field.description.hint')"
              :error="hasErrors('description')"
              :error-message="getError('description')"
            />
          </div>
          <div class="column">
            <q-checkbox
              v-model="vatextempt"
              :label="$t('pages.dictionary.vat.field.vatextempt.label')"
              :hint="$t('pages.dictionary.vat.field.description.hint')"
              :error="hasErrors('vatextempt')"
              :error-message="getError('vatextempt')"
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
import TextInput from '@/ui/form-inputs/TextInput'
// import CheckboxInput from '@/ui/form-inputs/CheckboxInput'
import DataFormMixin from '../../mixins/DataForm'
import { handleResponse } from '@/utils'

export default {
  name: 'VatForm',
  mixins: [DataFormMixin],
  components: {
    // CheckboxInput,
    DataForm,
    TextInput
  },
  data () {
    return {
      code: '',
      vat: null,
      description: null,
      vatextempt: false,
      version: null
    }
  },
  methods: {
    // Fetch current record
    fetchForm () {
      // Show loading message
      this.$emit('loading')
      // Loading record by id and show it.
      this.$store
        .dispatch('measure/getVat', this.$route.params.id)
        .then(res => {
          const data = handleResponse(res)
          this.code = data.code
          this.vat = data.vat
          this.description = data.description
          this.vatextempt = data.vatextempt
          this.version = data.version
        })
        .catch(error => {
          // call mixin method
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    resetForm () {
      this.code = null
      this.vat = null
      this.description = null
      this.vatextempt = null
    },
    putForm () {
      const payload = {
        id: this.$route.params.id,
        code: this.code,
        vat: this.vat,
        description: this.description,
        vatextempt: this.vatextempt,
        version: this.version
      }
      // Show loading message
      // this.$bus.$emit('loading')
      this.$store.dispatch('measure/putVat', payload)
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
      const payload = {
        code: this.code,
        vat: this.vat,
        description: this.description,
        vatextempt: this.vatextempt
      }
      // Show loading message
      // this.$bus.$emit('loading')
      // Add new measure
      this.$store
        .dispatch('measure/postVat', payload)
        .then(res => {
          this.success()
          // Call method: nextStep() from component DataForm
          this.requiredConfirm = true
        })
        .catch(error => {
          this.responseError(error)
        })
        .finally(() => {
          this.requiredConfirm = false
          this.$q.loading.hide()
        })
    }
  }
}
</script>
