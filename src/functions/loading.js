import { Loading, QSpinnerGears } from 'quasar'

const loading = {
}
let lastRequest = new Date('2018')

loading.show = function (config) {
  if (config && config.loading) {
    const now = new Date()
    const ms = now - lastRequest
    lastRequest = now
    if (ms > 2000) { // С интервалом в две секунды перед повторным воспроизведением запроса loading
      if (config.loading === 'gears') {
        Loading.show({
          spinner: QSpinnerGears,
          message: '',
          messageColor: 'white',
          spinnerSize: 100,
          spinnerColor: 'white',
          customClass: ''
        })
      } else if (config.loading === 'hourglass') {
        Loading.show({
          // spinner: QSpinnerHourglass,
          message: '',
          messageColor: 'white',
          spinnerSize: 100,
          spinnerColor: 'white',
          customClass: ''
        })
      }
    }
  }
}

loading.hide = function (config) {
  if (config && config.loading) {
    setTimeout(() => {
      Loading.hide()
    }, 1000)
  }
}

export default loading
