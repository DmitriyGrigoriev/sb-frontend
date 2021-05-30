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
