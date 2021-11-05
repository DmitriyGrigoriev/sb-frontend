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
  }
}

export { authQueries }
