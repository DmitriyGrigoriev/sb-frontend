const TestRoutes = {
  path: '/dictionary',
  component: () => import('@/ui/layouts/AppLayout.vue'),
  children: [
    {
      path: 'test-input',
      name: 'test_input',
      component: () =>
        import(
          /* webpackChunkName: 'TestIndexPage' */ '@/modules/test/pages/TestIndex.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'test-table',
      name: 'test_table',
      component: () =>
        import(
          /* webpackChunkName: 'TestTablePage' */ '@/modules/test/pages/TestTable.vue'
        ),
      meta: {
        requiresAuth: true
      }
    }
  ]
}

export default TestRoutes
