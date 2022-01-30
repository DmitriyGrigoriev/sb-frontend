import AuthRoutes from './auth'
import DictionaryRoutes from './dictionary'
// import TestRoutes from './test'
// import DashboardRoutes from './dashboard'

const routes = [
  {
    path: '',
    component: () => import('@/ui/layouts/LandingLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'LandingPage' */ '@/modules/landing/pages/Landing.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/ui/layouts/AppLayout.vue'),
    children: [
      // {
      //   path: 'review',
      //   name: 'review',
      //   component: () =>
      //     import(/* webpackChunkName: 'Review' */ '@/modules/projects/pages/Review.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      {
        path: 'admin',
        name: 'admin',
        component: () =>
          import(/* webpackChunkName: 'AdminPage' */ '@/modules/users/pages/Users.vue'),
        meta: {
          is_admin: true,
          requiresAuth: true
        }
      },
      // {
      //   path: 'activity',
      //   name: 'activity',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'ActivityPage' */ '../pages/ActivityPage.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: 'notifications',
      //   name: 'notifications',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'Notifications' */ '@/modules/notifications/pages/Notifications.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: 'Dashboard' */ '@/modules/dashboard/pages/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () =>
          import(
            /* webpackChunkName: 'SettingsPage' */ '@/modules/settings/pages/SettingsPage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'setup',
        name: 'setup',
        component: () =>
          import(
            /* webpackChunkName: 'SettingsPage' */ '@/modules/setup/pages/AppSetupPage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () =>
          import(
            /* webpackChunkName: 'ProfilePage' */ '@/modules/profile/pages/ProfilePage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'security',
        name: 'security',
        component: () =>
          import(
            /* webpackChunkName: 'SecurityPage' */ '@/modules/security/pages/Security.vue'
          ),
        meta: {
          requiresAuth: true
        }
      }
      // {
      //   path: '/programs',
      //   name: 'programs',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'ProgramsIndex' */ '@/modules/programs/pages/ProgramsIndex.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true,
      //     isEncoder: true
      //   }
      // }
      // {
      //   path: 'programs/:id',
      //   name: 'review-activities',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'ProgramsValidate' */ '@/modules/projects/pages/ProgramsValidate.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true,
      //     isReviewer: true
      //   }
      // }
      // {
      //   path: 'banner-programs',
      //   name: 'banner-programs',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'BannerPrograms' */ '@/pages/BannerPrograms.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true,
      //     isEncoder: true
      //   }
      // },
      // {
      //   path: 'prexc-programs',
      //   name: 'prexc-programs',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'PrexcPrograms' */ '@/pages/PrexcPrograms.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true,
      //     isEncoder: true
      //   }
      // }
    ]
  },
  // DashboardRoutes,
  AuthRoutes,
  DictionaryRoutes,
  // TestRoutes,
  // {
  //   path: '/shared',
  //   component: () => import('@/ui/layouts/PublicLayout.vue'),
  //   children: [
  //     {
  //       path: ':id',
  //       name: 'shared-project',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: 'SharedProject' */ '@/modules/projects/pages/SharedProject.vue'
  //         )
  //     }
  //   ]
  // },
  // {
  //   path: '/upload',
  //   component: () => import('@/ui/layouts/AppLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('../pages/ProgramsUpload.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         isEncoder: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/consolidates',
  //   component: () => import('@/layouts/AppLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('../pages/ProgramsConsolidate.vue'),
  //       meta: {
  //         requiresAuth: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/error',
    name: 'error',
    component: () =>
      import(/* webpackChunkName: 'Error404' */ '@/modules/errors/pages/Error404.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('@/modules/errors/pages/Error404.vue')
  })
}

export default routes

// import AuthRoutes from '../modules/auth/routes'
// // import DirectoryRoutes from '../modules/directory/routes'
// import DashboardRoutes from '../modules/dashboard/routes'
// import LandingRoute from '../modules/landing/routes'
// import SettingsRoute from '../modules/settings/routes'
// import ProfileRoutes from '../modules/profile/routes'
// import SecurityRoute from '../modules/security/routes'
// import UsersRoutes from '../modules/users/routes'
// import ProjectsRoutes from '../modules/projects/routes'
//
// const Routes = [
//   LandingRoute,
//   {
//     path: '/',
//     component: () => import('@/ui/layouts/AppLayout.vue'),
//     children: [
//       UsersRoutes,
//       // ActivityRoutes,
//       // NotificationsRoutes,
//       DashboardRoutes,
//       SettingsRoute,
//       ProfileRoutes,
//       SecurityRoute,
//       // // ResourcesRoutes,
//       ProjectsRoutes
//       // DirectoryRoutes
//     ]
//   },
//   AuthRoutes,
//   {
//     path: '/error',
//     name: 'error',
//     component: () => import('pages/Error404.vue')
//   }
// ]
//
// // Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   Routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }
//
// export default Routes
