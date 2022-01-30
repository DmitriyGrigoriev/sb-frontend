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
      // Send emit to DataForm.vue component to clear conflict message
      this.$bus.$emit('clear-table-error')
    },
    hasErrors (field) {
      // console.log('field:', field)
      // console.log('errors', Object.prototype.hasOwnProperty.call(this.errors, field))
      return Object.prototype.hasOwnProperty.call(this.errors, field)
    },
    getError (field) {
      if (Object.prototype.hasOwnProperty.call(this.errors, field)) {
        const error = this.errors[field][0]
        delete this.errors[field]
        return error
      } else {
        return null
      }
      // return Object.prototype.hasOwnProperty.call(this.errors, field) ? this.errors[field][0] : null
    },
    getErrors (field) {
      return Object.prototype.hasOwnProperty.call(this.errors, field) ? this.errors[field] : null
    },
    responseError (error) {
      if (typeof error.response !== 'undefined' &&
        (error.response.status === 400 || error.response.status === 409)) {
        // Send emit conflict checker event to DataForm.vue component
        if (error.response.status === 409) {
          this.$bus.$emit('conflict-error')
        }
        // Save error object to this.error property
        this.syncErrors(error)
        // await syncError
        this.$nextTick(() => {
          if (Object.keys(this.errors).length > 0) {
            handleError(error)
          }
        })
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
