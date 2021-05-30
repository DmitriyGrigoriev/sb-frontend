import { apiService } from './api.service'
import {
  GET_MEASURE, MEASURE, GET_MEASURE_RECORD
} from '@/queries'

export const dictionaryService = {
  /**
   * fetchMeasure return Unit of Measure data.
   *
   * @returns response
   **/
  async fetchMeasure (query) {
    const resource = GET_MEASURE(query)
    return apiService.customRequest(resource)
  },
  async postMeasure (payload) {
    return apiService.post(MEASURE.url, payload)
  },
  async putMeasure (payload) {
    return apiService.put(GET_MEASURE_RECORD(payload.id).url, payload)
  },
  async deleteMeasure (payload) {
    for (const item of payload) {
      apiService.delete(GET_MEASURE_RECORD(item.id).url, item)
    }
    // return apiService.delete(GET_MEASURE_RECORD(payload.id).url, payload)
  },
  async getMeasure (id) {
    const resource = GET_MEASURE_RECORD(id).url
    return apiService.get(resource)
  }
}
