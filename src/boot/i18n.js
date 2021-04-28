import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import ruRU from 'src/i18n/ru-ru/index'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru-ru',
  fallbackLocale: 'ru-ru',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
  app.i18n.mergeLocaleMessage('ru-ru', ruRU)
}

export { i18n }

// // we import the external package
// import VueI18n from 'vue-i18n'
//
// // let's say we have a file in /src/i18n containing the language pack
// import messages from 'src/i18n'
//
// export default ({ app, router, store, Vue }) => {
//   // we tell Vue to use our Vue package:
//   Vue.use(VueI18n)
//
//   // Set i18n instance on app;
//   // We inject it into root component by doing so;
//   // new Vue({..., i18n: ... }).$mount(...)
//
//   app.i18n = new VueI18n({
//     locale: 'ru-ru',    // zh-hans, en-us, pt-br
//     fallbackLocale: 'ru-ru',
//     messages
//   })
// }
//
