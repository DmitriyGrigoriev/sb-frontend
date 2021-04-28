// import { LocalStorage } from 'quasar'
import { storageService } from '@/services/storage.service'

export default function () {
  return {
    dense: storageService.getItem('dense') || false,
    dark: storageService.getItem('dark') || false
  }
}
