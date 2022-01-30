/* eslint-disable camelcase */
const authQueries = {
  // Create token
  createToken () {
    return {
      method: 'post',
      url: '/auth/jwt/create/',
      data: {
        email: '',
        password: ''
      },
      loading: 'gears'
    }
  },
  // Refresh token
  refreshToken () {
    return {
      method: 'post',
      url: '/auth/jwt/refresh/',
      data: {
        refresh: ''
      }
    }
  },
  // Register
  Register () {
    return {
      method: 'post',
      url: '/auth/users/',
      data: {
        nickname: '',
        email: '',
        password: '',
        re_password: ''
      }
    }
  },
  // Forgot password
  forgotPassword () {
    return {
      method: 'post',
      url: '/auth/users/reset_password/',
      data: {
        nickname: ''
      }
    }
  },
  // Activate User
  ActivateUser () {
    return {
      method: 'post',
      url: '/auth/users/activation/',
      data: {
        uid: '',
        token: ''
      }
    }
  },
  // Update user password
  updatePassword () {
    return {
      method: 'post',
      url: '/auth/users/set_password/',
      data: {
        new_password: '',
        re_new_password: '',
        current_password: ''
      }
    }
  }
}

export { authQueries }
