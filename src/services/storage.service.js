const LOGGED_KEY = 'loggedIn'
const LOGIN_KEY = 'email'
const USER_KEY = 'user_state'
const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const storageService = {
  getToken () {
    return localStorage.getItem(TOKEN_KEY)
  },

  saveToken (accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken () {
    localStorage.removeItem(TOKEN_KEY)
  },

  getRefreshToken () {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  saveRefreshToken (refreshToken) {
    if (typeof refreshToken !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    }
  },

  removeRefreshToken () {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  saveLogin (loginToken) {
    localStorage.setItem(LOGIN_KEY, loginToken)
  },

  restoreLogin () {
    if (localStorage.getItem(LOGIN_KEY) !== null) {
      return localStorage.getItem(LOGIN_KEY)
    } else {
      return ''
    }
  },

  setUser (userState) {
    localStorage.setItem(USER_KEY, JSON.stringify(userState))
  },
  getUser () {
    const templateUser = null
    let user = null

    try {
      user = JSON.parse(localStorage.getItem(USER_KEY))
    } catch (e) {
      this.removeUser()
      user = templateUser
    }

    return user
  },

  removeUser () {
    localStorage.removeItem(USER_KEY)
  },

  setLogged (loggedIn) {
    localStorage.setItem(LOGGED_KEY, JSON.stringify(loggedIn))
  },
  getLogged () {
    if (localStorage.getItem(LOGGED_KEY) !== null) {
      return JSON.parse(localStorage.getItem(LOGGED_KEY))
    } else {
      return false
    }
  },

  getRole () {
    const user = this.getUser()
    if (user !== null) {
      return user.role
    } else {
      return ''
    }
  },

  setItem (key, Item) {
    localStorage.setItem(key, JSON.stringify(Item))
  },
  getItem (key) {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return null
    }
  }

}

export { storageService }
