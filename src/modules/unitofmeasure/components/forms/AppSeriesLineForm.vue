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
          <select-series
            v-model="series_no"
            :readonly="seriesBlocked"
          ></select-series>

          <div class="column">
            <date-input-format
              v-model="starting_date"
              :label="$t('pages.dictionary.noseriesline.field.starting_date.label')"
              :hint="$t('pages.dictionary.noseriesline.field.starting_date.hint')"
              :readonly="seriesBlocked"
              :error="hasErrors('starting_date')"
              :error-message="getError('starting_date')"
            />
          </div>
          <text-input
            v-model="starting_no"
            :label="$t('pages.dictionary.noseriesline.field.starting_no.label')"
            :hint="$t('pages.dictionary.noseriesline.field.starting_no.hint')"
            :readonly="seriesBlocked"
            :error="hasErrors('starting_no')"
            :error-message="getError('starting_no')"
          >
          </text-input>
          <text-input
            v-model="ending_no"
            :label="$t('pages.dictionary.noseriesline.field.ending_no.label')"
            :hint="$t('pages.dictionary.noseriesline.field.ending_no.hint')"
            :readonly="seriesBlocked"
            :error="hasErrors('ending_no')"
            :error-message="getError('ending_no')"
          >
          </text-input>
          <div class="column">
            <date-input-format
              v-model="last_date_used"
              :label="$t('pages.dictionary.noseriesline.field.last_date_used.label')"
              :hint="$t('pages.dictionary.noseriesline.field.last_date_used.hint')"
              :readonly="seriesBlocked"
              :error="hasErrors('last_date_used')"
              :error-message="getError('last_date_used')"
            />
          </div>
          <text-input
            v-model="warning_no"
            :label="$t('pages.dictionary.noseriesline.field.warning_no.label')"
            :hint="$t('pages.dictionary.noseriesline.field.warning_no.hint')"
            :readonly="seriesBlocked"
            :error="hasErrors('warning_no')"
            :error-message="getError('warning_no')"
          >
          </text-input>
          <text-input
            v-model="last_no_used"
            :label="$t('pages.dictionary.noseriesline.field.last_no_used.label')"
            :hint="$t('pages.dictionary.noseriesline.field.last_no_used.hint')"
            :readonly="seriesBlocked"
            :error="hasErrors('last_no_used')"
            :error-message="getError('last_no_used')"
          >
          </text-input>
          <number-input
            v-model="increment_by"
            :label="$t('pages.dictionary.noseriesline.field.increment_by.label')"
            :hint="$t('pages.dictionary.noseriesline.field.increment_by.hint')"
            :readonly="seriesBlocked"
            :error="hasErrors('increment_by')"
            :error-message="getError('increment_by')"
          >
          </number-input>
          <div class="column">
            <q-checkbox
              v-model="blocked"
              :label="$t('pages.dictionary.noseriesline.field.blocked.label')"
              :hint="$t('pages.dictionary.noseriesline.field.blocked.hint')"
              :error="hasErrors('blocked')"
              :error-message="getError('blocked')"
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
import { BLOCKED_SERIES } from '@/constants/dictionary'
import DataForm from './DataForm'
import TextInput from '@/ui/form-inputs/TextInput'
import NumberInput from '@/ui/form-inputs/NumberInput'
import DateInputFormat from '@/ui/form-inputs/DateInputFormat'
import DataFormMixin from '../../mixins/DataForm'
import { handleResponse } from '@/utils'
import SelectSeries from '@/ui/dictionary/SelectSeries'

export default {
  name: 'AppSeriesLineForm',
  mixins: [DataFormMixin],
  components: {
    NumberInput,
    SelectSeries,
    DataForm,
    DateInputFormat,
    TextInput
  },
  data () {
    return {
      series_no: null,
      starting_date: null,
      starting_no: null,
      ending_no: null,
      last_date_used: null,
      warning_no: null,
      last_no_used: null,
      increment_by: null,
      blocked: false,
      version: null
    }
  },
  computed: {
    seriesBlocked () {
      if (Object.prototype.hasOwnProperty.call(this.$route.params, 'blocked')) {
        return this.$route.params.blocked === 'blocked'
      } else {
        return false
      }
    }
  },
  methods: {
    // Fetch current record
    fetchForm () {
      // Loading record by id and show it.
      const payload = this.$route.params
      payload[`${BLOCKED_SERIES}`] = this.seriesBlocked
      this.$store
        .dispatch('measure/getSeriesLine', payload)
        .then(res => {
          const data = handleResponse(res)
          this.series_no = data.series_no
          this.starting_date = data.starting_date
          this.starting_no = data.starting_no
          this.ending_no = data.ending_no
          this.last_date_used = data.last_date_used
          this.warning_no = data.warning_no
          this.last_no_used = data.last_no_used
          this.increment_by = data.increment_by
          this.blocked = data.blocked
          this.version = data.version
        })
        .catch(error => {
          // call mixin method
          this.responseError(error)
        })
        .finally(
          () => this.$q.loading.hide()
        )
    },
    resetForm () {
      this.series_no = null
      this.starting_date = null
      this.starting_no = null
      this.ending_no = null
      this.last_date_used = null
      this.warning_no = null
      this.last_no_used = null
      this.increment_by = null
      this.blocked = false
    },
    putForm () {
      const payload = {
        id: this.$route.params.id,
        code: this.code,
        series_no: this.series_no,
        starting_date: this.starting_date,
        starting_no: this.starting_no,
        ending_no: this.ending_no,
        last_date_used: this.last_date_used,
        warning_no: this.warning_no,
        last_no_used: this.last_no_used,
        increment_by: this.increment_by,
        blocked: this.blocked,
        version: this.version
      }
      payload[`${BLOCKED_SERIES}`] = this.seriesBlocked
      // Show loading message
      this.$store.dispatch('measure/putSeriesLine', payload)
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
        series_no: this.series_no,
        starting_date: this.starting_date,
        starting_no: this.starting_no,
        ending_no: this.ending_no,
        last_date_used: this.last_date_used,
        warning_no: this.warning_no,
        last_no_used: this.last_no_used,
        increment_by: this.increment_by,
        blocked: this.blocked
      }
      // last_date_used: date.extractDate(this.last_date_used, 'YYYY/MM/DD'),
      // Add new Series Line
      this.$store
        .dispatch('measure/postSeriesLine', payload)
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
          // this.$q.loading.hide()
        })
    }
  }
}
</script>

<style scoped>

</style>
