<template>
  <container>
    <template v-slot:form>
      <add-measure @saved="saved = true"></add-measure>
    </template>
  </container>
</template>

<script>
import Container from '../components/Container'
import AddMeasure from '../components/AddMeasure'

export default {
  name: 'MeasureAdd',
  components: {
    Container,
    AddMeasure
  },
  data () {
    return {
      saved: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.saved) {
      const answer = window.confirm(
        this.$t('pages.dictionary.measure.dialogues.beforeleave.message')
      )
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style scoped>

</style>
