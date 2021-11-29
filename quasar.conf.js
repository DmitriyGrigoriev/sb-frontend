// Configuration for your app
const path = require('path')

module.exports = function (ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    // supportTS: false,

    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'i18n',
      'test',
      'bus',
      'vuelidate',
      // 'permission',
      'router-auth',
      'test-error-handler',
      // 'error-handler',
      // 'quasar-lang-pack',
      'loading-defaults'
    ],

    css: [
      'app.styl'
    ],
    extras: [      // ctx.theme.mat ? 'roboto-font' : null,
      'roboto-font', // optional, you are not bound to it
      'material-icons',
      'fontawesome-v5'
      // 'ionicons',
      // 'mdi',
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'hash',
      ignorePublicFolder: false,
      gzip: true,
      analyze: true, // analyze after build
      env: ctx.dev
        ? { // so on dev we'll have
          API: 'http://192.168.177.130:8000'
        }
        : { // and on build (production):
          API: 'http://192.168.0.2:8000'
        },
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          '@': path.resolve(__dirname, './src'),
        }
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        });
      }
    },
    devServer: {
      // https: true,
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        // '/auth': {
        //   target: 'http://192.168.177.130:8000',
        //   changeOrigin: true,
        //   ws: false // proxy websockets
        // },
        // '/api': {
        //   target: 'http://192.168.177.130:8000/api/v1',
        //   changeOrigin: true,
        //   ws: false // proxy websockets
        // }
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'ru', // Quasar language pack
      config: {
        dark: 'auto',
        notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
      },

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'LocalStorage',
        'AppFullscreen',
        'Dark',
      ]
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'zoomIn',
      'zoomOut',
      'fadeIn',
      'fadeOut'
    ],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      workboxOptions: { skipWaiting: true }, // only for NON InjectManifest
      manifest: {
        name: 'SMART-BILLING',
        short_name: 'SMART-BILLING',
        description: 'A Quasar Framework App for SMART-BILLING',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#095437',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      bundler: 'packager',

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'smart-billing'
      }
    },
  }
}
