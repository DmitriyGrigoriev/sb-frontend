<template>
  <container
    ref="container"
  >
    <template v-slot:form>
      <edit-measure @saved="saved = true"></edit-measure>
    </template>
  </container>
</template>

<script>
import Container from '../components/Container'
import EditMeasure from '../components/EditMeasure'

export default {
  name: 'MeasureEdit',
  components: {
    Container,
    EditMeasure
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
