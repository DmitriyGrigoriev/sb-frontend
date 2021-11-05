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
            :label="$t('pages.dictionary.noseries.field.code.label')"
            :hint="$t('pages.dictionary.noseries.field.code.hint')"
            :error="hasErrors('code')"
            :error-message="getError('code')"
          >
          </text-input>

          <div class="column">
            <text-input
              v-model="description"
              :label="$t('pages.dictionary.noseries.field.description.label')"
              :hint="$t('pages.dictionary.noseries.field.description.hint')"
              :error="hasErrors('description')"
              :error-message="getError('description')"
            />
          </div>
          <div class="column">
            <q-checkbox
              v-model="date_order"
              :label="$t('pages.dictionary.noseries.field.date_order.label')"
              :hint="$t('pages.dictionary.noseries.field.date_order.hint')"
              :error="hasErrors('date_order')"
              :error-message="getError('date_order')"
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
import DataFormMixin from '../../mixins/DataForm'
import { handleResponse } from '@/utils'

export default {
  name: 'AppSeriesForm',
  mixins: [DataFormMixin],
  components: {
    // CheckboxInput,
    DataForm,
    TextInput
  },
  data () {
    return {
      code: '',
      description: null,
      date_order: false,
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
        .dispatch('measure/getSeries', this.$route.params.id)
        .then(res => {
          const data = handleResponse(res)
          this.code = data.code
          this.date_order = data.date_order
          this.description = data.description
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
      this.date_order = false
      this.description = null
    },
    putForm () {
      const payload = {
        id: this.$route.params.id,
        code: this.code,
        date_order: this.date_order,
        description: this.description,
        version: this.version
      }
      // Show loading message
      // this.$bus.$emit('loading')
      this.$store.dispatch('measure/putSeries', payload)
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
        date_order: this.date_order,
        description: this.description
      }
      // Show loading message
      // this.$bus.$emit('loading')
      // Add new measure
      this.$store
        .dispatch('measure/postSeries', payload)
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

<style scoped>

</style>
