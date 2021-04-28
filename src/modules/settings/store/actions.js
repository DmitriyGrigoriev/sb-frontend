import { Dark } from 'quasar'
import { storageService } from '@/services/storage.service'

export const setDense = ({ commit }, payload) => {
  storageService.setItem('dense', payload)
  commit('SET_DENSE', payload)
}

export const setDark = ({ commit }, payload) => {
  Dark.set(payload)
  storageService.setItem('dark', payload)
  commit('SET_DARK', payload)
}
