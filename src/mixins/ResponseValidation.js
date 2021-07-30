import { handleError } from '@/utils'

const ValidationResponseHandler = {
  created () {
    this.errors = {}
  },
  methods: {
    syncErrors (error) {
      if (typeof error !== 'undefined') {
        if (Object.prototype.hasOwnProperty.call(error, 'response') &&
          Object.prototype.hasOwnProperty.call(error.response, 'data')) {
          this.errors = error.response.data
        }
      }
    },
    clearErrors () {
      this.errors = {}
    },
    hasErrors (field) {
      return Object.prototype.hasOwnProperty.call(this.errors, field)
    },
    getError (field) {
      return Object.prototype.hasOwnProperty.call(this.errors, field) ? this.errors[field][0] : null
    },
    getErrors (field) {
      return Object.prototype.hasOwnProperty.call(this.errors, field) ? this.errors[field] : null
    },
    showErrorNotification (error) {
      this.$q.notify({
        type: 'negative',
        message: handleError.message(error, false),
        position: 'bottom-right'
      })
    }
  }
}
export default ValidationResponseHandler
