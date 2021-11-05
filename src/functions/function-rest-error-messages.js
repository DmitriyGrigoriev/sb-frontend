import { Dialog, Notify } from 'quasar'

export const restQLErrorMessages = errorsFromCatch => {
  const errors = errorsFromCatch.graphQLErrors[0]
  const messages = []

  if (Object.prototype.hasOwnProperty.call(errors, 'functionError')) {
    const customErrors = JSON.parse(errors.functionError)
    messages.push(...customErrors.errors)
  } else {
    messages.push(errors.message)
  }

  return messages
}

export function hasErrors (errors, field) {
  try {
    if (Array.isArray(errors) && errors.length && String(field)) {
      return errors.some(item => item.id === field)
    }
  } catch (e) {
    return false
  }
}

export const showRestQLErrorMessage = error => {
  if (typeof error !== 'undefined') {
    if (typeof error.response !== 'undefined' &&
      Object.prototype.hasOwnProperty.call(error, 'response') &&
      Object.prototype.hasOwnProperty.call(error.response, 'data')) {
      const fields = Object.keys(error.response.data)
      const errors = Object.values(error.response.data)
      let field = ''
      let messages = ''
      for (const key in fields) {
        field = field + fields[key]
        messages = messages + errors[key]
      }

      Dialog.create({
        color: 'red',
        title: field,
        message: messages
      })
    }
  }
}

export const showCustomErrorMessage = error => {
  if (error !== null) {
    if (Object.prototype.hasOwnProperty.call(error, 'message')) {
      const message = error.message

      Notify.create({
        icon: 'close',
        position: 'bottom-right',
        color: 'negative',
        message: message,
        timeout: 5000,
        progress: true,
        actions: null
      })
    }
  }
}
