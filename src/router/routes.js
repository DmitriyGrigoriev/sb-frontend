import AuthRoutes from '../modules/auth/routes'
// import DirectoryRoutes from '../modules/directory/routes'
import DashboardRoutes from '../modules/dashboard/routes'
import LandingRoute from '../modules/landing/routes'
import SettingsRoute from '../modules/settings/routes'
import ProfileRoutes from '../modules/profile/routes'
import SecurityRoute from '../modules/security/routes'
import UsersRoutes from '../modules/users/routes'

const Routes = [
  LandingRoute,
  {
    path: '/',
    component: () => import('@/ui/layouts/AppLayout.vue'),
    children: [
      UsersRoutes,
      // ActivityRoutes,
      // NotificationsRoutes,
      DashboardRoutes,
      SettingsRoute,
      ProfileRoutes,
      SecurityRoute
      // // ResourcesRoutes,
      // ...ProjectsRoutes,
      // DirectoryRoutes
    ]
  },
  AuthRoutes,
  {
    path: '/error',
    name: 'error',
    component: () => import('pages/Error404.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  Routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default Routes
