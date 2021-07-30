const DictionaryRoutes = {
  path: '/dictionary',
  component: () => import('@/ui/layouts/AppLayout.vue'),
  children: [
    {
      path: 'measure',
      name: 'measure',
      component: () =>
        import(
          /* webpackChunkName: 'MeasurePage' */ '@/modules/unitofmeasure/pages/MeasureIndex.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'add-measure',
      name: 'add-measure',
      component: () =>
        import(
          /* webpackChunkName: 'AddMeasurePage' */ '@/modules/unitofmeasure/pages/MeasureAdd.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true
      }
    },
    {
      path: 'edit-measure/:id',
      name: 'edit-measure',
      component: () =>
        import(
          /* webpackChunkName: 'EditMeasurePage' */ '@/modules/unitofmeasure/pages/MeasureEdit.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'vat',
      name: 'vat',
      component: () =>
        import(
          /* webpackChunkName: 'MeasurePage' */ '@/modules/unitofmeasure/pages/VatIndex.vue'
        ),
      meta: {
        requiresAuth: true
      }
    }
  ]
}

export default DictionaryRoutes
