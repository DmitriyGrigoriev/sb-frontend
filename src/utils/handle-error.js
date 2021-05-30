import { translate } from '@/utils/translate'
import store from '@/store'
import Router from '@/router'
import {
  showErrorNotification
} from '@/functions/function-show-notifications'
import {
  showRestQLErrorMessage
} from '@/functions/function-rest-error-messages'

// Attempt to define `$t` in this context
const $t = translate

export const handleError = error => {
  handleError.message(error, true)
  return Promise.reject(error)
}
handleError.message = function (error, showErrorMessage) {
  // Setup Error Message
  let message = $t('responses.errors.network_error.message')
  if (error.message === 'Network Error') {
    store.dispatch('auth/signoutUser')
  }
  if (typeof error.response !== 'undefined') {
    /* Processing: authorization response error 401
       - check expired token or not
    */
    if (error.response.status === 401) {
      if (Object.prototype.hasOwnProperty.call(error.response.data, 'code')) {
        if (error.response.data.code === 'token_not_valid') {
          store.dispatch('auth/signoutUser')
          setTimeout(() => {
            Router.push({ name: 'home' })
          }, 1000)
        }
      } else {
        /* invalid credentials: login, password or unactivated email */
        message = $t('auth.login.invalid_credentials')
        setTimeout(() => {
          Router.push({ name: 'login' })
        }, 1000)
      }
    } else if (error.response.status === 403) {
      if (Object.prototype.hasOwnProperty.call(error.response.data, 'detail')) {
        message = error.response.data.detail
      } else { message = $t('auth.login.verification_required') }
    } else if (error.response.status === 404) {
      message = 'API Route is Missing or Undefined'
    } else if (error.response.status === 405) {
      message = 'API Route Method Not Allowed'
    } else if (error.response.status === 400) {
      // Validation Message
      showRestQLErrorMessage(error)
      showErrorMessage = null
      // message = 'В запросе к серверу используется неверный параметр или его значение.'
    } else if (error.response.status >= 500) {
      message = $t('responses.errors.internal_server_error.message')
    }
    // Try to Use the Response Message
    if (Object.prototype.hasOwnProperty.call(error, 'response') &&
      Object.prototype.hasOwnProperty.call(error.response, 'data')) {
      if (Object.prototype.hasOwnProperty.call(error.response.data, 'message') &&
        error.response.data.message.length > 0) {
        message = error.response.data.message
      }
    }
  }
  if (showErrorMessage) {
    showErrorNotification({ message: message })
  }
  return message
}
