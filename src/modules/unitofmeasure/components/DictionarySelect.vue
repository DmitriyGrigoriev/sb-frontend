<template id="dictionary-select">
  <div>
    <single-select
      v-model="selectedValue"
      :options="options"
      :set-dense="true"
      :options-dense="true"
      :clearable="false"
      style="width: 250px"
    ></single-select>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import SingleSelect from '@/ui/form-inputs/SingleSelect'

export default {
  name: 'DictionarySelect',
  components: {
    SingleSelect
  },
  computed: {
  },
  watch: {
    selectedValue (value) {
      this.setDictionary(value)
    }
  },
  created () {
    this.selectedValue = this.$route.name
  },
  methods: {
    ...mapActions('measure', ['setDictionary'])
  },
  data () {
    return {
      selectedValue: '',
      default_route: '',
      options: [
        { name: this.$t('pages.dictionary.measure.title'), id: 'measure' },
        { name: this.$t('pages.dictionary.vat.title'), id: 'vat' },
        { name: this.$t('pages.dictionary.noseries.title'), id: 'noseries' },
        { name: this.$t('pages.dictionary.noseriesline.title'), id: 'noseriesline' },
        { name: this.$t('pages.dictionary.servicetype.title'), id: 'servicetype' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
