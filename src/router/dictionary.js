const DictionaryRoutes = {
  path: '/dictionary',
  component: () => import('@/ui/layouts/AppLayout.vue'),
  children: [
    // «Unit of Measure» («Единица Измерения»)
    {
      path: 'measure',
      name: 'measure',
      component: () =>
        import(
          /* webpackChunkName: 'MeasureIndex' */ '@/modules/unitofmeasure/pages/AppMeasureIndex.vue'
        ),
      props: {
        currentMode: 'list',
        indexPage: 'measure'
      },
      meta: {
        requiresAuth: true,
        indexPage: 'measure'
      }
    },
    {
      path: 'add-measure',
      name: 'add-measure',
      component: () =>
        import(
          /* webpackChunkName: 'AppFormPage' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      // props: {
      //   currentMode: 'add',
      //   formName: 'MeasureForm', // name of form component
      //   indexPage: 'measure'
      // },
      meta: {
        requiresAuth: true,
        currentMode: 'add',
        formName: 'AppMeasureForm', // name of form component
        indexPage: 'measure', // route name where need to return after exit from form
        isEncoder: true
      }
    },
    {
      path: 'edit-measure/:id',
      name: 'edit-measure',
      component: () =>
        import(
          /* webpackChunkName: 'AppFormPage' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        formName: 'AppMeasureForm', // name of form component
        indexPage: 'measure' // route name where need to return after exit from form
      }
    },
    // «VAT Posting Group» («НДС  Учетная Группа»)
    {
      path: 'vat',
      name: 'vat',
      component: () =>
        import(
          /* webpackChunkName: 'MeasurePage' */ '@/modules/unitofmeasure/pages/AppVatIndex.vue'
        ),
      meta: {
        requiresAuth: true,
        indexPage: 'vat'
      }
    },
    {
      path: 'add-vat',
      name: 'add-vat',
      component: () =>
        import(
          /* webpackChunkName: 'AddVatPage' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true,
        currentMode: 'add',
        formName: 'AppVatForm', // name of form component
        indexPage: 'vat' // route name where need to return after exit from form
      }
    },
    {
      path: 'edit-vat/:id',
      name: 'edit-vat',
      component: () =>
        import(
          /* webpackChunkName: 'EditVatPage' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        formName: 'AppVatForm', // name of form component
        indexPage: 'vat' // route name where need to return after exit from form
      }
    },
    // NoSeries «No. Series» («Серия Номеров»)
    {
      path: 'noseries',
      name: 'noseries',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesPage' */ '@/modules/unitofmeasure/pages/AppSeriesIndex.vue'
        ),
      meta: {
        requiresAuth: true,
        indexPage: 'noseries'
      }
    },
    {
      path: 'add-noseries',
      name: 'add-noseries',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true,
        currentMode: 'add',
        formName: 'AppSeriesForm', // name of form component
        indexPage: 'noseries' // route name where need to return after exit from form
      }
    },
    {
      path: 'edit-noseries/:id',
      name: 'edit-noseries',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        formName: 'AppSeriesForm', // name of form component
        indexPage: 'noseries' // route name where need to return after exit from form
      }
    },
    // «No. Series Line» («Серия Номеров Строка»)
    {
      path: 'noseriesline',
      name: 'noseriesline',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesPage' */ '@/modules/unitofmeasure/pages/AppSeriesLineIndex.vue'
        ),
      meta: {
        requiresAuth: true,
        indexPage: 'noseriesline'
      }
    },
    {
      path: 'add-noseriesline',
      name: 'add-noseriesline',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true,
        currentMode: 'add',
        formName: 'AppSeriesLineForm', // name of form component
        indexPage: 'noseriesline' // route name where need to return after exit from form
      }
    },
    {
      path: 'edit-noseriesline/:id',
      name: 'edit-noseriesline',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        formName: 'AppSeriesLineForm', // name of form component
        indexPage: 'noseriesline' // route name where need to return after exit from form
      }
    },
    {
      path: 'edit-noseriesline/:id/:blocked',
      name: 'edit-noseriesline-blocked',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        blocked: true, // Are series No blocked ?
        formName: 'AppSeriesLineForm', // name of form component
        indexPage: 'noseriesline' // route name where need to return after exit from form
      }
    },
    // Service Type» («Тип Услуги»)
    {
      path: 'servicetype',
      name: 'servicetype',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesPage' */ '@/modules/unitofmeasure/pages/AppServiceTypeIndex.vue'
        ),
      meta: {
        requiresAuth: true,
        indexPage: 'servicetype'
      }
    },
    {
      path: 'add-servicetype',
      name: 'add-servicetype',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true,
        currentMode: 'add',
        formName: 'AppServiceTypeForm', // name of form component
        indexPage: 'servicetype' // route name where need to return after exit from form
      }
    },
    {
      path: 'edit-servicetype/:id',
      name: 'edit-servicetype',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        formName: 'AppServiceTypeForm', // name of form component
        indexPage: 'servicetype' // route name where need to return after exit from form
      }
    },
    // «Service» («Услуги»)
    {
      path: 'service',
      name: 'service',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesPage' */ '@/modules/unitofmeasure/pages/AppServiceIndex.vue'
        ),
      meta: {
        requiresAuth: true,
        indexPage: 'service'
      }
    },
    {
      path: 'add-service',
      name: 'add-service',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true,
        currentMode: 'add',
        formName: 'AppServiceForm', // name of form component
        indexPage: 'service' // route name where need to return after exit from form
      }
    },
    {
      path: 'edit-service/:id',
      name: 'edit-service',
      component: () =>
        import(
          /* webpackChunkName: 'AppSeriesForm' */ '@/modules/unitofmeasure/pages/AppFormPage.vue'
        ),
      meta: {
        requiresAuth: true,
        currentMode: 'edit',
        formName: 'AppServiceForm', // name of form component
        indexPage: 'service' // route name where need to return after exit from form
      }
    }
  ]
}

export default DictionaryRoutes
