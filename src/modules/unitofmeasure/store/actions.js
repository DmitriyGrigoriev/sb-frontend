import { handleError } from '@/utils'
import { dictionaryService } from '@/services'

export function fetchMeasure ({ dispatch }, query) {
  return dictionaryService
    .fetchMeasure(query)
    .catch(err => {
      handleError(err)
    })
}

export function getMeasure ({ dispatch }, payload) {
  return dictionaryService.getMeasure(payload)
}

export function postMeasure ({ dispatch }, payload) {
  return dictionaryService.postMeasure(payload)
}

export function putMeasure ({ dispatch }, payload) {
  return dictionaryService.putMeasure(payload)
}

export function deleteMeasure ({ dispatch }, payload) {
  return dictionaryService.deleteMeasure(payload)
}

// export function uploadUserAvatar ({}, payload) {
//   return profileService.uploadUserAvatar(payload)
// }
//
// export function chooseAvatar ({}, payload) {
//   console.log(payload)
//   return profileService.chooseAvatar(payload)
// }
