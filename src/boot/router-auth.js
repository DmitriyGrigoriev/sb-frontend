/**
 * src/boot/router-auth.js
 *
 * Defines router authentication guard
 * It is a boot file to ensure that it runs even before the app is loaded
 *
 */
// import store from '@/store'
import { Dialog } from 'quasar'
import { storageService } from '@/services/storage.service'

export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const token = storageService.getToken()
    // const user = store.state.auth.user
    const isAdmin = store.getters['auth/isAdmin']
    const isSuperuser = store.getters['auth/isSuperuser']
    const isEncoder = store.getters['auth/isEncoder']
    const isReviewer = store.getters['auth/isReviewer']
    // const role = user ? (user.role ? user.role.name : 'guest') : 'guest'
    // console.log(`user: ${user} role: ${role}, token: ${!!token}`)

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!token) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        if (to.matched.some(record => record.meta.isAdmin)) {
          if (isAdmin || isSuperuser) {
            next()
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to administrators only',
              cancel: true
            })
            // next({ name: 'home' });
            // redirect to origin page
            next({ name: 'dashboard' })
          }
        } else if (to.matched.some(record => record.meta.isEncoder)) {
          if (isEncoder) {
            next()
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to encoders only',
              cancel: true
            })

            // redirect to origin page
            next({ name: 'index-project' })
          }
        } else if (to.matched.some(record => record.meta.isReviewer)) {
          if (isReviewer) {
            next()
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to reviewers only',
              cancel: true
            })
            // redirect to origin page
            next({ name: 'index-project' })
          }
        } else {
          // if it does not require special authorization
          return next()
        }
      }
    } else {
      // if the route does not require auth
      return next()
    }
  })
}
