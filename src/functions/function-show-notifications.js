import { Notify } from 'quasar'
import { translate } from '@/utils/translate'

// Attempt to define `$t` in this context
const $t = translate

export function showSuccessNotification (message, icon) {
  Notify.create({
    icon: icon == null ? 'check' : icon,
    position: 'bottom-right',
    color: 'primary',
    message: message == null ? $t('messages.event.save') : message,
    timeout: 5000,
    progress: true,
    actions: null
  })
}

export function showErrorNotification (message, icon) {
  Notify.create({
    icon: icon == null ? 'close' : icon,
    position: 'bottom-right',
    color: 'negative',
    message: message == null ? $t('messages.event.error') : message,
    timeout: 5000,
    progress: true,
    actions: null
  })
}
