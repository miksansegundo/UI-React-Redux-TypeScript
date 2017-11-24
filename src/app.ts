// Poly-fills (Object.assign)
import 'core-js/modules/es6.object.assign'

// CSS & Favicon
require('!!file?name=favicon.ico!./assets/favicon.ico')
require('./css/global.css')
require('./css/critical.css')

// Create Store with reducers
import { store } from './libs/store'
import { navigate } from './actions/router.actions'

// Handle Browser history
if (window.addEventListener) {
  window.addEventListener('popstate', () => {
    store.dispatch(navigate({url: location.pathname}))
  })
}
// Init App loading current page on address bar
store.dispatch(navigate({url: location.pathname}))


