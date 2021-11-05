/* eslint-disable camelcase */
const userQueries = {
  // Get list of users
  getUsers () {
    return {
      method: 'get',
      url: '/auth/users/'
      // loading: 'gears'
    }
  },
  // Get user info
  getUser (user_id) {
    return {
      method: 'get',
      url: `/auth/users/${user_id}/`
    }
  },
  // Get list roles
  getRoles () {
    return {
      method: 'get',
      url: '/auth/roles/'
    }
  },
  // Get list of user's roles
  getUserRoles (user_id, role_ids) {
    return {
      method: 'put',
      url: `/auth/user-role/${user_id}/`,
      data: {
        id: user_id,
        role: role_ids
      }
    }
  }
}

export { userQueries }

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

export const GET_ROLES =
  {
    method: 'get',
    url: '/auth/roles/'
  }

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
