/* eslint-disable camelcase */
/* Auth */
export const CREATE_TOKEN =
  {
    method: 'post',
    url: '/auth/jwt/create/',
    data: {
      email: '',
      password: ''
    }
  }

export const REFRESH_TOKEN =
  {
    method: 'post',
    url: '/auth/jwt/refresh/',
    data: {
      refresh: ''
    }
  }

export const CURRENT_USER =
  {
    method: 'get',
    url: '/auth/users/me/'
  }

export const GET_USERS =
  {
    method: 'get',
    url: '/auth/users/'
  }

export function GET_USER (user_id) {
  return {
    method: 'get',
    url: `/auth/users/${user_id}/`
  }
}

/* User service */
export const GET_ROLES =
  {
    method: 'get',
    url: '/auth/roles/'
  }
/* eslint-disable camelcase */
export function USER_ROLES (user_id, role_ids) {
  return {
    method: 'put',
    url: `/auth/user-role/${user_id}/`,
    data: {
      id: user_id,
      role: role_ids
    }
  }
}
