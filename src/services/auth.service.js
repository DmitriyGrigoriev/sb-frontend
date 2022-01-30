/* eslint-disable camelcase */
import { apiService } from './api.service'
import { authQueries } from '@/queries'

export const authService = {
  async register ({ nickname, email, password, re_password }) {
    const query = authQueries.Register()
    query.data.nickname = nickname
    query.data.email = email
    query.data.password = password
    query.data.re_password = re_password

    const response = await apiService.customRequest(query)

    return response
  },
  // /**
  //  * Refresh the access token.
  //  * To get a new access token, you should use the refresh token endpoint
  //  * api/token/refresh/ posting the refresh token:
  //  **/
  // refreshToken: async function () {
  //   // apiService.mount401Interceptor()
  //   const refreshToken = storageService.getRefreshToken()
  //
  //   if (typeof refreshToken === 'undefined' || refreshToken === 'undefined') {
  //     storageService.removeToken()
  //     storageService.removeRefreshToken()
  //     await this.$router.push('/login')
  //   }
  //   REFRESH_TOKEN.data.refresh = refreshToken
  //   const response = await apiService.customRequest(REFRESH_TOKEN)
  //
  //   // Save newest access token
  //   storageService.saveToken(handleResponse(response).access)
  //   return handleResponse(response).access
  // },
  /**
   * Login the user and store the access token to storageService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  async login ({ username, password }) {
    const query = authQueries.createToken()
    query.data.email = username
    query.data.password = password

    const response = await apiService.customRequest(query)

    // Initial axios interceptor to handle 401
    // error and refresh access token
    apiService.mount401Interceptor()
    // Set add token to each next requests
    apiService.setHeader()

    return response
  },
  logout () {
    apiService.unmount401Interceptor()
  },
  async ActivateUser ({ uid, token }) {
    const query = authQueries.ActivateUser()
    query.data.uid = uid
    query.data.token = token

    const response = await apiService.customRequest(query)

    return response
  },
  async updatePassword ({ new_password, re_new_password, current_password }) {
    const query = authQueries.updatePassword()
    query.data.new_password = new_password
    query.data.re_new_password = re_new_password
    query.data.current_password = current_password

    const response = await apiService.customRequest(query)

    return response
    // return client
    //   .mutate({
    //     mutation: UPDATE_PASSWORD_MUTATION,
    //     variables: {
    //       oldPassword: oldPassword,
    //       password: password,
    //       passwordConfirmation: passwordConfirmation
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  async forgotPassword ({ nickname }) {
    const query = authQueries.forgotPassword()
    query.data.nickname = nickname

    const response = await apiService.customRequest(query)

    return response
    // return client
    //   .mutate({
    //     mutation: FORGOT_PASSWORD_MUTATION,
    //     variables: {
    //       email: email
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  resendEmailVerification ({ email }) {
    // return client
    //   .mutate({
    //     mutation: RESEND_EMAIL_VERIFICATION_MUTATION,
    //     variables: {
    //       email: email
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  verifyEmail ({ token }) {
    // return client
    //   .mutate({
    //     mutation: VERIFY_EMAIL_MUTATION,
    //     variables: {
    //       token: token
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  checkEmailAvailability ({ email }) {
    // return client
    //   .query({
    //     query: CHECK_EMAIL_AVAILABILITY_QUERY,
    //     variables: {
    //       email: email
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  }
}
