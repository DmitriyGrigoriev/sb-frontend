<template>
  <measure-form
    ref="measure"
    @submit="submitForm"
  >
    <template v-slot:header>
      <section-header :sectionTitle="$t('pages.dictionary.measure.mode.add.title')" />
    </template>

    <template v-slot:action>
      <reset-button :label="$t('buttons.reset.label')" @click="$emit('confirmReset')" />
      <submit-button :label="$t('buttons.submit.label')" />
    </template>
  </measure-form>
</template>

<script>
import ResetButton from '@/ui/buttons/ResetButton'
import SubmitButton from '@/ui/buttons/SubmitButton'
import MeasureForm from './forms/MeasureForm'
import SectionHeader from '@/ui/components/SectionHeader'

export default {
  name: 'AddMeasure',
  components: {
    SectionHeader,
    MeasureForm,
    SubmitButton,
    ResetButton
  },
  methods: {
    // testGo () {
    //   this.$bus.$emit('goto')
    // },
    submitForm () {
      const payload = {
        code: this.$refs.measure.code,
        okei_code: this.$refs.measure.okei_code,
        description: this.$refs.measure.description
      }
      // Show loading message
      this.$bus.$emit('loading')
      // Add new measure
      this.$store
        .dispatch('measure/postMeasure', payload)
        .then(res => {
          this.handleSaved()
        })
        .catch(error => {
          this.saved()
          this.responseError(error)
        })
        .finally(() => this.$q.loading.hide())
    },
    handleSaved () {
      this.saved()
      this.confirmNextStep()
    },
    /*
      title: Успешное сохранение
      message:Вы хотите ввести еще одну еденицу измерения ? ' +
              'Нажмите <strong>Далее</strong>, если Да, или <strong>В начало</strong> если хотите вернуться ' +
              'в режим просмотра справочника.

      Ask user about next step:
      @ok: resume input new values
      @cancel: return to previous page
    */
    confirmNextStep () {
      this.$q.dialog({
        title: this.$t('pages.dictionary.measure.dialogues.postsave.title'),
        message: this.$t('pages.dictionary.measure.dialogues.postsave.message'),
        html: true,
        persistent: true,
        ok: {
          label: this.$t('pages.dictionary.measure.dialogues.postsave.buttons.ok')
        },
        cancel: {
          label: this.$t('pages.dictionary.measure.dialogues.postsave.buttons.cancel')
        }
      }).onOk(() => {
        this.$bus.$emit('goto')
      }).onCancel(() => {
        this.$bus.$emit('resetform')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    saved () {
      this.$emit('saved')
    },
    responseError (error) {
      this.$bus.$emit('response-error', error)
    }
  }
}
</script>

<style scoped>

</style>
