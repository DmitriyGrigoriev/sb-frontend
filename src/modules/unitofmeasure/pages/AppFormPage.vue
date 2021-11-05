<template>
  <app-form-container>
    <template v-slot:form>
      <component
        :is="currentFormComponent"
        @saved="saved = true"
        @goto="goTo"
      >
      </component>
    </template>
  </app-form-container>
</template>

<script>
import AppFormContainer from '../components/AppFormContainer'
import AppSeriesForm from '../components/forms/AppSeriesForm'
import AppSeriesLineForm from '../components/forms/AppSeriesLineForm'
import AppMeasureForm from '../components/forms/AppMeasureForm'
import AppVatForm from '../components/forms/AppVatForm'
import AppServiceTypeForm from '../components/forms/AppServiceTypeForm'
import AppServiceForm from '../components/forms/AppServiceForm'

export default {
  name: 'FormPage',
  components: {
    AppFormContainer,
    AppMeasureForm,
    AppVatForm,
    AppSeriesForm,
    AppSeriesLineForm,
    AppServiceTypeForm,
    AppServiceForm
  },
  data () {
    return {
      saved: false
    }
  },
  computed: {
    // Get formName from route DictionaryRoutes
    currentFormComponent () {
      return this.$route.meta.formName
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.saved && to.name !== 'error') {
      const answer = window.confirm(
        this.$t('pages.dictionary.dialogues.beforeleave.message')
      )
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  methods: {
    goTo () {
      this.$router.push({ name: this.$route.meta.indexPage })
    }
  },
  created () {
    this.saved = false
  }
}
</script>

<style scoped>

</style>
