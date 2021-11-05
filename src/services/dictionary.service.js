import { handleError } from '@/utils'
import { apiService } from './api.service'
import { dictionaryQueries } from '@/queries'
import { BLOCKED_SERIES } from '@/constants/dictionary'

export const dictionaryService = {
  // «Unit of Measure» («Единица Измерения»)
  async fetchMeasure (payload) {
    const resource = dictionaryQueries.getMeasure(payload)
    return apiService.customRequest(resource)
  },
  async postMeasure (payload) {
    return apiService.post(dictionaryQueries.measure.url, payload)
  },
  async putMeasure (payload) {
    return apiService.put(dictionaryQueries.getMeasureRecord(payload.id).url, payload)
  },
  async deleteMeasure (payload) {
    return apiService.delete(dictionaryQueries.getMeasureRecord(payload.id).url)
  },
  async getMeasure (id) {
    const resource = dictionaryQueries.getMeasureRecord(id).url
    return apiService.get(resource)
  },
  // End «Unit of Measure» («Единица Измерения»)
  // «VAT Posting Group» («НДС  Учетная Группа»)
  async fetchVat (payload) {
    const resource = dictionaryQueries.getVat(payload)
    return apiService.customRequest(resource)
  },
  async getVat (id) {
    const resource = dictionaryQueries.getVatRecord(id).url
    return apiService.get(resource)
  },
  async putVat (payload) {
    return apiService.put(dictionaryQueries.getVatRecord(payload.id).url, payload)
  },
  async postVat (payload) {
    return apiService.post(dictionaryQueries.vat.url, payload)
  },
  async deleteVat (payload) {
    for (const item of payload) {
      apiService.delete(dictionaryQueries.getVatRecord(item.id).url, item)
    }
  },
  // «No. Series» («Серия Номеров»)
  async fetchSeries (payload) {
    const resource = dictionaryQueries.getNoSeries(payload)
    return apiService.customRequest(resource)
  },
  async getNoSeries (id) {
    const resource = dictionaryQueries.getNoSeriesRecord(id).url
    return apiService.get(resource)
  },
  async putSeries (payload) {
    return apiService.put(dictionaryQueries.getNoSeriesRecord(payload.id).url, payload)
  },
  async postSeries (payload) {
    return apiService.post(dictionaryQueries.noSeries.url, payload)
  },
  async deleteSeries (payload) {
    for (const item of payload) {
      apiService.delete(dictionaryQueries.getNoSeriesRecord(item.id).url, item)
    }
  },
  // «No. Series Line» («Серия Номеров Строка»)
  isSeriesLineBlocked (payload) {
    let blocked = false
    if (Object.prototype.hasOwnProperty.call(payload, BLOCKED_SERIES)) {
      blocked = payload[`${BLOCKED_SERIES}`]
    }
    return blocked
  },
  seriesLineResource (payload) {
    const blocked = this.isSeriesLineBlocked(payload)
    let resource = dictionaryQueries.getNoSeriesLine(payload.id).url
    if (blocked) {
      resource = dictionaryQueries.getNoSeriesLineBlocked(payload.id).url
    }
    return resource
  },
  seriesLineResourceRecord (payload) {
    const blocked = this.isSeriesLineBlocked(payload)
    let resource = dictionaryQueries.getNoSeriesLineRecord(payload.id).url
    if (blocked) {
      resource = dictionaryQueries.getNoSeriesLineBlockedRecord(payload.id).url
    }
    return resource
  },
  async fetchSeriesLine (query) {
    let resource = null
    const blocked = this.isSeriesLineBlocked(query)
    if (!blocked) {
      resource = dictionaryQueries.getNoSeriesLine(query)
    } else {
      resource = dictionaryQueries.getNoSeriesLineBlocked(query)
    }
    // const resource = dictionaryQueries.getNoSeriesLine(query)
    return apiService
      .customRequest(resource)
      .catch(error => {
        handleError(error)
      })
  },
  async getNoSeriesLine (payload) {
    const resource = this.seriesLineResourceRecord(payload)
    return apiService.get(resource)
  },
  async putSeriesLine (payload) {
    const resource = this.seriesLineResourceRecord(payload)
    return apiService.put(resource, payload)
  },
  async postSeriesLine (payload) {
    return apiService.post(dictionaryQueries.noSeriesLine.url, payload)
  },
  async deleteSeriesLine (payload) {
    const blocked = this.isSeriesLineBlocked(payload)
    for (const item of payload) {
      if (blocked) {
        item[`${BLOCKED_SERIES}`] = blocked
      }
      const resource = this.seriesLineResourceRecord(item)
      apiService.delete(resource).catch(error => { handleError(error) })
    }
  },
  // «Service Type» («Тип Услуги»)
  async fetchServiceType (query) {
    const resource = dictionaryQueries.getServiceType(query)
    return apiService.customRequest(resource)
  },
  async getServiceType (id) {
    const resource = dictionaryQueries.getServiceTypeRecord(id).url
    return apiService.get(resource)
  },
  async putServiceType (payload) {
    return apiService.put(dictionaryQueries.getServiceTypeRecord(payload.id).url, payload)
  },
  async postServiceType (payload) {
    return apiService.post(dictionaryQueries.serviceType.url, payload)
  },
  async deleteServiceType (payload) {
    for (const item of payload) {
      apiService.delete(dictionaryQueries.getServiceTypeRecord(item.id).url)
    }
  },
  // «Service» («Услуги»)
  async fetchService (payload) {
    const resource = dictionaryQueries.getService(payload)
    return apiService.customRequest(resource)
  },
  async getService (id) {
    const resource = dictionaryQueries.getServiceRecord(id).url
    return apiService.get(resource)
  },
  async putService (payload) {
    return apiService.put(dictionaryQueries.getServiceRecord(payload.id).url, payload)
  },
  async postService (payload) {
    return apiService.post(dictionaryQueries.service.url, payload)
  },
  async deleteService (payload) {
    for (const item of payload) {
      apiService.delete(dictionaryQueries.getServiceRecord(item.id).url)
    }
  },
  // «Setup Series» («Серия Номеров Настройка»)
  async fetchSetup (payload) {
    const resource = dictionaryQueries.getSetup(payload)
    return apiService.customRequest(resource)
  },
  async putSetup (payload) {
    return apiService.put(dictionaryQueries.getSetupRecord(payload.id).url, payload)
  },
  async postSetup (payload) {
    return apiService.post(dictionaryQueries.setup.url, payload)
  },
  // «Service Price» («Услуги и Цены»)
  async fetchPriceByService (payload) {
    const resource = dictionaryQueries.getPriceByService(payload)
    return apiService.customRequest(resource)
  }
}
