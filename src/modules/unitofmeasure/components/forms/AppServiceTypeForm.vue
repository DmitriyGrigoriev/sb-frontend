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
            :label="$t('pages.dictionary.servicetype.field.code.label')"
            :hint="$t('pages.dictionary.servicetype.field.code.hint')"
            :error="hasErrors('code')"
            :error-message="getError('code')"
          >
          </text-input>

          <div class="column">
            <text-input
              v-model="description"
              :label="$t('pages.dictionary.servicetype.field.description.label')"
              :hint="$t('pages.dictionary.servicetype.field.description.hint')"
              :error="hasErrors('description')"
              :error-message="getError('description')"
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
  name: 'AppServiceTypeForm',
  mixins: [DataFormMixin],
  components: {
    DataForm,
    TextInput
  },
  data () {
    return {
      code: '',
      description: null,
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
        .dispatch('measure/getServiceType', this.$route.params.id)
        .then(res => {
          const data = handleResponse(res)
          this.code = data.code
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
      this.description = null
    },
    putForm () {
      const payload = {
        id: this.$route.params.id,
        code: this.code,
        description: this.description,
        version: this.version
      }
      // Show loading message
      // this.$bus.$emit('loading')
      this.$store.dispatch('measure/putServiceType', payload)
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
        description: this.description
      }
      // Show loading message
      // this.$bus.$emit('loading')
      // Add new measure
      this.$store
        .dispatch('measure/postServiceType', payload)
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
