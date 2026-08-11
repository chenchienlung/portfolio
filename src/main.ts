import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'

const FontAwesomeIcon = defineAsyncComponent(async () => {
  const [{ FontAwesomeIcon }] = await Promise.all([
    import('@fortawesome/vue-fontawesome'),
    import('./lib/fontawesomeCommon'),
  ])

  return FontAwesomeIcon
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
