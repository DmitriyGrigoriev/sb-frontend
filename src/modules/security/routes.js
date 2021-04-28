const SecurityRoute = {
  path: 'security',
  name: 'security',
  component: () =>
    import(
      /* webpackChunkName: 'SecurityPage' */ './pages/Security.vue'
    ),
  meta: {
    requiresAuth: true
  }
}

export default SecurityRoute
