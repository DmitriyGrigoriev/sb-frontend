import { Loading, Dialog } from 'quasar'
import { handleError, handleResponse, HandleErrorClass } from '@/utils'
import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications'
import { authService } from '@/services/auth.service'
import { profileService } from '@/services/profile.service'
import { storageService, apiService } from '@/services'
import { authQueries } from '@/queries'

export function register ({ commit }, payload) {
  Loading.show()
  return authService
    .register(payload)
    .then(res => {
      // commit('SET_LOADING', false)
      console.log('response', res)
      Dialog.create({
        title: 'Registration Successful',
        message: 'You have successfully registered. Please check your email.',
        persistent: true,
        ok: true
      })
    })
    .catch(err => {
      // commit('SET_LOADING', false)
      commit('SET_ERROR', err.message)
    })
    .finally(() => Loading.hide())
}

export function signinUser ({ commit, dispatch }, payload) {
  // clear token so it does not get sent to server
  commit('CLEAR_TOKEN')
  commit('CLEAR_ERROR')

  // Loading.show()

  return authService
    .login(payload)
    .then(response => {
      commit('SET_TOKEN', handleResponse(response).access)
      commit('SET_REFRESH_TOKEN', handleResponse(response).refresh)
      // commit('SET_LOADING', false)
      dispatch('getCurrentUser')
      // this.$router.push({ path: '/dashboard' })
      // this.$router.replace({ name: 'dashboard' })
      // reset the store
      // client.resetStore()
    })
    .catch(error => {
      // commit('SET_LOADING', false)
      const message = new HandleErrorClass(error).message
      commit('CLEAR_TOKEN')
      commit('SET_ERROR', message)
      handleError(error)
      // commit('SET_ERROR', handleError.message(error, false))
      // handleError(error)
    })
    .finally(() => Loading.hide())
}

export function getCurrentUser ({ commit }) {
  // commit('SET_LOADING', true)

  return profileService
    .getCurrentUser()
    .then(res => {
      commit('SET_USER', handleResponse(res))
      // commit('SET_LOADING', false)
    })
    .catch(err => {
      // commit('SET_LOADING', false)
      handleError(err)
    })
}

export function clearError ({ commit }) {
  commit('CLEAR_ERROR')
}

export async function clearStore ({ commit }) {
  // remove user data from store
  commit('CLEAR_USER')
  // clear the token
  commit('CLEAR_TOKEN')
  // clear the refresh token
  commit('CLEAR_REFRESH_TOKEN')
}

export async function signoutUser ({ dispatch }) {
  // see https://github.com/apollographql/apollo-cache-persist/issues/34#issuecomment-371177206 for info in purging cache

  // clear client store, this will not refetch queries unlike resetStore
  // client.clearStore()
  //
  // persistor.purge()
  dispatch('clearStore')
  authService.logout()

  // redirect to login page
  this.$router.replace({ name: 'login' }).catch(() => {
    // Avoid it redundant route error
  })
}
/**
 * Refresh the access token.
 * To get a new access token, you should use the refresh token endpoint
 * api/token/refresh/ posting the refresh token:
 **/
export async function refreshToken ({ commit }) {
  const refreshToken = storageService.getRefreshToken()

  if (typeof refreshToken === 'undefined' || refreshToken === 'undefined') {
    // commit('CLEAR_USER')
    // Remove out date access token
    commit('CLEAR_TOKEN')
    await this.$router.push('/login')
  }
  const query = authQueries.refreshToken()
  query.data.refresh = refreshToken
  const response = await apiService.customRequest(query)

  // Save newest access token
  commit('SET_TOKEN', handleResponse(response).access)
  return handleResponse(response).access
}

export function forgotPassword (f = {}, email) {
  Loading.show()

  return authService
    .forgotPassword({ email: email })
    .then(res => {
      if (res.forgotPassword.status === 'EMAIL_NOT_SENT') {
        showErrorNotification(res.forgotPassword.message)
      } else {
        showSuccessNotification({
          message: res.forgotPassword.message
        })
      }
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => Loading.hide())
}

export function resendEmailVerification (f = {}, payload) {
  // Loading.show()

  return authService
    .resendEmailVerification(payload)
    .then(res => {
      showSuccessNotification({
        message: res.data.resendEmailVerification.message
      })
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => Loading.hide())
}

export function verifyEmail ({ commit, dispatch }, token) {
  return authService
    .verifyEmail({ token: token })
    .then(res => {
      console.log(res.data.verifyEmail)
      if (res.data.verifyEmail.access_token) {
        commit('SET_LOGGED_IN', true)
        commit('SET_TOKEN', res.data.verifyEmail.access_token)
        dispatch('populateUser')

        setTimeout(() => this.$router.push('/'), 1000)
      }
    })
    .catch(err => console.error(err.message))
}

export function updatePassword ({ dispatch }, payload) {
  Loading.show()

  return authService
    .updatePassword(payload)
    .then(res => {
      if (
        res.updatePassword &&
        res.updatePassword.status === 'PASSWORD_UPDATED'
      ) {
        dispatch('signoutUser')
      } else {
        return Promise.reject()
      }
    })
    .catch(err => {
      showErrorNotification(err.message)
    })
    .finally(() => Loading.hide())
}

export function checkEmailAvailability (f = {}, payload) {
  return authService
    .checkEmailAvailability({ email: payload })
    .then(res => {
      return res.checkEmailAvailability.status === 'AVAILABLE'
    })
    .catch(err => {
      console.log(err.message)
      return false
    })
}
