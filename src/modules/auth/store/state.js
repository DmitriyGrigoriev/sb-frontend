import { storageService } from '@/services/storage.service'

export default function () {
  return {
    user: storageService.getUser() || null,
    loading: false,
    error: null,
    loggedIn: storageService.getLogged() || false,
    token: storageService.getToken() || '',
    role: storageService.getRole() || ''
  }
}
