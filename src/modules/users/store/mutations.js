import Vue from 'vue'

export function ADD_USER (state, payload) {
  Vue.set(state.users, payload.id, payload.user)
}

export function ACTIVATE_USER (state, payload) {
  state.users['ID' + payload.id].is_active = true
}

export function DEACTIVATE_USER (state, payload) {
  state.users['ID' + payload.id].is_active = false
}

export function ASSIGN_ROLE (state, payload) {
  state.users['ID' + payload.id].role = payload.role
}
export function SET_ROLES (state, payload) {
  state.roles = payload.map(role => {
    return {
      value: role.id,
      label: role.name
    }
  })
}

export function SET_SEARCH (state, value) {
  state.search = value
}

export function SET_LOADING (state, value) {
  state.loading = value
}

export function SET_SORT (state, value) {
  state.sort = value
}

export function SET_DIRECTION (state, value) {
  state.direction = value
}
