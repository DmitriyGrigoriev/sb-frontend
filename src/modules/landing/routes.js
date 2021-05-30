const LandingRoute = {
  path: '/',
  component: () => import('@/ui/layouts/LandingLayout.vue'),
  children: [
    {
      path: '',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: 'LandingPage' */ './pages/Landing.vue')
    }
  ]
}

export default LandingRoute
