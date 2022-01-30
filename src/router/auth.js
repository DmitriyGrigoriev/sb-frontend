const AuthRoutes = {
  path: '',
  component: () => import('@/ui/layouts/AuthLayout.vue'),
  children: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: 'LoginPage' */ '@/modules/auth/pages/Login.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/email-verify',
      name: 'email-verify',
      component: () =>
        import(
          /* webpackChunkName: 'EmailVerify' */ '@/modules/auth/pages/EmailVerify.vue'
        )
    },
    {
      path: '/password/reset/:token',
      name: 'reset-password',
      component: () =>
        import(
          /* webpackChunkName: 'ResetPassword' */ '@/modules/auth/pages/ResetPassword.vue'
        )
    },
    {
      path: 'activate/:uid/:token',
      name: 'activate-user',
      component: () =>
        import(
          /* webpackChunkName: 'Activate' */ '../modules/auth/pages/Activate.vue'
        )
    },
    {
      path: 'password-reset/confirm/:uid/:token',
      name: 'password-reset',
      component: () =>
        import(
          /* webpackChunkName: 'ResetPassword' */ '../modules/auth/pages/ResetPassword.vue'
        )
    }
  ]
}

export default AuthRoutes
