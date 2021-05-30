<template id="measure-form">
  <div style="margin-bottom: 70px;">
    <q-form
      @submit="$emit('submit')"
      @reset="confirmReset"
      greedy
      style="margin-bottom: 70px;"
    >

      <slot name="header"></slot>

      <q-card flat square>
        <q-card-section class="q-gutter-sm">
          <text-input
            v-model="code"
            :label="$t('pages.dictionary.measure.field.code.label')"
            :hint="$t('pages.dictionary.measure.field.code.hint')"
            :error="hasErrors('code')"
            :error-message="getError('code')"
          >
          </text-input>

          <div class="column">
            <text-input
              v-model='okei_code'
              :label="$t('pages.dictionary.measure.field.okei_code.label')"
              :hint="$t('pages.dictionary.measure.field.okei_code.hint')"
              mask="###"
              fill-mask="000"
              :error="hasErrors('okei_code')"
              :error-message="getError('okei_code')"
            />
          </div>
          <div class="column">
            <text-input
              v-model="description"
              :label="$t('pages.dictionary.measure.field.description.label')"
              :hint="$t('pages.dictionary.measure.field.description.hint')"
              :error="hasErrors('description')"
              :error-message="getError('description')"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <slot name="action"></slot>
        </q-card-actions>

      </q-card>
    </q-form>
  </div>

</template>

<script>
import TextInput from '@/ui/form-inputs/TextInput'
import ValidationResponseHandler from '@/mixins/ResponseValidation'

export default {
  name: 'MeasureForm',
  mixins: [ValidationResponseHandler],
  components: {
    TextInput
  },
  data () {
    return {
      errors: {},
      code: '',
      okei_code: null,
      description: null
    }
  },
  methods: {
    loadingShow () {
      this.clearErrors()
      this.$q.loading.show({
        message: this.$t('pages.dictionary.measure.add.notify.loading')
      })
    },
    /*
      title: Подтвердите
      message: Вы уверены, что хотите очистить форму?
    */
    confirmReset () {
      this.$q
        .dialog({
          title: this.$t('pages.dictionary.measure.dialogues.reset.title'),
          message: this.$t('pages.dictionary.measure.dialogues.reset.message'),
          persistent: true,
          ok: {
            label: this.$t('pages.dictionary.measure.dialogues.reset.buttons.ok')
          },
          cancel: {
            label: this.$t('pages.dictionary.measure.dialogues.reset.buttons.cancel')
          }
        })
        .onOk(() => {
          this.resetForm()
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
    },
    resetForm () {
      this.code = null
      this.okei_code = null
      this.description = null
    },
    responseError (error) {
      if (typeof error.response !== 'undefined' && error.response.status === 400) {
        this.syncErrors(error)
      } else {
        this.showErrorNotification(error)
      }
    }
  },
  created () {
    this.$bus.$on('resetform', (event) => {
      this.resetForm()
    })
    this.$bus.$on('loading', (event) => {
      this.loadingShow()
    })
    this.$bus.$on('response-error', (error) => {
      this.responseError(error)
    })
  }
}
</script>

<style scoped>

</style>
