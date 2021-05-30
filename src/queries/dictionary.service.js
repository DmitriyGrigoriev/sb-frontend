/* eslint-disable camelcase */

export const MEASURE = {
  url: '/api/v1/unitofmeasure/'
}

export function GET_MEASURE (query) {
  return {
    method: 'get',
    url: '/api/v1/unitofmeasure/',
    params: query
  }
}
export function GET_MEASURE_RECORD (id) {
  return {
    url: `/api/v1/unitofmeasure/${id}/`
  }
}
