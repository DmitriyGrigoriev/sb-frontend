import { handleError } from '@/utils'
import { dictionaryService } from '@/services'

// Commit selected dictionary table from DictionalySelect component
export function setSelected ({ commit }, payload) {
  commit('SET_SELECTED', payload)
}

export function setDictionary ({ commit }, payload) {
  commit('SET_SELECTED', payload)
  commit('SET_DICTIONARY')
}

// «Unit of Measure» («Единица Измерения»)
export function fetchMeasure (_, payload) {
  return dictionaryService
    .fetchMeasure(payload)
    .catch(err => {
      handleError(err)
    })
}
export function getMeasure (_, payload) {
  return dictionaryService.getMeasure(payload)
}
export function postMeasure (_, payload) {
  return dictionaryService.postMeasure(payload)
}
export function putMeasure (_, payload) {
  return dictionaryService.putMeasure(payload)
}
export function deleteMeasure (_, payload) {
  // https://stackoverflow.com/questions/57392687/how-can-i-return-error-message-from-axios-function-inside-vuex-action-to-dispatc
  return new Promise((resolve, reject) => {
    dictionaryService.deleteMeasure(payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })

  // return dictionaryService.deleteMeasure(payload)
}
// End «Unit of Measure» («Единица Измерения»)
// «VAT Posting Group» («НДС  Учетная Группа»)
export function fetchVat (_, query) {
  return dictionaryService
    .fetchVat(query)
    .catch(err => {
      handleError(err)
    })
}

export function getVat (_, payload) {
  return dictionaryService.getVat(payload)
}

export function postVat (_, payload) {
  return dictionaryService.postVat(payload)
}

export function putVat (_, payload) {
  return dictionaryService.putVat(payload)
}

export function deleteVat (_, payload) {
  return dictionaryService.deleteVat(payload)
}
// End «VAT Posting Group» («НДС  Учетная Группа»)

// «No. Series» («Серия Номеров»)
export function fetchSeries (_, query) {
  return dictionaryService
    .fetchSeries(query)
    .catch(err => {
      handleError(err)
    })
}
export function getSeries (_, payload) {
  return dictionaryService.getNoSeries(payload)
}
export function postSeries (_, payload) {
  return dictionaryService.postSeries(payload)
}
export function putSeries (_, payload) {
  return dictionaryService.putSeries(payload)
}
export function deleteSeries (_, payload) {
  return dictionaryService.deleteSeries(payload)
}
// End «No. Series» («Серия Номеров»)

// «No. Series Line» («Серия Номеров Строка»)
export function fetchSeriesLine (_, payload) {
  return dictionaryService.fetchSeriesLine(payload)
}
export function getSeriesLine (_, payload) {
  return dictionaryService.getNoSeriesLine(payload)
}
export function postSeriesLine (_, payload) {
  return dictionaryService.postSeriesLine(payload)
}
export function putSeriesLine (_, payload) {
  return dictionaryService.putSeriesLine(payload)
}
export function deleteSeriesLine (_, payload) {
  return dictionaryService.deleteSeriesLine(payload)
}
// # «Service Type» («Тип Услуги»)
export function fetchServiceType (_, payload) {
  return dictionaryService.fetchServiceType(payload)
}
export function getServiceType (_, payload) {
  return dictionaryService.getServiceType(payload)
}
export function postServiceType (_, payload) {
  return dictionaryService.postServiceType(payload)
}
export function putServiceType (_, payload) {
  return dictionaryService.putServiceType(payload)
}
export function deleteServiceType (_, payload) {
  return dictionaryService.deleteServiceType(payload)
}
// # «Service» («Услуги»)
export function fetchService (_, payload) {
  return dictionaryService.fetchService(payload)
}
export function getService (_, payload) {
  return dictionaryService.getService(payload)
}
export function postService (_, payload) {
  return dictionaryService.postService(payload)
}
export function putService (_, payload) {
  return dictionaryService.putService(payload)
}
export function deleteService (_, payload) {
  return dictionaryService.deleteService(payload)
}
// # «Service Price» («Услуги и Цены»)
export function fetchPriceByService (_, payload) {
  return dictionaryService.fetchPriceByService(payload)
}
