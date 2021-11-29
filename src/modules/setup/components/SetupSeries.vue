<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">{{ $t('pages.setup.noseries.title') }}</span>
      <p class="text-caption">
        {{ $t('pages.setup.noseries.subtitle') }}
      </p>
    </div>
    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-form
        ref="setupSeriesForm"
        @submit="handleSubmit"
        class="q-gutter-y-sm"
        greedy
      >
        <div>
          <select-series
            v-model="series_no"
          ></select-series>
        </div>
        <div>
          <submit-button :label="$t('buttons.submit.label')" @click="handleSubmit" />
        </div>
      </q-form>
    </div>
  </div>

</template>

<script>
import SelectSeries from '@/ui/dictionary/SelectSeries'
import ValidationResponseHandler from '@/mixins/ResponseValidation'
import { handleResponse } from '@/utils'
import SubmitButton from '@/ui/buttons/SubmitButton'

export default {
  name: 'SetupSeries',
  mixins: [ValidationResponseHandler],
  components: {
    SubmitButton,
    SelectSeries
  },
  data () {
    return {
      initial_id: null,
      series_no: null
    }
  },
  methods: {
    fetchForm () {
      // Loading record by id and show it.
      const payload = this.$route.params
      this.$store
        .dispatch('setup/fetchSetup', payload)
        .then(res => {
          const data = handleResponse(res)
          this.initial_id = data.id
          this.series_no = data.setup_series_no
          this.version = data.version
        })
        .catch(error => {
          // call mixin method
          if (
            Object.prototype.hasOwnProperty.call(error.response, 'status') &&
            error.response.status === 404
          ) {
            this.initial_id = 0
            this.series_no = ''
          } else {
            this.responseError(error)
          }
        })
        .finally(
          () => this.$q.loading.hide()
        )
    },
    putForm () {
      const payload = {
        id: this.initial_id,
        setup_series_no: this.series_no,
        version: this.version
      }
      // Show loading message
      this.$store.dispatch('setup/putSetup', payload)
        .then(res => {
          // call mixin method
          this.successNotification()
        })
        .catch(error => {
          // call mixin method
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    postForm () {
      const payload = {
        setup_series_no: this.series_no
      }
      // Add new Setup Series Code ID
      this.$store
        .dispatch('setup/postSetup', payload)
        .then(res => {
          this.successNotification()
        })
        .catch(error => {
          this.responseError(error)
        })
        .finally(() => {
          // this.$q.loading.hide()
        })
    },
    handleSubmit () {
      if (this.initial_id > 0) {
        this.putForm()
      } else {
        this.postForm()
      }
    }
  },
  mounted () {
    this.fetchForm()
  }
}
</script>

<style scoped>

</style>
