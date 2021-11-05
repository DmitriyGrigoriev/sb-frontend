// for when you don't specify quasar.conf.js > framework: 'all'
import { Quasar } from 'quasar'

export default async () => {
  const langIso = 'ru' // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(
      /* webpackInclude: /(de|en-us)\.js$/ */
      'quasar/lang/' + langIso
    )
      .then(lang => {
        Quasar.lang.set(lang.default)
      })
  } catch (err) {
    console.log('Quasar language pack error:', err)
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
}
