/* eslint-disable camelcase */
const dictionaryQueries = {
  // «Unit of Measure» («Единица Измерения»)
  measure: { url: '/api/v1/unitofmeasure/' },

  getMeasure (query) {
    return {
      method: 'get',
      url: this.measure.url,
      params: query
      // loading: 'hourglass'
    }
  },
  getMeasureRecord (id) {
    return {
      url: `${this.measure.url}${id}/`
    }
  },

  // «VAT Posting Group» («НДС  Учетная Группа»)
  vat: { url: '/api/v1/vat/' },

  getVat (query) {
    return {
      method: 'get',
      url: this.vat.url,
      params: query
    }
  },
  getVatRecord (id) {
    return {
      url: `${this.vat.url}${id}/`
    }
  },

  // «No. Series» («Серия Номеров»)
  noSeries: { url: '/api/v1/noseries/' },

  getNoSeries (query) {
    return {
      method: 'get',
      url: this.noSeries.url,
      params: query
    }
  },
  getNoSeriesRecord (id) {
    return {
      url: `${this.noSeries.url}${id}/`
    }
  },

  // «No. Series Line» («Серия Номеров Строка»)
  noSeriesLine: { url: '/api/v1/noseriesline/' },
  // «No. Series Line» («Не актуальные серии номеров»)
  noSeriesLineBlocked: { url: '/api/v1/noseriesline/blocked/' },

  getNoSeriesLine (query) {
    return {
      method: 'get',
      url: this.noSeriesLine.url,
      params: query
    }
  },
  getNoSeriesLineBlocked (query) {
    return {
      method: 'get',
      url: this.noSeriesLineBlocked.url,
      params: query
    }
  },
  getNoSeriesLineRecord (id) {
    return {
      url: `${this.noSeriesLine.url}${id}/`
    }
  },
  getNoSeriesLineBlockedRecord (id) {
    return {
      url: `${this.noSeriesLineBlocked.url}${id}/`
    }
  },
  // «Service Type» («Тип Услуги»)
  serviceType: { url: '/api/v1/servicetype/' },

  getServiceType (query) {
    return {
      method: 'get',
      url: this.serviceType.url,
      params: query
    }
  },
  getServiceTypeRecord (id) {
    return {
      url: `${this.serviceType.url}${id}/`
    }
  },
  // «Service» («Услуги»)
  service: { url: '/api/v1/service/' },

  getService (query) {
    return {
      method: 'get',
      url: this.service.url,
      params: query
    }
  },
  getServiceRecord (id) {
    return {
      url: `${this.service.url}${id}/`
    }
  },
  // «Service Price» («Услуги и Цены»)
  service_price: { url: '/api/v1/serviceprice/' },

  getServicePrice (query) {
    return {
      method: 'get',
      url: this.service_price.url,
      params: query
    }
  },
  getServicePriceRecord (id) {
    return {
      url: `${this.service_price.url}${id}/`
    }
  },
  getPriceByService (id) {
    return {
      url: `${this.service_price.url}${id}/service`
    }
  },
  // «Setup Series» («Настройка Серии Номеров»)
  setup: { url: '/api/v1/setup/' },

  getSetup (query) {
    return {
      method: 'get',
      url: this.setup.url,
      params: query
    }
  },
  getSetupRecord (id) {
    return {
      url: `${this.setup.url}${id}/`
    }
  }

}

export { dictionaryQueries }
