import { Notify } from 'quasar'
import { translate } from '@/libs/translate'

// Attempt to define `$t` in this context
const $t = translate

const defaults = {
  position: $t('notify.default.bottomright'),
  type: $t('notify.default.type'),
  timeout: parseInt($t('notify.default.timeout'), 0),
  multiLine: true,
  html: true
}

const notifyInstance = (options) => {
  if (typeof options !== 'object') {
    options = Object.assign({}, defaults, { message: options })
  }

  const optionsToUse = Object.assign({}, defaults, options)

  return Notify.create(optionsToUse)
}

export default ({ Vue }) => {
  Vue.prototype.$notify = notifyInstance
}

export {
  // for use outside components
  notifyInstance as Notify
}
