/* eslint-disable camelcase */
import { translate } from '@/utils/translate'
import { userService } from '@/services'
import { handleResponse } from '@/utils'

// Attempt to define `$t` in this context
const $t = translate

class ActivationError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

export function fetchUsers ({ commit }) {
  // commit('SET_LOADING', true)
  return userService
    .fetchUser()
    .then(res => {
      handleResponse(res).forEach(user => {
        const payload = {
          id: 'ID' + user.id,
          user: user
        }
        commit('ADD_USER', payload)
      })
      // commit('SET_LOADING', false)
    })
    .catch(err => console.log(err.message))
}

export function getUser ({ commit }, user_Id) {
  return userService
    .getUser(user_Id)
    .then(res => {
      const user = handleResponse(res)
      // commit('SET_LOADING', false)
      commit('ASSIGN_ROLE', user)
    })
    // .catch(error => {
    //   if (error.response.status === 403) {
    //     throw new ActivationError(error.response.status)
    //   } else { throw error }
    // })
}

export function getRoles ({ commit }) {
  return userService
    .getRoles()
    .then(res => {
      // commit('SET_LOADING', false)
      commit('SET_ROLES', handleResponse(res))
    })
    .catch(err => console.log(err.message))
}

export function activateUser ({ commit }, payload) {
  // return client
  //   .mutate({
  //     mutation: ACTIVATE_USER,
  //     variables: {
  //       id: payload.id
  //     }
  //   })
  //   .then(res => {
  //     commit('ACTIVATE_USER', payload)
  //
  //     showSuccessNotification({
  //       message: 'Successfully activated user.'
  //     })
  //
  //     return res.data
  //   })
  //   .catch(err => console.log(err.message))
}

export function deactivateUser ({ commit }, payload) {
  // return client
  //   .mutate({
  //     mutation: DEACTIVATE_USER,
  //     variables: {
  //       id: payload.id
  //     }
  //   })
  //   .then(res => {
  //     commit('DEACTIVATE_USER', payload)
  //
  //     showSuccessNotification({
  //       message: 'Successfully deactivated user.'
  //     })
  //
  //     return res.data
  //   })
  //   .catch(err => console.log(err.message))
}

export function assignRole ({ commit, state, dispatch }, payload) {
  if (state.users['ID' + payload.user_id].is_active === false) {
    throw new ActivationError(403, $t('auth.login.verification_required'))
  }
  return userService
    .assignRole(payload)
    .then(res => {
      // const role = handleResponse(res)
      // commit('SET_LOADING', false)
      dispatch('getUser', payload.user_id)
    })
    // .catch(err => handleError(err))
}

export function assignOperatingUnitToReview (_, payload) {
  // return client
  //   .mutate({
  //     mutation: ASSIGN_OPERATING_UNIT_TO_REVIEW_MUTATION,
  //     variables: {
  //       user_id: payload.id,
  //       operating_units: payload.operating_units
  //     }
  //   })
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     showErrorNotification(message)
  //   })
}

export function setSearch ({ commit }, payload) {
  commit('SET_SEARCH', payload)
}

export function setSort ({ commit }, payload) {
  commit('SET_SORT', payload)
}

export function setDirection ({ commit }, payload) {
  commit('SET_DIRECTION', payload)
}
