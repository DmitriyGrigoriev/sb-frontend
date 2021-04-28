import { storageService } from '@/services/storage.service'
import { translate } from '@/libs/translate'

// Attempt to define `$t` in this context
const $t = translate

export default function () {
  return {
    dense: storageService.getItem('dense') || false,
    dark: storageService.getItem('dark') || false,
    appVersion: $t('app.product.version')
  }
}
