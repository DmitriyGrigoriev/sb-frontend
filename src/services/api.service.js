import axios from 'axios'
// import { handleError } from '@/utils'
import { storageService } from './storage.service'
import { REFRESH_TOKEN } from '@/queries'
import store from '@/store'

axios.defaults.baseURL = process.env.PROD_ENDPOINT
axios.defaults.timeout = 20000 // request timeout
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

const apiService = {
  // Stores the 401 interceptor position so that it can be later ejected when needed
  _401interceptor: null,

  setHeader () {
    axios.defaults.headers.common.Authorization = `JWT ${storageService.getToken()}`
  },

  removeHeader () {
    axios.defaults.headers.common = {}
  },

  get (resource) {
    return axios.get(resource)
  },

  post (resource, data) {
    return axios.post(resource, data)
  },

  put (resource, data) {
    return axios.put(resource, data)
  },

  delete (resource) {
    return axios.delete(resource)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest (data) {
    return axios(data)
  },
  // Response interceptor
  mount401Interceptor () {
    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (Object.prototype.hasOwnProperty.call(error, 'request') && error.request.status === 401) {
          if (error.config.url.includes(REFRESH_TOKEN.url)) {
            // Refresh token has failed. Logout the user
            await this.$store.dispatch('auth/signoutUser')
            throw error
          } else {
            // Refresh the access token
            try {
              await store.dispatch('auth/refreshToken')
              // Retry the original request
              this.setHeader()
              return this.customRequest({
                method: error.config.method,
                url: error.config.url,
                data: error.config.data
              })
            } catch (e) {
              // Refresh has failed - reject the original request
              throw error
            }
          }
        }
        // handleError(error)
        // If error was not 401 just reject as is
        throw error
      }
    )
  },

  unmount401Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
  }
}

export { apiService }
