import { dictionaryService } from '@/services'

export function fetchSetup (_, payload) {
  return dictionaryService.fetchSetup(payload)
}
export function putSetup (_, payload) {
  return dictionaryService.putSetup(payload)
}
export function postSetup (_, payload) {
  return dictionaryService.postSetup(payload)
}
