import Rollbar from 'rollbar'
import { Notify } from 'quasar'

export default async ({ Vue }) => {
  Vue.prototype.$rollbar = new Rollbar({
    accessToken: '782001addf6d4882adc9e74c5d78ae66',
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: true,
    environment: process.env.APP_ENV
  })

  Vue.config.errorHandler = (err, vm, info) => {
    vm.$rollbar.error(err)
    Notify.create({
      type: 'warning',
      message: err.message
    })
    throw err // rethrow

    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.

    // TODO: Perform any custom logic or log to server
  }
}
