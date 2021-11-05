<template id="data-form">
  <div>
    <q-banner
      class="bg-green-5 text-white col-xl-6 col-lg-6 col-md-8 col-sm-9 col-xs-12 q-mb-md"
      v-if="conflict_status"
    >
      <template v-slot:avatar>
        <q-icon name="info" color="white" />
      </template>
      {{ $t('responses.errors.conflict.message')}}
      <template v-slot:action>
        <refresh-button @click="onRefresh" />
      </template>
    </q-banner>

    <div style="margin-bottom: 70px;">
      <q-form
        greedy
        style="margin-bottom: 70px;"
      >

        <section-header :sectionTitle="getTitle" />

        <slot name="form-data"></slot>

        <q-card-actions align="right">
          <reset-button :label="$t('buttons.reset.label')" @click="confirmReset" />
          <submit-button :label="$t('buttons.submit.label')" @click="submitForm" />
        </q-card-actions>

      </q-form>
    </div>
  </div>

</template>

<script>
import ResetButton from '@/ui/buttons/ResetButton'
import SubmitButton from '@/ui/buttons/SubmitButton'
import SectionHeader from '@/ui/components/SectionHeader'
import RefreshButton from '@/ui/buttons/RefreshButton'

export default {
  name: 'DataForm',
  components: {
    RefreshButton,
    SubmitButton,
    SectionHeader,
    ResetButton
  },
  props: {
    confirmNextStep: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      error409: false
    }
  },
  watch: {
    confirmNextStep: function (value) {
      if (value) {
        this.nextStep()
      }
    }
  },
  computed: {
    currentMode () {
      return this.$route.meta.currentMode
    },
    getTitle () {
      return this.$t(`pages.dictionary.mode.${this.currentMode}.title`)
    },
    conflict_status () {
      return this.error409
    }
  },
  methods: {
    onConflict () {
      this.error409 = true
    },
    onRefresh () {
      this.error409 = false
      this.$emit('clearerrors')
      this.$emit('fetch')
      // this.$emit('refresh')
    },
    /*
      Ask user before reset input fields
      title: Подтвердите
      message: Вы уверены, что хотите очистить форму?
    */
    confirmReset () {
      this.$q
        .dialog({
          title: this.$t('pages.dictionary.dialogues.reset.title'),
          message: this.$t('pages.dictionary.dialogues.reset.message'),
          persistent: true,
          ok: {
            label: this.$t('pages.dictionary.dialogues.reset.buttons.ok')
          },
          cancel: {
            label: this.$t('pages.dictionary.dialogues.reset.buttons.cancel')
          }
        })
        .onOk(() => {
          this.$emit('reset')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
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
    nextStep () {
      this.$emit('clearerrors')
      this.$emit('reset')
      // this.$q.dialog({
      //   title: this.$t('pages.dictionary.dialogues.postsave.title'),
      //   message: this.$t('pages.dictionary.dialogues.postsave.message'),
      //   html: true,
      //   persistent: true,
      //   ok: {
      //     label: this.$t('pages.dictionary.dialogues.postsave.buttons.ok')
      //   },
      //   cancel: {
      //     label: this.$t('pages.dictionary.dialogues.postsave.buttons.cancel')
      //   }
      // }).onOk(() => {
      //   this.$router.push({ name: this.$route.meta.indexPage })
      // }).onCancel(() => {
      //   this.$emit('reset')
      // }).onDismiss(() => {
      //   // console.log('I am triggered on both OK and Cancel')
      // })
    },
    submitForm () {
      switch (this.currentMode) {
        case 'add':
          this.$emit('post')
          break
        case 'edit':
          this.$emit('put')
          break
      }
    },
    goto () {
      this.$emit('goto')
    },
    saved () {
      this.$emit('saved')
    }
  },
  mounted () {
    if (this.currentMode === 'edit') {
      this.$emit('clearerrors')
      this.$emit('fetch')
    }
    this.$bus.$on('conflict-error', () => {
      // we are waiting for a message from the mixin ResponseValidation.js
      this.onConflict()
    })
  }
}
</script>

<style scoped>

</style>
