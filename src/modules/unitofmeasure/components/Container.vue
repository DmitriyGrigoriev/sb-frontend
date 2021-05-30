<template>
  <page-container>
    <template v-slot:title>
      <page-title :title="$t('pages.dictionary.measure.add.title')" icon="add_box">
        <help-button @click="showHelp"></help-button>
      </page-title>
    </template>

    <slot name="form"></slot>

  </page-container>

</template>

<script>
import PageTitle from '@/ui/page/PageTitle'
import PageContainer from '@/ui/page/PageContainer'
import HelpButton from '@/ui/buttons/HelpButton'

export default {
  name: 'Container',
  components: {
    HelpButton,
    PageContainer,
    PageTitle
  },
  methods: {
    /* title:   Помощь
       message: Добавьте в Общероссийский классификатор единиц измерения
                соответствующие данные, используемые вами в вашей сфере деятельности
    */
    showHelp () {
      this.$q.dialog({
        title: this.$t('pages.dictionary.measure.add.help.title'),
        message: this.$t('pages.dictionary.measure.add.help.message'),
        html: true
      })
    },
    goTo () {
      this.$router.push({ name: 'measure' })
    }
  },
  created () {
    this.$bus.$on('goto', (event) => {
      this.goTo()
    })
  }
}
</script>

<style scoped>

</style>
