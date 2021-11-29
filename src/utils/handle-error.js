import { translate } from '@/utils/translate'
import store from '@/store'
import Router from '@/router'
// import { EventBus } from '@/functions'
import {
  showErrorNotification
} from '@/functions/function-show-notifications'
import {
  showRestQLErrorMessage,
  showCustomErrorMessage
} from '@/functions/function-rest-error-messages'

// Attempt to define `$t` in this context
const $t = translate

// Custom errors
// Todo: Write code to send error into outside back tracking system
export class CustomError extends Error {
  constructor (status, message) {
    super(message)
    // this.name = this.constructor.name
    const title = $t('messages.event.custom_error')
    this.message = `${title} ${message}`
    this.status = status
  }

  printError () {
    console.log(this.stack) // MyError: message \n
  }
}

export class HandleErrorClass {
  message = $t('responses.errors.network_error.message')
  store = null
  error = null
  status = null

  constructor (error) {
    // store original error
    this.error = null

    if (typeof error.response !== 'undefined') {
      this.status = error.response.status
    } else {
      if (typeof error.code !== 'undefined' && error.code === 'ECONNABORTED') {
        this.error = new CustomError(4000, error.message)
      } else {
        if (error.message !== 'Network Error') {
          this.error = new CustomError(5000, error.message)
        }
      }
    }
    // if don't CustomError
    if (this.error === null) {
      this.error = error
    }
    // if status have been overridden to we rewrite it
    if (typeof this.error.status !== 'undefined') {
      this.status = this.error.status
    }
    this.store = store
    this.message = this.errorMessage()
  }

  _hasOwnProperty (obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property)
  }

  determineTypeError () {
    // Avoid a redundant navigation
    if (this._hasOwnProperty(this.error, 'name') && this.error.name === 'NavigationDuplicated') {
      return Promise.resolve()
    }
    switch (this.status) {
      case 401:
        if (this._hasOwnProperty(this.error.response.data, 'code')) {
          if (this.error.response.data.code === 'token_not_valid') {
            this.invalidToken()
          }
        } else {
          /* invalid credentials: login, password or unactivated email */
          this.invalidCredential()
        }
        break
      case 403:
        showErrorNotification(this.message)
        return Promise.resolve()
      case 404:
        return Promise.resolve()
      case 405:
        return Promise.resolve()
      case 409:
        return Promise.resolve()
      case 4000:
        showErrorNotification(this.message)
        return Promise.resolve()
      case 5000:
        this.error.printError()
        return Promise.resolve()
      default:
        this.networkError()
        break
    }
  }

  errorMessage () {
    switch (this.status) {
      case 401:
        if (this._hasOwnProperty(this.error.response.data, 'code')) {
        } else {
          this.message = $t('auth.login.invalid_credentials')
        }
        break
      case 403:
        if (this._hasOwnProperty.call(this.error.response.data, 'detail')) {
          this.message = this.error.response.data.detail
        } else {
          this.message = $t('auth.login.verification_required')
        }
        break
      case 404:
        this.message = $t('messages.event.error404')
        break
      case 405:
        this.message = 'API Route Method Not Allowed'
        showErrorNotification(this.message)
        break
      case 409:
        this.message = $t('responses.errors.conflict.message')
        break
      case 500:
        this.message = $t('responses.errors.internal_server_error.message')
        break
      case 550:
        this.message = 'Protected Error'
        break
      case 4000:
        this.message = $t('responses.errors.service_timeout.message')
        break
      case 5000:
        this.message = this.error.message
        showCustomErrorMessage(this.error)
        break
      default:
        if (typeof this.error.response !== 'undefined' && typeof this.error.response.status !== 'undefined' && this.error.response.status >= 500) {
          this.message = $t('responses.errors.internal_server_error.message')
        } else {
          this.message = $t('responses.errors.network_error.message')
        }
        break
    }
    return this.message
  }

  invalidToken () {
    const Store = this.store
    return new Promise((resolve, reject) => {
      Store.dispatch('auth/clearStore')
      Router.push({ name: 'home' })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  invalidCredential () {
    /* invalid credentials: login, password or unactivated email */
    Router.push({ name: 'login' }).catch(() => {
      // Avoid it redundant route error
    })
  }

  networkError () {
    // this.store.dispatch('auth/signoutUser')
    const Store = this.store
    return new Promise((resolve, reject) => {
      Store.dispatch('auth/signoutUser')
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const handleError = error => {
  const handle = new HandleErrorClass(error)
  return new Promise(function () {
    handle.determineTypeError()
  })
    .then(() => {
    })
    .catch((err) => {
      console.error(err)
    })
  // return new Promise((resolve, reject) => {
  //   handle.determineTypeError()
  //     .then((val) => {
  //       resolve(val)
  //     })
  //     .catch((err) => {
  //       reject(err)
  //     })
  // })
}

// export const handleError = error => {
//   // handleError.message(error, true)
//   return Promise.resolve(alert(error.message))
// }

handleError.message = function (error, showError) {
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
          store.dispatch('auth/clearStore')
          // store.dispatch('auth/signoutUser')
          // const asyncfn = () => {
          //   return new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       resolve(Router.push({ name: 'home' }))
          //     }, 1000)
          //   })
          // }
          // const routePush = async () => {
          //   await asyncfn()
          // }
          // routePush()
          setTimeout(() => {
            Router.push({ name: 'home' })
          }, 1000)
        }
      } else {
        /* invalid credentials: login, password or unactivated email */
        message = $t('auth.login.invalid_credentials')
        Router.push({ name: 'login' })
        // setTimeout(() => {
        //   Router.push({ name: 'login' })
        // }, 1000)
      }
    } else if (error.response.status === 403) {
      if (Object.prototype.hasOwnProperty.call(error.response.data, 'detail')) {
        message = error.response.data.detail
      } else { message = $t('auth.login.verification_required') }
    } else if (error.response.status === 404) {
      return Router.replace({ name: 'error' })
      // message = 'API Route is Missing or Undefined'
    } else if (error.response.status === 405) {
      message = 'API Route Method Not Allowed'
    } else if (error.response.status === 409) {
      message = $t('responses.errors.conflict.message')
    } else if (error.response.status === 400) {
      // Validation Message
      showRestQLErrorMessage(error)
      showError = null
      // message = 'В запросе к серверу используется неверный параметр или его значение.'
    } else if (error.response.status === 550) {
      // showError = null
      // return EventBus.$emit('protected-error', error)
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
  } else {
    if (error.message !== 'Network Error') {
      const customError = new CustomError(5000, error.message)
      customError.printError()
      return showCustomErrorMessage(customError)
    }
  }
  if (showError) {
    showErrorNotification(message)
  }
  return message
}
