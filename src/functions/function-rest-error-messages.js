import { Dialog } from 'quasar'

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

      // console.log(restQLErrors);
      // const category = restQLErrorsCategory
      // console.log(category)
      // const errors = restQLErrors

      Dialog.create({
        color: 'red',
        title: field,
        message: messages
      })
    }
  }
}
