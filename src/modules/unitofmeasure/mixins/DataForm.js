import ValidationResponseHandler from '@/mixins/ResponseValidation'

const DataFormMixin = {
  mixins: [ValidationResponseHandler],
  data () {
    return {
      requiredConfirm: false
    }
  },
  methods: {
    success () {
      // call mixin method
      this.successNotification()
      this.requiredConfirm = true
      // do not show dialog in beforeRouteLeave saved = true
      this.$emit('saved')
      this.requiredConfirm = false
    }
  }
}

export default DataFormMixin
