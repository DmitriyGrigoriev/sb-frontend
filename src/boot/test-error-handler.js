export default async ({ Vue }) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
  // TODO: Perform any custom logic or log to server

  Vue.config.errorHandler = function (err, vm, info) {
    console.error(`Error: ${err.toString()}\nInfo: ${info}`)
  }
}
