import Vue from 'vue'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { registerVueComponents } from './services/vue-component-services'

// /!\ to be includ before any component
// otherwize it would not be a CSS normalizer...
// not include in vue.config.js because it's import for every loaded component...
import 'normalize.css'

registerVueComponents()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
