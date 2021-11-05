<template>
  <page-title :title="helpTitle" icon="add_box">
    <help-button v-if="showHelpButton" @click="showHelp"></help-button>
  </page-title>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle'
import HelpButton from '@/ui/buttons/HelpButton'

export default {
  name: 'AppFormPageTitle',
  components: {
    PageTitle,
    HelpButton
  },
  props: {
    showHelpButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    helpTitle () {
      return this.$t(`pages.dictionary.${this.$route.meta.indexPage}.title`)
    }
  },
  methods: {
    /* title:   Помощь
       message: Добавьте в Общероссийский классификатор единиц измерения
                соответствующие данные, используемые вами в вашей сфере деятельности
    */
    showHelp () {
      this.$q.dialog({
        title: this.$t(`pages.dictionary.${this.$route.meta.indexPage}.${this.$route.meta.currentMode}.help.title`),
        message: this.$t(`pages.dictionary.${this.$route.meta.indexPage}.${this.$route.meta.currentMode}.help.message`),
        html: true
      })
    }
  }
}
</script>

<style scoped>

</style>
