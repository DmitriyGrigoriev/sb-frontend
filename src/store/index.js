import Vue from 'vue'
import Vuex from 'vuex'

import auth from '../modules/auth/store'
import users from '../modules/users/store'
import settings from './modules/settings'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    auth,
    users,
    settings
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  // mutations: {},
  // actions: {},
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
