import { apiService } from './api.service'
import {
  GET_USERS, GET_ROLES, USER_ROLES, GET_USER
} from '@/queries'

// import { handleServerError } from '../modules/error.module'

// class AuthenticationError extends Error {
//   constructor (errorCode, message) {
//     super(message)
//     this.name = this.constructor.name
//     this.message = message
//     this.errorCode = errorCode
//   }
// }

const userService = {
  /**
   * fetchUser the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  async fetchUser () {
    return apiService.customRequest(GET_USERS)
    // return response
  },
  async getUser (userId) {
    const data = GET_USER(userId)
    return apiService.customRequest(data)
    // return response
  },
  async getRoles () {
    return apiService.customRequest(GET_ROLES)
  },
  async assignRole (payload) {
    const data = USER_ROLES(payload.user_id, payload.role_ids)
    return apiService.customRequest(data)
  }
//   checkRoles: async function (roles) {
//     try {
//       // NOTE: We haven't covered this yet in our apiService
//       //       but don't worry about this just yet - I'll come back to it later
//       // return user
//       const user = await this.fetchUser()
//       if (user) {
//         if (Array.isArray(roles) && roles.length) {
//           for (const role of roles) {
//             for (const group of user.data.groups) {
//               if (!group === role) {
//                 return false
//               }
//             }
//           }
//         }
//         return true
//       }
//     } catch (error) {
//       if (error instanceof AuthenticationError) {
//         handleServerError(error)
//         // throw error // AuthenticationError(error.errorCode, error.message)
//       } else {
//         throw error
//       }
//     }
//     return false
//   }
}

// export default userService

export { userService }
