import * as authService from '@/libs/auth'
import * as loginService from '@/service/auth/login'

const user = {
  state: {
    token: authService.getToken(),
    userInfo: {
      name: '',
      avatar: ''
    }
  },
  getters: {
    avatar: (state) => {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // Login by email
    LoginByUserName ({ commit }, userinfo) {
      const username = userinfo.username.trim()
      return new Promise((resolve, reject) => {
        loginService.loginByUsername(username, userinfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.access)
          authService.setToken(data.access)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // Logout
    LogOut ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', {
        name: '',
        avatar: ''
      })
      authService.removeToken()
      // return new Promise((resolve, reject) => {
      //   loginService.logout().then((response) => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_USERINFO', {
      //       name: '',
      //       avatar: ''
      //     })
      //     authService.removeToken()
      //     resolve()
      //   }).catch(error => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_USERINFO', {
      //       name: '',
      //       avatar: ''
      //     })
      //     authService.removeToken()
      //     reject(error)
      //   })
      // })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        loginService.getUserInfo().then((response) => {
          const data = response.data
          const userInfo = {
            name: data.email,
            avatar: data.avatarUrl
          }
          commit('SET_USERINFO', userInfo)
          const userRole = data.groups
          const userPermission = data.permission
          const permission = [...userRole, ...userPermission]
          const isAdmin = data.is_admin
          localStorage.setItem('permission', JSON.stringify(permission))
          localStorage.setItem('isAdmin', isAdmin)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
