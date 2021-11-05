import Vue from 'vue'
import Vuex from 'vuex'
// store/modules
import settings from './modules/settings'
import components from './modules/components'

import auth from '@/modules/auth/store'
import users from '@/modules/users/store'
import setup from '@/modules/setup/store'
import measure from '@/modules/unitofmeasure/store'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    auth,
    users,
    settings,
    components,
    setup,
    measure
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  // mutations: {},
  // actions: {},
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
