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
      this.setSelected(value)
    }
  },
  created () {
    this.selectedValue = this.$route.name
  },
  methods: {
    ...mapActions('measure', ['setSelected'])
  },
  data () {
    return {
      selectedValue: '',
      default_route: '',
      options: [
        { name: this.$t('pages.dictionary.measure.title'), id: 'measure' },
        { name: this.$t('pages.dictionary.vat.title'), id: 'vat' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
