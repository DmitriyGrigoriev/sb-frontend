/* eslint-disable camelcase */

export const MEASURE = {
  url: '/api/v1/unitofmeasure/'
}

export function GET_MEASURE (query) {
  return {
    method: 'get',
    url: MEASURE.url,
    params: query
  }
}
export function GET_MEASURE_RECORD (id) {
  return {
    url: `${MEASURE.url}${id}/`
  }
}
// «VAT Posting Group» («НДС  Учетная Группа»)
export const VAT = {
  url: '/api/v1/vat/'
}
export function GET_VAT (query) {
  return {
    method: 'get',
    url: VAT.url,
    params: query
  }
}
