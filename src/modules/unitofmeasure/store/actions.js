import { handleError } from '@/utils'
import { dictionaryService } from '@/services'

// Commit selected dictionary table from DictionalySelect component
export function setSelected ({ commit }, payload) {
  commit('SET_SELECTED', payload)
  commit('SET_DICTIONARY')
}

export function setDictionary ({ commit }) {
  commit('SET_DICTIONARY')
}

// «Unit of Measure» («Единица Измерения»)
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
// End «Unit of Measure» («Единица Измерения»)

// «VAT Posting Group» («НДС  Учетная Группа»)
export function fetchVat ({ dispatch }, query) {
  return dictionaryService
    .fetchVat(query)
    .catch(err => {
      handleError(err)
    })
}

export function getVat ({ dispatch }, payload) {
  return dictionaryService.getVat(payload)
}

export function postVat ({ dispatch }, payload) {
  return dictionaryService.postVat(payload)
}

export function putVat ({ dispatch }, payload) {
  return dictionaryService.putVat(payload)
}

export function deleteVat ({ dispatch }, payload) {
  return dictionaryService.deleteVat(payload)
}
// End «VAT Posting Group» («НДС  Учетная Группа»)
