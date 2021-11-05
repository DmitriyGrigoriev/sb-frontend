export default async ({ Vue }) => {
  Vue.config.errorHandler = function (err, vm, info) {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`)
  }
}
