import { handleError } from '@/utils'
import {
  showSuccessNotification
} from '@/functions/function-show-notifications'

const ValidationResponseHandler = {
  data () {
    return {
      errors: {}
    }
  },
  mounted () {
    this.clearErrors()
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
      this.$bus.$emit('clear-table-error')
    },
    hasErrors (field) {
      // console.log('field:', field)
      // console.log('errors', Object.prototype.hasOwnProperty.call(this.errors, field))
      return Object.prototype.hasOwnProperty.call(this.errors, field)
    },
    getError (field) {
      return Object.prototype.hasOwnProperty.call(this.errors, field) ? this.errors[field][0] : null
    },
    getErrors (field) {
      return Object.prototype.hasOwnProperty.call(this.errors, field) ? this.errors[field] : null
    },
    responseError (error) {
      if (typeof error.response !== 'undefined' && (error.response.status === 400 || error.response.status === 409)) {
        if (error.response.status === 409) {
          this.$bus.$emit('conflict-error')
        }
        this.syncErrors(error)
      } else {
        handleError(error)
      }
    },
    successNotification () {
      showSuccessNotification()
    }
  }
}
export default ValidationResponseHandler
